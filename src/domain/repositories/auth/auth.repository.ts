import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { User } from "../../entities/auth/User";

export abstract class AuthRepository {
    abstract registerUser(body: RegisterUserDto): Promise<User>
    abstract findByEmail(email: string): Promise<User | null>
}