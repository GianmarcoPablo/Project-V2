import { Company } from "../../entities/company/Company";
import { CompanyRepository } from "../../repositories/company/company.repository";

interface IGetCompanyByIdUseCase {
    execute(id: string): Promise<Company>
}

export class GetCompanyByIdUseCase implements IGetCompanyByIdUseCase {

    constructor(
        private readonly companyRepository: CompanyRepository,
    ) { }

    async execute(id: string): Promise<Company> {
        const company = await this.companyRepository.getById(id)
        if (!company) throw "company not found"
        return company
    }
}