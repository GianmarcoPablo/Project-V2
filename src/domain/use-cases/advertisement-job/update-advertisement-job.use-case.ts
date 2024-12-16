import { UpdateJobAdvertisementDto } from "../../dtos/advertisement-job/update-advertisement.dto";
import { AdvertisementJob } from "../../entities/advertisement-job/Advertisement-job.entity";
import { AdvertisementJobRepository } from "../../repositories/advertisement-job/advertisement-job.repository";

interface IUpdateAdvertisementJobUseCase {
    execute(id: string, body: UpdateJobAdvertisementDto): Promise<AdvertisementJob>
}

export class UpdateAdvertisementJobUseCase implements IUpdateAdvertisementJobUseCase {

    constructor(
        private readonly repository: AdvertisementJobRepository
    ) { }

    async execute(id: string, body: UpdateJobAdvertisementDto): Promise<AdvertisementJob> {
        const advertisementsJob = await this.repository.update(id, body)
        return advertisementsJob
    }
}