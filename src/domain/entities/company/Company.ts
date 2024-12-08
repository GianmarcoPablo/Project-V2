
export class Company {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public logoUrl: string,
        public isVerified: boolean,
        public socialLinks: string[],
        public createdAt: Date,
        public updatedAt: Date,
        public userId: string,
        public phone?: string,
        public address?: string,
        public industry?: string,
        public website?: string
    ) { }

}