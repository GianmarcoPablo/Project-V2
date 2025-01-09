import { CreateJobAdvertisementDto } from "../../dtos/advertisement-job/create-advertisement-job.dto";
import { SaveAdvertisementJobDto } from "../../dtos/advertisement-job/save-advertisement-job.dto";
import { UpdateJobAdvertisementDto } from "../../dtos/advertisement-job/update-advertisement.dto";
import { AdvertisementJob } from "../../entities/advertisement-job/Advertisement-job.entity";
import { SaveAdvertisementJob } from "../../entities/advertisement-job/SaveAdvertisementJob.entity";

export abstract class AdvertisementJobRepository {
    abstract create(body: CreateJobAdvertisementDto): Promise<AdvertisementJob>
    abstract getAll(body: any): Promise<{ currentPage: number; totalPages: number; totalJobs: number; advertisementsJobs: AdvertisementJob[] }>
    abstract getById(id: string): Promise<AdvertisementJob | null>
    abstract update(id: string, body: UpdateJobAdvertisementDto): Promise<AdvertisementJob>
    abstract delete(id: string): Promise<string>
    abstract save(body: SaveAdvertisementJobDto): Promise<SaveAdvertisementJob>
}