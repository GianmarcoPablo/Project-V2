import { CreateCompanyDto } from "../../dtos/company/create-company.dto";
import { UpdateCompanyDto } from "../../dtos/company/update-company.do";
import { Company } from "../../entities/company/Company";

export abstract class CompanyRepository {
    abstract getAll(body: any): Promise<Company[]>
    abstract create(body: CreateCompanyDto): Promise<Company>
    abstract findById(id: string): Promise<Company | null>
    abstract update(id: string, body: UpdateCompanyDto): Promise<Company>
}