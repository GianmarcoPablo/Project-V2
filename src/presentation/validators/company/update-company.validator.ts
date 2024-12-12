import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const updateCompanySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isVerified: z.preprocess(
        (value) => {
            if (Array.isArray(value)) {
                return value[0] === "true";
            }
            if (typeof value === "string") {
                return value === "true" ? true : value === "false" ? false : value;
            }
            return value;
        },
        z.boolean().optional()
    ),
    socialLinks: z.preprocess(
        (value) => (Array.isArray(value) ? value.filter((v) => v !== undefined) : []),
        z.array(z.string()).optional()
    ),
    industry: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    website: z.string().optional(),
    logoUrl: z
        .instanceof(File)
        .refine(
            (file) => !file || file.size <= MAX_UPLOAD_SIZE,
            "File size must be less than 3MB"
        )
        .refine(
            (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
            `File must be one of the following types: ${ACCEPTED_FILE_TYPES.join(", ")}`
        )
        .optional(),
});

export const zUpdateCompanySchema = zValidator("form", updateCompanySchema);
