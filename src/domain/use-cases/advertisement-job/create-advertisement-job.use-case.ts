import { CreateJobAdvertisementDto } from "../../dtos/advertisement-job/create-advertisement-job.dto";
import { AdvertisementJob } from "../../entities/advertisement-job/Advertisement-job.entity";
import { AdvertisementJobRepository } from "../../repositories/advertisement-job/advertisement-job.repository";
import { CategoryRepository } from "../../repositories/category/category.repository";

interface ICreateAdvertisementJobUseCase {
    execute(body: CreateJobAdvertisementDto): Promise<AdvertisementJob>
}

export class CreateAdvertisementJobUseCase implements ICreateAdvertisementJobUseCase {

    constructor(
        private readonly advertisementJobRepository: AdvertisementJobRepository,
        private readonly categoryRepository: CategoryRepository
    ) { }

    async execute(body: CreateJobAdvertisementDto): Promise<AdvertisementJob> {
        const category = await this.categoryRepository.findCategoryById(body.categoryId);
        if (!category) throw ('Category not found');
        const advertisement = await this.advertisementJobRepository.createAdvertisementJob(body)
        return advertisement
    }
}