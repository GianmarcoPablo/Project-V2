import { CompanyRepository } from "../../repositories/company/company.repository";

interface IDeleteCompanyUseCase {
    execute(id: string, userId: string): Promise<string>
}

export class DeleteCompanyUseCase implements IDeleteCompanyUseCase {

    constructor(
        private readonly repository: CompanyRepository,
    ) { }

    async execute(id: string, userId: string): Promise<string> {
        const company = await this.repository.getById(id)
        if (!company) throw "not found"
        if (userId !== company.userId) throw "You do not have permission to perform this action"
        await this.repository.delete(company.id)
        return `la compañia ${company.name} fue removia correctamente`
    }
}