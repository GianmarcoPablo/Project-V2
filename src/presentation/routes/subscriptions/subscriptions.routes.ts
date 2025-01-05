import { Hono } from "hono";
import { SubscriptionsService } from "../../../infrastructure/providers/subscriptions/subscriptions.service";
import { AuthMiddleware } from "../../middlewares/auth/auth.middleware";
import { stripe } from "../../../config/stripe";
import Stripe from "stripe";
import { prisma } from "../../../infrastructure/orm/prisma";
import { env } from 'hono/adapter'

export class SubscriptionsRoutes {

    constructor(
        private readonly subscriptionsService: SubscriptionsService
    ) { }

    public get routes() {
        const router = new Hono();


        router.post("generate-user-stripe", AuthMiddleware.authenticate, async (c) => {
            let redirectUrl: string = "";
            const body = await c.req.json()
            console.log(body)
            const billingUrl = "http://localhost:3001/pricing"

            try {
                const user = c.req.user
                if (!user || !user.email || !user.id) throw new Error("Unauthorized");
                const subscriptionPlan = await this.subscriptionsService.getUserSubscriptionPlan(user.id)
                if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
                    // User on Paid Plan - Create a portal session to manage subscription.
                    const stripeSession = await stripe.billingPortal.sessions.create({
                        customer: subscriptionPlan.stripeCustomerId,
                        return_url: billingUrl,
                    })

                    redirectUrl = stripeSession.url as string
                } else {
                    const stripeSession = await stripe.checkout.sessions.create({
                        success_url: billingUrl,
                        cancel_url: billingUrl,
                        payment_method_types: ["card"],
                        mode: "subscription",
                        billing_address_collection: "auto",
                        customer_email: user.email,

                        line_items: [
                            {
                                price: body.priceId as any,
                                quantity: 1,

                            }
                        ],
                        metadata: {
                            userId: user.id,
                        },
                    })

                    redirectUrl = stripeSession.url as string
                }

                return c.json(redirectUrl)
            } catch (error) {
                console.log(error)
            }
        })

        router.post("customer-portal", AuthMiddleware.authenticate, async (c) => {
            try {
                const user = c.req.user
                const body = await c.req.json()
                let redirectUrl: string = "";

                if (!user || !user.email) {
                    throw new Error("Unauthorized");
                }

                if (body.userStripeId) {
                    const stripeSession = await stripe.billingPortal.sessions.create({
                        customer: body.userStripeId,
                        return_url: "http://localhost:3001/dashboard",
                    });

                    redirectUrl = stripeSession.url as string;
                    
                }
                return c.json(redirectUrl)
            } catch (error) {
                console.log(error)
                throw new Error("Failed to generate user stripe session");
            }
        })

        router.get("get-user-subscription-plan/:userId", async (c) => {
            try {
                const userId = c.req.param('userId')
                const data = await this.subscriptionsService.getUserSubscriptionPlan(userId)
                return c.json(data)
            } catch (error) {
                console.log(error)
            }

        })

        router.post("/webhook", async (c) => {
            const { STRIPE_WEBHOOK_SECRET } = env(c)
            const signature = c.req.header('stripe-signature')
            console.log({ STRIPE_WEBHOOK_SECRET })
            try {
                if (!signature) {
                    return c.text('', 400)
                }
                const body = await c.req.text()

                const event = await stripe.webhooks.constructEventAsync(
                    body,
                    signature,
                    STRIPE_WEBHOOK_SECRET as string
                );


                if (event!.type === "checkout.session.completed") {
                    const session = event.data.object as Stripe.Checkout.Session;
                    const subscription = await stripe.subscriptions.retrieve(
                        session.subscription as string,
                    );


                    // Update the user stripe into in our database.
                    // Since this is the initial subscription, we need to update
                    // the subscription id and customer id.
                    await prisma.user.update({
                        where: {
                            id: session?.metadata?.userId,
                        },
                        data: {
                            stripeSubscriptionId: subscription.id,
                            stripeCustomerId: subscription.customer as string,
                            stripePriceId: subscription.items.data[0].price.id,
                            stripeCurrentPeriodEnd: new Date(
                                subscription.current_period_end * 1000,
                            ),
                        },
                    });
                }


                if (event!.type === "invoice.payment_succeeded") {
                    const session = event.data.object as Stripe.Invoice;

                    // If the billing reason is not subscription_create, it means the customer has updated their subscription.
                    // If it is subscription_create, we don't need to update the subscription id and it will handle by the checkout.session.completed event.
                    if (session.billing_reason != "subscription_create") {
                        // Retrieve the subscription details from Stripe.
                        const subscription = await stripe.subscriptions.retrieve(
                            session.subscription as string,
                        );

                        // Update the price id and set the new period end.
                        await prisma.user.update({
                            where: {
                                stripeSubscriptionId: subscription.id,
                            },
                            data: {
                                stripePriceId: subscription.items.data[0].price.id,
                                stripeCurrentPeriodEnd: new Date(
                                    subscription.current_period_end * 1000,
                                ),
                            },
                        });
                    }
                }

                return c.text('', 200)
            } catch (err) {
                const errorMessage = `⚠️  Webhook signature verification failed. ${err instanceof Error ? err.message : 'Internal server error'
                    }`
                console.log(errorMessage)
                return c.text(errorMessage, 400)
            }

        })

        return router;
    }
}
