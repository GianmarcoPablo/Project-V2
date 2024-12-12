import { encodeBase64 } from "hono/utils/encode";
import { Company } from "../../entities/company/Company";
import { IStorageService } from "../../providers-interfaces/storage/storage.service.interface";
import { CompanyRepository } from "../../repositories/company/company.repository";
import { UpdateCompanyDto } from "../../dtos/company/update-company.do";

interface IUpdateCompanyUseCase {
    execute(id: string, body: UpdateCompanyDto): Promise<Company>
}

export class UpdateCompanyUseCase implements IUpdateCompanyUseCase {

    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly storageService: IStorageService
    ) { }

    async execute(id: string, body: UpdateCompanyDto): Promise<Company> {
        const company = await this.companyRepository.findById(id)
        if (!company) throw "Not found company"
        const updatedCompany = await this.companyRepository.update(id, body)
        return updatedCompany
    }
}