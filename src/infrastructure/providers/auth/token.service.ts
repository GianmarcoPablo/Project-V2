import { JWTPayload } from "hono/utils/jwt/types";
import { ITokenService } from "../../../domain/providers-interfaces/auth/token.service.interface";
import { sign, verify } from 'hono/jwt'

export class TokenService implements ITokenService {

    private readonly secret: string = "mySecretKey"

    async generateToken(payload: JWTPayload): Promise<string> {
        const token = await sign(payload, this.secret)
        return token
    }

    async verifyToken(token: string): Promise<JWTPayload> {
        const decodedPayload = await verify(token, this.secret)
        return decodedPayload
    }
}