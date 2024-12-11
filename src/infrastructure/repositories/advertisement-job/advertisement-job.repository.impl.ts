import { CreateJobAdvertisementDto } from "../../../domain/dtos/advertisement-job/create-advertisement-job.dto";
import { AdvertisementJob } from "../../../domain/entities/advertisement-job/Advertisement-job.entity";
import { AdvertisementJobRepository } from "../../../domain/repositories/advertisement-job/advertisement-job.repository";
import { prisma } from "../../orm/prisma";


export class AdvertisementJobRepositoryImpl implements AdvertisementJobRepository {

    async createAdvertisementJob(body: CreateJobAdvertisementDto): Promise<AdvertisementJob> {
        try {
            const advertisement = await prisma.jobAdvertisement.create({ data: body })
            return new AdvertisementJob(
                advertisement.id,
                advertisement.title,
                advertisement.description,
                advertisement.experienceLevel,
                advertisement.jobType,
                advertisement.workMode,
                advertisement.publishType,
                advertisement.applicationLinks,
                advertisement.requirements,
                advertisement.benefits,
                advertisement.languagesRequired,
                advertisement.status,
                advertisement.vacancies,
                advertisement.createdAt,
                advertisement.updatedAt,
                advertisement.categoryId,
                advertisement.applicationDeadline ? advertisement.applicationDeadline : undefined,
                advertisement.salay ? advertisement.salay : undefined,
                advertisement.location ? advertisement.location : undefined,
                advertisement.workHours ? advertisement.workHours : undefined,
                advertisement.additionalInformation ? advertisement.additionalInformation : undefined,
                advertisement.userId ? advertisement.userId : undefined,
                advertisement.companyId ? advertisement.companyId : undefined,
            )
        } catch (error) {
            console.error("Error create advertismenet:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }
}