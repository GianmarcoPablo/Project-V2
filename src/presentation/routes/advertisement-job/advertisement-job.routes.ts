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
import { SaveAdvertisementJobUseCase } from "../../../domain/use-cases/advertisement-job/save-advertisement-job.use-case";
import { prisma } from "../../../infrastructure/orm/prisma";

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
            let { page = 1, take = 3 } = c.req.query()
            if (isNaN(Number(page))) page = 1;
            if (Number(page) < 1) page = 1;
            const data = await new GetAllAdvertisementsJobUseCase(this.advertisementJobRepository).execute({ page: +page, take: +take })
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

        router.post("/save", AuthMiddleware.authenticate, zSaveAdvertisementJobSchema, async (c) => {
            const user = c.req.user
            const body = c.req.valid("json");
            const data = await new SaveAdvertisementJobUseCase(this.advertisementJobRepository).execute({ jobId: body.jobId, userId: user!.id })
            return c.json(data)
        })

        router.get("/save-job/:jobId", AuthMiddleware.authenticate, async (c) => {
            try {
                const { jobId } = c.req.param();
                const user = c.req.user
                const savedJob = await prisma.savedAdvertisementJob.findUnique({
                    where: {
                        userId_jobId: {
                            userId: user!.id,
                            jobId: jobId
                        },
                    },
                });

                return c.json({ isSaved: !!savedJob });

            } catch (error) {
                return c.json({ error: 'Error checking saved job status' });
            }
        })

        router.post("/report", zReportAdvertisementJobSchema, async (c) => {
            const body = c.req.valid("json");
        })

        return router;
    }
}