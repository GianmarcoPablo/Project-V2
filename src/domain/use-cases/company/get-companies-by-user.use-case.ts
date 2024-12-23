import { Company } from "../../entities/company/Company";
import { CompanyRepository } from "../../repositories/company/company.repository";

interface IGetCompaniesByUserUseCase {
    execute(userId: string): Promise<Company[]>
}

export class GetCompaniesByUserUseCase implements IGetCompaniesByUserUseCase {

    constructor(
        private readonly repository: CompanyRepository
    ) { }

    async execute(userId: string): Promise<Company[]> {
        const companies = await this.repository.getCompaniesByUser(userId)
        if (companies[0].id !== userId) throw "Unauthorized"
        return companies
    }
}