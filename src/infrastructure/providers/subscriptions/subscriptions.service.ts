import { stripe } from "../../../config/stripe";

export class SubscriptionsService {

    public async getStripePrices() {
        const prices = await stripe.prices.list({
            expand: ['data.product'],
            active: true,
            type: 'recurring',
        });

        return prices.data.map((price) => ({
            id: price.id,
            productId:
                typeof price.product === 'string' ? price.product : price.product.id,
            unitAmount: price.unit_amount,
            currency: price.currency,
            interval: price.recurring?.interval,
            trialPeriodDays: price.recurring?.trial_period_days,
        }));
    }

    public async getStripeProducts() {
        const products = await stripe.products.list({
            active: true,
            expand: ['data.default_price'],
        });

        return products.data.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            defaultPriceId:
                typeof product.default_price === 'string'
                    ? product.default_price
                    : product.default_price?.id,
        }));
    }
}