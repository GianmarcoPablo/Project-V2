import { AdvertisementJob } from "../../entities/advertisement-job/Advertisement-job.entity";
import { AdvertisementJobRepository } from "../../repositories/advertisement-job/advertisement-job.repository";

interface IGetAllAdvertisementsJobUseCase {
    execute(body: PaginationJobsDto): Promise<{ currentPage: number; totalPages: number; advertisementsJobs: AdvertisementJob[] }>
}


export class GetAllAdvertisementsJobUseCase implements IGetAllAdvertisementsJobUseCase {

    constructor(
        private readonly repository: AdvertisementJobRepository
    ) { }

    async execute(body: PaginationJobsDto): Promise<{ currentPage: number; totalPages: number; advertisementsJobs: AdvertisementJob[] }> {
        const advertisementsJob = await this.repository.getAll(body)
        return advertisementsJob
    }
}