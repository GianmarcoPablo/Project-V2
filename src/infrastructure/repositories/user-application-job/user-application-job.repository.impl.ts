import { prisma } from "../../orm/prisma";
import { CreateUserApplicationJob } from "../../../domain/dtos/user-application-job/create-user-application-job";
import { UserApplicationJob } from "../../../domain/entities/user-application-job/UserApplicationJob";
import { UserApplicationJobRepositoy } from "../../../domain/repositories/user-application-job/user-application-job.repository";


export class UserApplicationJobRepositoyImpl implements UserApplicationJobRepositoy {


    async create(body: CreateUserApplicationJob): Promise<UserApplicationJob> {
        try {
            const apply = await prisma.application.create({ data: body })
            return new UserApplicationJob(
                apply.id,
                apply.userId,
                apply.jobId,
                apply.status,
                apply.createdAt,
                apply.updatedAt,
                apply.coverLetter ? apply.coverLetter : undefined,
                apply.resumeLink ? apply.resumeLink : undefined,
            )
        } catch (error) {
            console.error("Error created application user for job:", error);
            throw error;
        }
    }


    getById(id: string): Promise<UserApplicationJob | null> {
        throw new Error("Method not implemented.");
    }

    getAllByUser(userId: string): Promise<UserApplicationJob[]> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}