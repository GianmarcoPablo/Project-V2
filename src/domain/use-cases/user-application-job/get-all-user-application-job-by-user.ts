import { UserApplicationJob } from "../../entities/user-application-job/UserApplicationJob";
import { UserApplicationJobRepositoy } from "../../repositories/user-application-job/user-application-job.repository";

interface IGetAllUserApplicationJobByUser {
    execute(userId: string): Promise<UserApplicationJob[]>
}

export class GetAllUserApplicationJobByUser implements IGetAllUserApplicationJobByUser {

    constructor(
        private readonly repository: UserApplicationJobRepositoy
    ) { }

    async execute(userId: string): Promise<UserApplicationJob[]> {
        const data = await this.repository.getAllByUser(userId)
        return data
    }
}