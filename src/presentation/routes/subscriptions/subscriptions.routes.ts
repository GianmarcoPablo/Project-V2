import { Hono } from "hono";
import { SubscriptionsService } from "../../../infrastructure/providers/subscriptions/subscriptions.service";
import { AuthMiddleware } from "../../middlewares/auth/auth.middleware";
import { stripe } from "../../../config/stripe";

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

        router.get("get-user-subscription-plan/:userId", async (c) => {
            try {
                const userId = c.req.param('userId')
                const data = await this.subscriptionsService.getUserSubscriptionPlan(userId)
                return c.json(data)
            } catch (error) {
                console.log(error)
            }

        })

        return router;
    }
}
