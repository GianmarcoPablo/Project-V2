import { Hono } from "hono";
import { BlankEnv, BlankSchema } from "hono/types";
import { zCreateAdvertisementJobSchema } from "../../validators/advertisement-job/create-advertisement-job.validator";
import { AdvertisementJobRepository } from "../../../domain/repositories/advertisement-job/advertisement-job.repository";
import { CreateAdvertisementJobUseCase } from "../../../domain/use-cases/advertisement-job/create-advertisement-job.use-case";
import { AuthMiddleware } from "../../middlewares/auth/auth.middleware";

export class AdvertisementJobRoutes {

    constructor(
        private readonly advertisementJobRepository: AdvertisementJobRepository,
    ) { }

    public get routes(): Hono<BlankEnv, BlankSchema, "/"> {
        const router = new Hono();

        router.post("/", AuthMiddleware.authenticate, zCreateAdvertisementJobSchema, async (c) => {
            const body = c.req.valid("json");
            console.log(body)
            //const data = await new CreateAdvertisementJobUseCase(this.advertisementJobRepository).execute(body);
            return c.json({ msg: "hola" });
        });


        return router;
    }
}