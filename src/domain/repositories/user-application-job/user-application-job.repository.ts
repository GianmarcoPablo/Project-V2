import { CreateUserApplicationJob } from "../../dtos/user-application-job/create-user-application-job";
import { UserApplicationJob } from "../../entities/user-application-job/UserApplicationJob";

export abstract class UserApplicationJobRepositoy {
    abstract create(body: CreateUserApplicationJob): Promise<UserApplicationJob>
    abstract getById(id: string): Promise<UserApplicationJob | null>
    abstract getAllByUser(userId: string): Promise<UserApplicationJob[]>
    abstract delete(id: string): Promise<string>
}