import { Company } from "../../entities/company/Company";
import { CompanyRepository } from "../../repositories/company/company.repository";

interface IGetAllCompaniesUseCase {
    execute(body: any): Promise<Company[]>
}

export class GetAllUseCase implements IGetAllCompaniesUseCase {

    constructor(
        private readonly companyRepository: CompanyRepository,
    ) { }

    async execute(body: any): Promise<Company[]> {
        const companies = await this.companyRepository.getAll(body)
        return companies
    }
}