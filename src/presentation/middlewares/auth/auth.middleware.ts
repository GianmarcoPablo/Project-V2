import { Context, Next } from "hono";
import { decode } from "hono/jwt";
import { prisma } from "../../../infrastructure/orm/prisma";
import { User } from "@prisma/client";
import { JwtTokenInvalid } from "hono/utils/jwt/types";

declare module "hono" {
    interface HonoRequest {
        user?: User;
    }
}

export class AuthMiddleware {
    public static async authenticate(c: Context, next: Next) {
        try {
            const bearer = c.req.header("Authorization");
            if (!bearer) {
                return c.json({ msg: "Unauthorized: No Authorization header" }, 401);
            }

            const [, token] = bearer.split(" ");
            if (!token) {
                return c.json({ msg: "Unauthorized: No token provided" }, 401);
            }

            try {
                const { payload } = decode(token);
                if (!payload || !payload.id) {
                    return c.json({ msg: "Unauthorized: Invalid token payload" }, 401);
                }

                const user = await prisma.user.findUnique({ where: { id: payload.id as string } });
                if (!user) {
                    return c.json({ msg: "Unauthorized: User not found" }, 401);
                }

                c.req.user = user;
                await next();
            } catch (error) {
                if (error instanceof JwtTokenInvalid) {
                    return c.json({ msg: "Unauthorized: Invalid token format" }, 401);
                }
                throw error; // Maneja otros errores inesperados
            }
        } catch (error) {
            console.error("Authentication error:", error);
            return c.json({ msg: "Internal Server Error: Authentication failed" }, 500);
        }
    }
}
