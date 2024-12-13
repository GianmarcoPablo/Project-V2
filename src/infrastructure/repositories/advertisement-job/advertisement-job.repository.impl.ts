import { CreateJobAdvertisementDto } from "../../../domain/dtos/advertisement-job/create-advertisement-job.dto";
import { UpdateJobAdvertisementDto } from "../../../domain/dtos/advertisement-job/update-advertisement.dto";
import { AdvertisementJob } from "../../../domain/entities/advertisement-job/Advertisement-job.entity";
import { AdvertisementJobRepository } from "../../../domain/repositories/advertisement-job/advertisement-job.repository";
import { prisma } from "../../orm/prisma";


export class AdvertisementJobRepositoryImpl implements AdvertisementJobRepository {

    async create(body: CreateJobAdvertisementDto): Promise<AdvertisementJob> {
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

    async getAll(body: any): Promise<AdvertisementJob[]> {
        try {
            const advertisementsJob = await prisma.jobAdvertisement.findMany()
            return advertisementsJob.map(advertisementJob =>
                new AdvertisementJob(
                    advertisementJob.id,
                    advertisementJob.title,
                    advertisementJob.description,
                    advertisementJob.experienceLevel,
                    advertisementJob.jobType,
                    advertisementJob.workMode,
                    advertisementJob.publishType,
                    advertisementJob.applicationLinks,
                    advertisementJob.requirements,
                    advertisementJob.benefits,
                    advertisementJob.languagesRequired,
                    advertisementJob.status,
                    advertisementJob.vacancies,
                    advertisementJob.createdAt,
                    advertisementJob.updatedAt,
                    advertisementJob.categoryId,
                    advertisementJob.applicationDeadline ? advertisementJob.applicationDeadline : undefined,
                    advertisementJob.salay ? advertisementJob.salay : undefined,
                    advertisementJob.location ? advertisementJob.location : undefined,
                    advertisementJob.workHours ? advertisementJob.workHours : undefined,
                    advertisementJob.additionalInformation ? advertisementJob.additionalInformation : undefined,
                    advertisementJob.userId ? advertisementJob.userId : undefined,
                    advertisementJob.companyId ? advertisementJob.companyId : undefined,
                )
            )
        } catch (error) {
            console.error("Error get all advertismenet:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }

    async update(id: string, body: UpdateJobAdvertisementDto): Promise<AdvertisementJob> {
        try {
            const advertisement = await prisma.jobAdvertisement.update({ where: { id }, data: body })
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
            console.error("Error update advertismenet:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }
}