import { Hono } from "hono";
import { AuthMiddleware } from "../../middlewares/auth/auth.middleware";
import { CompanyRepository } from "../../../domain/repositories/company/company.repository";
import { IStorageService } from "../../../domain/providers-interfaces/storage/storage.service.interface";
import { CreateCompanyUseCase } from "../../../domain/use-cases/company/create-company.use-case";
import { UpdateCompanyUseCase } from "../../../domain/use-cases/company/update-company.use-case";
import { zUpdateCompanySchema } from "../../validators/company/update-company.validator";
import { zCreateCompanySchema } from "../../validators/company/create-company.validator";
import { GetAllCompaniesUseCase } from "../../../domain/use-cases/company/get-all-companies.use-case";
import { GetCompanyByIdUseCase } from "../../../domain/use-cases/company/get-company-by-id.use-case";
import { DeleteCompanyUseCase } from "../../../domain/use-cases/company/delete-company.use-case";
import { GetCompaniesByUserUseCase } from "../../../domain/use-cases/company/get-companies-by-user.use-case";

export class CompanyRoutes {

    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly storageService: IStorageService
    ) { }

    get routes() {
        const router = new Hono();

        router.get("/", async (c) => {
            const limit = Number(c.req.query())
            const page = Number(c.req.query())
            const data = await new GetAllCompaniesUseCase(this.companyRepository).execute({ limit, page })
            return c.json(data)
        })

        router.get("/:id", async (c) => {
            const id = c.req.param("id");
            const data = await new GetCompanyByIdUseCase(this.companyRepository).execute(id)
            return c.json(data)
        })

        router.post("/", AuthMiddleware.authenticate, zCreateCompanySchema, async (c) => {
            const user = c.req.user
            const body = c.req.valid("form")
            const data = await new CreateCompanyUseCase(this.companyRepository, this.storageService).execute({ ...body, userId: user!.id })
            return c.json(data)
        });

        router.put("/:id", AuthMiddleware.authenticate, zUpdateCompanySchema, async (c) => {
            const user = c.req.user
            const id = c.req.param("id");
            const body = c.req.valid("form")
            const data = await new UpdateCompanyUseCase(this.companyRepository, this.storageService).execute(id, { ...body, userId: user!.id })
            return c.json(data)
        })

        router.delete("/:id", AuthMiddleware.authenticate, async (c) => {
            const user = c.req.user
            const id = c.req.param("id");
            const data = await new DeleteCompanyUseCase(this.companyRepository).execute(id, user!.id)
            return c.json(data)
        })

        router.get("/by/owned", AuthMiddleware.authenticate, async (c) => {
            const user = c.req.user
            const data = await new GetCompaniesByUserUseCase(this.companyRepository).execute(user!.id)
            return c.json(data)
        })

        return router;
    }
}






