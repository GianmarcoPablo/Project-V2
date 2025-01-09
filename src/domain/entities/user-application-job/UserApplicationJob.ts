type ApplicationStatus = "PENDING" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "ACCEPTED"

export class UserApplicationJob {
    constructor(
        public id: string,
        public userId: string,
        public jobId: string,
        public status: ApplicationStatus,
        public createdAt: Date,
        public updatedAt: Date,
        public coverLetter?: string,
        public resumeLink?: string,
    ) { }
}