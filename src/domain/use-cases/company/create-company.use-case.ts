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
        const logoUrl = await this.processFile(body.logoUrl, "companyLogo");
        const bannerUrl = await this.processFile(body.bannerUrl, "companyBanner");

        const companyData = {
            ...body,
            logoUrl: logoUrl || null,
            bannerUrl: bannerUrl || null,
        };

        const company = await this.companyRepository.create(companyData);
        return company;
    }

    private async processFile(file: File | undefined, folder: string): Promise<string | null> {
        if (!file) return null;

        const mimeType = file.type; // Obtiene el tipo MIME
        const byteArrayBuffer = await file.arrayBuffer(); // Convierte el archivo a un buffer
        const base64 = encodeBase64(byteArrayBuffer); // Codifica en Base64

        // Sube el archivo al almacenamiento y devuelve la URL
        const uploadedFile = await this.storageService.uploadFile(
            `data:${mimeType};base64,${base64}`,
            folder
        );
        return uploadedFile.url;
    }
}