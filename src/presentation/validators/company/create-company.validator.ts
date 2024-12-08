import { z } from "zod"
import { zValidator } from "@hono/zod-validator"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png','image/jpg'];

const createCompanySchema = z.object({
    imageUrl: z.instanceof(File).optional()
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 3MB')
        .refine((file) => {
            return ACCEPTED_FILE_TYPES.includes(file!.type);
        }, 'File must be a PNG')
})

export const zCreateCompanySchema = zValidator("form", createCompanySchema)