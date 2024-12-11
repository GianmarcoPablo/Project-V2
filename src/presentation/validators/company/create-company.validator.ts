import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const createCompanySchema = z.object({
    name: z.string(),
    description: z.string(),
    isVerified: z.preprocess(
        (value) => {
            // Manejo para array o cadenas
            if (Array.isArray(value)) {
                return value[0] === "true";
            }
            if (typeof value === "string") {
                return value === "true" ? true : value === "false" ? false : value;
            }
            return value; // Devolver tal cual para otros casos
        },
        z.boolean()
    ),
    socialLinks: z.preprocess(
        (value) => (Array.isArray(value) ? value.filter((v) => v !== undefined) : []),
        z.array(z.string())
    ),
    industry: z.string(),
    userId: z.string().uuid(),
    phone: z.string(),
    address: z.string(),
    website: z.string(),
    logoUrl: z.instanceof(File)
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 3MB')
        .refine((file) => {
            return file && ACCEPTED_FILE_TYPES.includes(file.type);
        }, `File must be one of the following types: ${ACCEPTED_FILE_TYPES.join(", ")}`)
});

export const zCreateCompanySchema = zValidator("form", createCompanySchema);
