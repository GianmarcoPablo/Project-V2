import { CreateJobAdvertisementDto } from "../../dtos/advertisement-job/create-advertisement-job.dto";
import { AdvertisementJob } from "../../entities/advertisement-job/Advertisement-job.entity";
import { AdvertisementJobRepository } from "../../repositories/advertisement-job/advertisement-job.repository";
import { AuthRepository } from "../../repositories/auth/auth.repository";
import { CategoryRepository } from "../../repositories/category/category.repository";
import { CompanyRepository } from "../../repositories/company/company.repository";

interface ICreateAdvertisementJobUseCase {
    execute(body: CreateJobAdvertisementDto): Promise<AdvertisementJob>
}

export class CreateAdvertisementJobUseCase implements ICreateAdvertisementJobUseCase {

    constructor(
        private readonly advertisementJobRepository: AdvertisementJobRepository,
        private readonly categoryRepository: CategoryRepository,
        private readonly authRepository: AuthRepository,
        private readonly companyRepository: CompanyRepository
    ) { }

    async execute(body: CreateJobAdvertisementDto): Promise<AdvertisementJob> {
        const [category, user, company] = await Promise.all([
            this.categoryRepository.findById(body.categoryId),
            body.userId ? this.authRepository.findById(body.userId) : Promise.resolve(null),
            body.companyId ? this.companyRepository.findById(body.companyId) : Promise.resolve(null),
        ]);

        if (!category) throw (`Category not found : ${body.categoryId}`);
        if (body.userId && !user) throw (`User ${body.userId}`);
        if (body.companyId && !company) throw (`Company ${body.companyId}`);

        const advertisement = await this.advertisementJobRepository.create(body)
        return advertisement
    }
}