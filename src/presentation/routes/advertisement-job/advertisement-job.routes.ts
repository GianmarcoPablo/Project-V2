import { Hono } from "hono";
import { BlankEnv, BlankSchema } from "hono/types";
import { zCreateAdvertisementJobSchema } from "../../validators/advertisement-job/create-advertisement-job.validator";
import { AdvertisementJobRepository } from "../../../domain/repositories/advertisement-job/advertisement-job.repository";
import { CreateAdvertisementJobUseCase } from "../../../domain/use-cases/advertisement-job/create-advertisement-job.use-case";
import { AuthMiddleware } from "../../middlewares/auth/auth.middleware";
import { CategoryRepository } from "../../../domain/repositories/category/category.repository";
import { CompanyRepository } from "../../../domain/repositories/company/company.repository";
import { AuthRepository } from "../../../domain/repositories/auth/auth.repository";

export class AdvertisementJobRoutes {

    constructor(
        private readonly advertisementJobRepository: AdvertisementJobRepository,
        private readonly categoryRepository: CategoryRepository,
        private readonly authRepository: AuthRepository,
        private readonly companyRepository: CompanyRepository,
    ) { }

    public get routes(): Hono<BlankEnv, BlankSchema, "/"> {
        const router = new Hono();

        router.post("/", AuthMiddleware.authenticate, zCreateAdvertisementJobSchema, async (c) => {
            const body = c.req.valid("json");
            console.log(body)
            const data = await new CreateAdvertisementJobUseCase(this.advertisementJobRepository, this.categoryRepository, this.authRepository, this.companyRepository).execute(body);
            return c.json(data);
        });


        return router;
    }
}