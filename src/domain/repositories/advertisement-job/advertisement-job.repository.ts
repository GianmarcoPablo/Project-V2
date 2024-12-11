import { CreateJobAdvertisementDto } from "../../dtos/advertisement-job/create-advertisement-job.dto";
import { AdvertisementJob } from "../../entities/advertisement-job/Advertisement-job.entity";

export abstract class AdvertisementJobRepository {
    abstract createAdvertisementJob(body: CreateJobAdvertisementDto): Promise<AdvertisementJob>
}