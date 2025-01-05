import { CreateJobAdvertisementDto } from "../../../domain/dtos/advertisement-job/create-advertisement-job.dto";
import { SaveAdvertisementJobDto } from "../../../domain/dtos/advertisement-job/save-advertisement-job.dto";
import { UpdateJobAdvertisementDto } from "../../../domain/dtos/advertisement-job/update-advertisement.dto";
import { AdvertisementJob } from "../../../domain/entities/advertisement-job/Advertisement-job.entity";
import { SaveAdvertisementJob } from "../../../domain/entities/advertisement-job/SaveAdvertisementJob.entity";
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
            const advertisementsJob = await prisma.jobAdvertisement.findMany({
                include: {
                    Company: {
                        select: {
                            name: true,
                            logoUrl: true,
                            isVerified: true,
                        }
                    },
                    User: {
                        select: {
                            name: true,
                        }
                    }
                }
            })
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
                    advertisementJob.applicationDeadline ?? undefined,
                    advertisementJob.salay ?? undefined,
                    advertisementJob.location ?? undefined,
                    advertisementJob.workHours ?? undefined,
                    advertisementJob.additionalInformation ?? undefined,
                    advertisementJob.userId ?? undefined,
                    advertisementJob.companyId ?? undefined,
                    advertisementJob.User ? { name: advertisementJob.User.name } : undefined,
                    advertisementJob.Company ? {
                        name: advertisementJob.Company.name,
                        logoUrl: advertisementJob.Company.logoUrl ? advertisementJob.Company.logoUrl : undefined,
                        isVerified: advertisementJob.Company.isVerified
                    } : undefined
                )
            );

        } catch (error) {
            console.error("Error get all advertismenet:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }

    async getById(id: string): Promise<AdvertisementJob | null> {
        try {
            const advertisement = await prisma.jobAdvertisement.findUnique({ where: { id } })
            if (!advertisement) return null
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
            console.error("Error get  advertismenet:", error);
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

    async delete(id: string): Promise<string> {
        return `eliminando el aviso con el id ${id}`
    }

    async save(body: SaveAdvertisementJobDto): Promise<any> {
        try {
            const userId = body.userId
            const jobId = body.jobId
            const existingSavedJob = await prisma.savedAdvertisementJob.findUnique({
                where: {
                    userId_jobId: { userId, jobId }
                },
            });

            if (existingSavedJob) {
                // Eliminar si ya está guardado
                await prisma.savedAdvertisementJob.delete({
                    where: {
                        userId_jobId: { userId, jobId },
                    },
                });
                return { isSaved: false }
            } else {
                // Guardar si no está guardado
                await prisma.savedAdvertisementJob.create({
                    data: { userId, jobId },
                });
                return { isSaved: true }
            }
        } catch (error) {
            throw error
        }
    }
}