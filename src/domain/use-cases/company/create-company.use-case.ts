import { encodeBase64 } from "hono/utils/encode";
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
        const logo = body.logoUrl;
        const mimeType = logo.type; // Obtiene el tipo MIME, como "image/png" o "image/jpeg"
        const byteArrayBuffer = await logo.arrayBuffer();
        const base64 = encodeBase64(byteArrayBuffer);
        const storage = await this.storageService.uploadFile(`data:${mimeType};base64,${base64}`, "companyLogo");
        const company = await this.companyRepository.create({ ...body, logoUrl: storage.url });
        return company
    }
}