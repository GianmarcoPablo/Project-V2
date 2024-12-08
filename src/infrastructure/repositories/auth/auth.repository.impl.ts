import { User } from "../../../domain/entities/auth/User";
import { RegisterUserDto } from "../../../domain/dtos/auth/register-user.dto";
import { AuthRepository } from "../../../domain/repositories/auth/auth.repository";
import { prisma } from "../../orm/prisma";

export class AuthReposioryImpl implements AuthRepository {


    async findByEmail(email: string): Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            return user ? new User(
                user.id,
                user.email,
                user.name,
                user.password,
                user.roles
            ) : null;
        } catch (error) {
            console.error("Error login user:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }


    async registerUser(body: RegisterUserDto): Promise<User> {
        try {
            const user = await prisma.user.create({ data: body })
            return new User(user.id, user.email, user.name, user.password, user.roles)
        } catch (error) {
            console.error("Error registering user:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }

}