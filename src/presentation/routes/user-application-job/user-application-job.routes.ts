import { Hono } from "hono";
import { BlankEnv, BlankSchema } from "hono/types";
import { UserApplicationJobRepositoy } from "../../../domain/repositories/user-application-job/user-application-job.repository";
import { CreateUserApplicationJobUseCase } from "../../../domain/use-cases/user-application-job/create-user-application-job.use-case";

export class AdvertisementJobRoutes {

    constructor(
        private readonly userApplicationJob: UserApplicationJobRepositoy
    ) { }

    public get routes(): Hono<BlankEnv, BlankSchema, "/"> {
        const router = new Hono();


        router.post("/", async (c) => {

        })

        return router;
    }
}