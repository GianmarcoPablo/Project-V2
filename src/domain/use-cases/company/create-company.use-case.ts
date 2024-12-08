import { CreateCompanyDto } from "../../dtos/company/create-company.dto";
import { Company } from "../../entities/company/Company";
import { IStorageService } from "../../providers-interfaces/storage/storage.service.interface";
import { CompanyRepository } from "../../repositories/company/company.repository";

interface ICreateCompanyUseCase {
    execute(body: CreateCompanyDto): Promise<Company>
}


export class CreateCompanyUseCase implements ICreateCompanyUseCase {


    constructor(
        private readonly companyRepository: CompanyRepository,
        private readonly storageService: IStorageService
    ) { }

    async execute(body: CreateCompanyDto): Promise<Company> {
        const company = await this.companyRepository.createCompany(body)
        return company
    }
}