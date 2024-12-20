import { CreateUserApplicationJob } from "../../dtos/user-application-job/create-user-application-job";
import { UserApplicationJob } from "../../entities/user-application-job/UserApplicationJob";
import { UserApplicationJobRepositoy } from "../../repositories/user-application-job/user-application-job.repository";

interface ICreateUserApplicationJobUseCase {
    execute(body: CreateUserApplicationJob): Promise<UserApplicationJob>
}


export class CreateUserApplicationJobUseCase implements ICreateUserApplicationJobUseCase {

    constructor(
        private readonly repository: UserApplicationJobRepositoy
    ) { }

    async execute(body: CreateUserApplicationJob): Promise<UserApplicationJob> {
        const data = await this.repository.create(body)
        return data
    }
}