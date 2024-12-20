import { Hono } from "hono";
import { BlankEnv, BlankSchema } from "hono/types";
import { zCreateAdvertisementJobSchema } from "../../validators/advertisement-job/create-advertisement-job.validator";
import { AdvertisementJobRepository } from "../../../domain/repositories/advertisement-job/advertisement-job.repository";
import { CreateAdvertisementJobUseCase } from "../../../domain/use-cases/advertisement-job/create-advertisement-job.use-case";
import { AuthMiddleware } from "../../middlewares/auth/auth.middleware";
import { CategoryRepository } from "../../../domain/repositories/category/category.repository";
import { CompanyRepository } from "../../../domain/repositories/company/company.repository";
import { AuthRepository } from "../../../domain/repositories/auth/auth.repository";
import { GetAdvertisementJobByIdUseCase } from "../../../domain/use-cases/advertisement-job/get-advertisement-job-by-id.use-case";
import { GetAllAdvertisementsJobUseCase } from "../../../domain/use-cases/advertisement-job/get-all-advertisements-job.use-case";
import { UpdateAdvertisementJobUseCase } from "../../../domain/use-cases/advertisement-job/update-advertisement-job.use-case";
import { zReportAdvertisementJobSchema } from "../../validators/advertisement-job/report-advertisement-job.validator";
import { zSaveAdvertisementJobSchema } from "../../validators/advertisement-job/save-advertisement-job.validator";

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
            const data = await new CreateAdvertisementJobUseCase(this.advertisementJobRepository, this.categoryRepository, this.authRepository, this.companyRepository).execute(body);
            return c.json(data);
        });

        router.get("/", async (c) => {
            const body = {}
            const data = await new GetAllAdvertisementsJobUseCase(this.advertisementJobRepository).execute(body)
            return c.json(data)
        })

        router.get("/:id", async (c) => {
            const id = c.req.param("id")
            const data = await new GetAdvertisementJobByIdUseCase(this.advertisementJobRepository).execute(id)
            return c.json(data)
        })

        router.put("/:id", async (c) => {
            const id = c.req.param("id")
            const body = {}
            const data = await new UpdateAdvertisementJobUseCase(this.advertisementJobRepository).execute(id, body)
            return c.json(data)
        })

        router.post("/save", zSaveAdvertisementJobSchema, async (c) => {
            const body = c.req.valid("json");
        })

        router.post("/report", zReportAdvertisementJobSchema, async (c) => {
            const body = c.req.valid("json");
        })

        return router;
    }
}