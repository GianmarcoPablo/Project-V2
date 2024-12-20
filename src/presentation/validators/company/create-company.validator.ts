import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const createCompanySchema = z.object({
    name: z.string(),
    description: z.string(),
    isVerified: z.boolean().default(false),
    socialLinks: z.preprocess(
        (value) => (Array.isArray(value) ? value.filter((v) => v !== undefined) : []),
        z.array(z.string())
    ),
    industry: z.string(),
    userId: z.string().uuid(),
    phone: z.string().optional(),
    address: z.string().optional(),
    website: z.string().optional(),
    logoUrl: z.instanceof(File)
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 3MB')
        .refine((file) => {
            return file && ACCEPTED_FILE_TYPES.includes(file.type);
        }, `File must be one of the following types: ${ACCEPTED_FILE_TYPES.join(", ")}`).optional(),
    bannerUrl: z.instanceof(File)
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 3MB')
        .refine((file) => {
            return file && ACCEPTED_FILE_TYPES.includes(file.type);
        }, `File must be one of the following types: ${ACCEPTED_FILE_TYPES.join(", ")}`).optional()
});

export const zCreateCompanySchema = zValidator("form", createCompanySchema);
