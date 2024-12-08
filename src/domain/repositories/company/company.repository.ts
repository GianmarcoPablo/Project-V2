import { CreateCompanyDto } from "../../dtos/company/create-company.dto";
import { Company } from "../../entities/company/Company";

export abstract class CompanyRepository {
    abstract createCompany(body: CreateCompanyDto): Promise<Company>
}