import { IHashPasswordService } from "../../../domain/providers-interfaces/auth/hash-password.service.interface";

export class HashPasswordService implements IHashPasswordService {

    async hash(password: string): Promise<string> {
        const hashPassword = await Bun.password.hash(password)
        return hashPassword
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        const isPasswordValid = await Bun.password.verify(password, hashedPassword)
        if (!isPasswordValid) return false
        return true
    }
}