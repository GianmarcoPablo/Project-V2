import { zValidator } from '@hono/zod-validator';
import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const CreateJobAdvertisementSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    experienceLevel: z.string().min(1, "Experience level is required"),
    jobType: z.nativeEnum($Enums.JobType),
    workMode: z.nativeEnum($Enums.WorkMode),
    publishType: z.nativeEnum($Enums.TypePublishJobAdvertisement),
    applicationLinks: z.array(z.string().url("it must be a valid url")),
    requirements: z.array(z.string()),
    benefits: z.array(z.string()),
    languagesRequired: z.array(z.string()),
    status: z.nativeEnum($Enums.Status).default("ACTIVE"),
    vacancies: z.number().int().positive("must be a positive integer").default(1),
    applicationDeadline: z.string().datetime().optional(),
    salay: z.number().positive("Salary must be a positive number").optional(),
    location: z.string().optional(),
    workHours: z.string().optional(),
    additionalInformation: z.string().optional(),
    userId: z.string().uuid("must be a valid uuid").optional(),
    companyId: z.string().uuid("must be a valid uuid").optional(),
    categoryId: z.string().uuid("must be a valid uuid"),
}).transform((data) => {
    // Automatically set publishType based on userId or companyId
    if (data.userId) {
        return { ...data, publishType: "USER" };
    }
    if (data.companyId) {
        return { ...data, publishType: "COMPANY" };
    }
    return data;
}).refine(
    (data) => {
        // Ensure either userId or companyId is provided, but not both
        const hasUserId = data.userId !== undefined;
        const hasCompanyId = data.companyId !== undefined;

        return (hasUserId || hasCompanyId) && !(hasUserId && hasCompanyId);
    },
    {
        message: "Must provide either userId or companyId, but not both",
        path: ["userId", "companyId"]
    }
);

export const zCreateAdvertisementJobSchema = zValidator("json", CreateJobAdvertisementSchema, (result, c) => {
    if (!result.success) {
        return c.json('Invalid!', 400)
    }
});  