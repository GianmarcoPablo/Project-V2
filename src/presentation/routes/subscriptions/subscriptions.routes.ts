import { Hono } from "hono";
import { SubscriptionsService } from "../../../infrastructure/providers/subscriptions/subscriptions.service";

export class SubscriptionsRoutes {

    constructor(
        private readonly subscriptionsService: SubscriptionsService
    ) { }

    public get routes() {
        const router = new Hono();

        router.get("/prices", async (c) => {
            const data = await this.subscriptionsService.getStripePrices()
            console.log(data)
            return c.json(data)
        });

        router.get("/products", async (c) => {
            const data = await this.subscriptionsService.getStripeProducts()
            console.log(data)
            return c.json(data)
        })


        return router;
    }
}
