import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { UpdatedUserDto } from "../../dtos/auth/updated-user.dto";
import { User } from "../../entities/auth/User";

export abstract class AuthRepository {
    abstract registerUser(body: RegisterUserDto): Promise<User>
    abstract updated(userId: string, body: UpdatedUserDto): Promise<string>
    abstract findByEmail(email: string): Promise<User | null>
    abstract findById(id: string): Promise<User | null>
}