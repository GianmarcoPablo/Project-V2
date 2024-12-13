import { $Enums } from "@prisma/client";

export interface UpdateJobAdvertisementDto {
    title?: string;
    description?: string;
    experienceLevel?: string;
    jobType?: $Enums.JobType; // Enum generado por Prisma
    workMode?: $Enums.WorkMode; // Enum generado por Prisma
    publishType?: any; // Enum generado por Prisma
    applicationLinks?: string[];
    requirements?: string[];
    benefits?: string[];
    languagesRequired?: string[];
    status?: $Enums.Status; // Enum generado por Prisma
    vacancies?: number;
    applicationDeadline?: string;
    salay?: number;
    location?: string;
    workHours?: string;
    additionalInformation?: string;
    userId?: string;
    companyId?: string;
    categoryId: string;
}