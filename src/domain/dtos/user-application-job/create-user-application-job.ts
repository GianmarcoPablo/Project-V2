
type ApplicationStatus = "PENDING" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "ACCEPTED"

export interface CreateUserApplicationJob {
    userId: string,
    jobId: string,
    status: ApplicationStatus,
    createdAt: Date,
    updatedAt: Date,
    coverLetter?: string,
    resumeLink?: string,
}