import { $Enums } from "@prisma/client";


export class AdvertisementJob {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public experienceLevel: string,
        public jobType: $Enums.JobType,
        public workMode: $Enums.WorkMode,
        public publishType: $Enums.TypePublishJobAdvertisement,
        public applicationLinks: string[],
        public requirements: string[],
        public benefits: string[],
        public languagesRequired: string[],
        public status: $Enums.Status,
        public vacancies: number,
        public createdAt: Date,
        public updatedAt: Date,
        public categoryId: string,
        public applicationDeadline?: Date,
        public salay?: number,
        public location?: string,
        public workHours?: string,
        public additionalInformation?: string,
        public userId?: string,
        public companyId?: string,
    ) { }
}