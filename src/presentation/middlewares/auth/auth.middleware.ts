import { Context, Next } from "hono";
import { decode } from "hono/jwt";
import { prisma } from "../../../infrastructure/orm/prisma";
import { User } from "@prisma/client";

declare module "hono" {
    interface HonoRequest {
        user?: User
    }
}

export class AuthMiddleware {


    public static async authenticate(c: Context, next: Next) {
        try {
            const bearer = c.req.header("Authorization")
            if (!bearer) return c.json({ msg: "Unauthorized" }, 401)
            const [, token] = bearer.split(" ")
            if (!token) return c.json({ msg: "Unauthorized" }, 401)
            const { header, payload } = decode(token)
            if (!payload.id) return c.json({ msg: "Unauthorized" }, 401)
            const sub = payload.id as string
            if (!sub) return c.json({ msg: "Unauthorized" }, 401)
            const user = await prisma.user.findUnique({ where: { id: sub } })
            if (!user) return c.json({ msg: "Unauthorized" }, 401)
            c.req.user = user
            await next()
        } catch (error) {
            throw error
        }
    }
}