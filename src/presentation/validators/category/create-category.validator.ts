import { z } from "zod";
import { zValidator } from "@hono/zod-validator";


const createCategorySchema = z.object({
    name: z.string(),

});

export const zCreateCategorySchema = zValidator("json", createCategorySchema);
