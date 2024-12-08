import { Hono } from "hono";
import { BlankEnv, BlankSchema } from "hono/types";
import { CompanyRepository } from "../../../domain/repositories/company/company.repository";
import { zCreateCompanySchema } from "../../validators/company/create-company.validator";
import { encodeBase64 } from "hono/utils/encode"

export class CompanyRoutes {

    constructor(
        private readonly companyRepository: CompanyRepository,
    ) { }

    get routes(): Hono<BlankEnv, BlankSchema, "/"> {
        const router = new Hono();

        router.post("/", zCreateCompanySchema, async (c) => {
            const body = c.req.valid("form")
            console.log(body)
            return c.json({ msg: "hola" })
        });

        return router;
    }
}





