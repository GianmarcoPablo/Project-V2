import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { AppError } from "../../errors/custom-error";
import { IHashPasswordService } from "../../providers-interfaces/auth/hash-password.service.interface";
import { ITokenService } from "../../providers-interfaces/auth/token.service.interface";
import { AuthRepository } from "../../repositories/auth/auth.repository";

interface IRegisterUserUseCase {
    execute(body: RegisterUserDto): Promise<string>
}

export class RegisterUserUseCase implements IRegisterUserUseCase {

    constructor(
        private userRepository: AuthRepository,
        //servicios
        private passwordService: IHashPasswordService,
        private tokenService: ITokenService,
    ) { }

    async execute(body: RegisterUserDto): Promise<string> {
        const existingUser = await this.userRepository.findByEmail(body.email);
        if (existingUser) throw new AppError("User already exists", 400);
        body.password = await this.passwordService.hash(body.password);
        const newUser = await this.userRepository.registerUser(body)
        return await this.tokenService.generateToken({ id: newUser.id })
    }

}