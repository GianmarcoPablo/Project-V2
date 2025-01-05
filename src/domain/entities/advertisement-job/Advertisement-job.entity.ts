

export class AdvertisementJob {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public experienceLevel: string,
        public jobType: string,
        public workMode: string,
        public publishType: string,
        public applicationLinks: string[],
        public requirements: string[],
        public benefits: string[],
        public languagesRequired: string[],
        public status: string,
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
        public user?: { name: string },
        public company?: { name: string, logoUrl?: string, isVerified: boolean },
    ) { }
}
