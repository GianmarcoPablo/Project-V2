import { z } from "zod"
import { zValidator } from "@hono/zod-validator"

const registerUserSchema = z.object({
    name: z.string({ required_error: "El nombre es obligatorio" }),
    email: z.string({ required_error: "El correo es obligatorio" }).email({ message: "Email Invalido" }),
    password: z
        .string()
        .min(8, { message: 'La contraseña debe tener al menos 8 carateres' })
        .regex(/[a-zA-Z]/, { message: 'La contraseña debe contener al menos una letra' })
        .regex(/[0-9]/, { message: 'La contraseña debe contener al menos una numero' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'La contraseña debe contener al menos caracter especial',
        })
        .trim(),
    roles: z.array(z.string())
})

export const zRegisterUserValidator = zValidator("json", registerUserSchema)

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
