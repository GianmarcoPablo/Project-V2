import { Hono } from "hono";
import { BlankEnv, BlankSchema } from "hono/types";
import { CompanyRepository } from "../../../domain/repositories/company/company.repository";
import { zCreateCompanySchema } from "../../validators/company/create-company.validator";
import { encodeBase64 } from "hono/utils/encode"
import { CreateCompanyUseCase } from "../../../domain/use-cases/company/create-company.use-case";
import { IStorageService } from "../../../domain/providers-interfaces/storage/storage.service.interface";
import { AuthMiddleware } from "../../middlewares/auth/auth.middleware";

export class CompanyRoutes {

    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly storageService: IStorageService
    ) { }

    get routes(): Hono<BlankEnv, BlankSchema, "/"> {
        const router = new Hono();

        router.post("/", AuthMiddleware.authenticate, zCreateCompanySchema, async (c) => {
            const user = c.req.user
            const body = c.req.valid("form")
            const data = await new CreateCompanyUseCase(this.companyRepository, this.storageService).execute({ ...body, userId: user!.id })
            return c.json(data)
        });

        return router;
    }
}





