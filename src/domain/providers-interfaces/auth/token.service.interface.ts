import { JWTPayload } from "hono/utils/jwt/types";

export interface ITokenService {
    generateToken(payload: JWTPayload): Promise<string>;
    verifyToken(token: string): Promise<object>;
}