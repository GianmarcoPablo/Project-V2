import { Company } from "../../entities/company/Company";
import { CompanyRepository } from "../../repositories/company/company.repository";

interface IGetAllCompaniesUseCase {
    execute(body: { page: number; limit: number; }): Promise<Company[]>
}

export class GetAllCompaniesUseCase implements IGetAllCompaniesUseCase {

    constructor(
        private readonly companyRepository: CompanyRepository,
    ) { }

    async execute(body: { page: number; limit: number; }): Promise<Company[]> {
        const companies = await this.companyRepository.getAll(body)
        return companies
    }
}