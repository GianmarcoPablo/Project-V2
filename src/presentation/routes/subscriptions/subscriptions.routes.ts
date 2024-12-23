import { Hono } from "hono";


export class SubscriptionsRoutes {

    public get routes() {
        const router = new Hono();

        router.post("/", async ( c ) => {
        });


        return router;
    }
}
