import { Hono } from "hono";
import { zRegisterUserValidator } from "../../validators/auth/register-user.validator";
import { zLoginUserSchema } from "../../validators/auth/login-user.validator";
import { RegisterUserUseCase } from "../../../domain/use-cases/auth/register-user.use-case";
import { AuthRepository } from "../../../domain/repositories/auth/auth.repository";
import { BlankEnv, BlankSchema } from "hono/types";
import { IHashPasswordService } from "../../../domain/providers-interfaces/auth/hash-password.service.interface";
import { ITokenService } from "../../../domain/providers-interfaces/auth/token.service.interface";
import { LoginUserUseCase } from "../../../domain/use-cases/auth/login-user.use-case";


export class AuthRoutes {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly passwordService: IHashPasswordService,
        private readonly tokenService: ITokenService
    ) { }

    public get routes(): Hono<BlankEnv, BlankSchema, "/"> {
        const router = new Hono();

        router.post("/register", zRegisterUserValidator, async (c) => {
            const body = c.req.valid("json");
            const data = await new RegisterUserUseCase(this.authRepository, this.passwordService, this.tokenService).execute(body);
            return c.json(data);
        });

        router.post("/login", zLoginUserSchema, async (c) => {
            const body = c.req.valid("form");
            const data = await new LoginUserUseCase(this.authRepository, this.passwordService, this.tokenService).execute(body)
            return c.json(data);
        });

        return router;
    }
}





