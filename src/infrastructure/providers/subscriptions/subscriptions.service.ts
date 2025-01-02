import { User } from "@prisma/client";
import { stripe } from "../../../config/stripe";
import { pricingData } from "../../../config/subscriptions";
import { prisma } from "../../orm/prisma";

export class SubscriptionsService {

    public async getUserSubscriptionPlan(userId: string) {
        if (!userId) throw new Error("Missing parameters");

        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                stripeSubscriptionId: true,
                stripeCurrentPeriodEnd: true,
                stripeCustomerId: true,
                stripePriceId: true,
            },
        })

        if (!user) throw new Error("User not found")


        const isPaid =
            user.stripePriceId &&
                user.stripeCurrentPeriodEnd!.getTime() + 86_400_000 > Date.now() ? true : false;

        const userPlan =
            pricingData.find((plan) => plan.stripeIds.monthly === user.stripePriceId) ||
            pricingData.find((plan) => plan.stripeIds.yearly === user.stripePriceId);

        const plan = isPaid && userPlan ? userPlan : pricingData[0]

        const interval = isPaid
            ? userPlan?.stripeIds.monthly === user.stripePriceId
                ? "month"
                : userPlan?.stripeIds.yearly === user.stripePriceId
                    ? "year"
                    : null
            : null;

        let isCanceled = false;
        if (isPaid && user.stripeSubscriptionId) {
            const stripePlan = await stripe.subscriptions.retrieve(
                user.stripeSubscriptionId
            )
            isCanceled = stripePlan.cancel_at_period_end
        }

        return {
            ...plan,
            ...user,
            stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
            isPaid,
            interval,
            isCanceled
        }
    }


}