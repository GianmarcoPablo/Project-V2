import { CreateJobAdvertisementDto } from "../../dtos/advertisement-job/create-advertisement-job.dto";
import { UpdateJobAdvertisementDto } from "../../dtos/advertisement-job/update-advertisement.dto";
import { AdvertisementJob } from "../../entities/advertisement-job/Advertisement-job.entity";

export abstract class AdvertisementJobRepository {
    abstract create(body: CreateJobAdvertisementDto): Promise<AdvertisementJob>
    abstract getAll(body: any): Promise<AdvertisementJob[]>
    abstract update(id: string, body: UpdateJobAdvertisementDto): Promise<AdvertisementJob>
}