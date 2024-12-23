import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { IHashPasswordService } from "../../providers-interfaces/auth/hash-password.service.interface";
import { ITokenService } from "../../providers-interfaces/auth/token.service.interface";
import { AuthRepository } from "../../repositories/auth/auth.repository";
import { stripe } from "../../../config/stripe";

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
        if (existingUser) throw new Error("User already exits")
        body.password = await this.passwordService.hash(body.password);
        const newUser = await this.userRepository.registerUser(body)

        const customer = await stripe.customers.create({
            email: newUser.email,
            metadata: { userId: newUser.id }
        });

        await this.userRepository.updated(newUser.id, { customerId: customer.id })

        return await this.tokenService.generateToken({ id: newUser.id })
    }

}