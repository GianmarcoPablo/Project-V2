import { AdvertisementJob } from "../../entities/advertisement-job/Advertisement-job.entity";
import { AdvertisementJobRepository } from "../../repositories/advertisement-job/advertisement-job.repository";

interface IGetAdvertisementJobByIdUseCase {
    execute(id: string): Promise<AdvertisementJob>
}

export class GetAdvertisementJobByIdUseCase implements IGetAdvertisementJobByIdUseCase {

    constructor(
        private readonly repository: AdvertisementJobRepository
    ) { }

    async execute(id: string): Promise<AdvertisementJob> {
        const advertisementsJob = await this.repository.getById(id)
        if (!advertisementsJob) throw "Nod found"
        return advertisementsJob
    }
}