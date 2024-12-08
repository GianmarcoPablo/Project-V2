import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { IHashPasswordService } from "../../providers-interfaces/auth/hash-password.service.interface";
import { ITokenService } from "../../providers-interfaces/auth/token.service.interface";
import { AuthRepository } from "../../repositories/auth/auth.repository";

interface ILoginUserUseCase {
    execute(body: LoginUserDto): Promise<string>
}

export class LoginUserUseCase implements ILoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        //services
        private passwordService: IHashPasswordService,
        private tokenService: ITokenService,
    ) { }


    async execute(body: LoginUserDto): Promise<string> {

        const user = await this.authRepository.findByEmail(body.email);
        if (!user) throw new Error('Invalid credentials');
        const isPasswordValid = await this.passwordService.compare(body.password, user.password)
        if (!isPasswordValid) throw new Error('Invalid credentials');
        return this.tokenService.generateToken({ id: user.id })

    }
}