import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const saveAdvertisementJobSchema = z.object({})

export const zSaveAdvertisementJobSchema = zValidator("json", saveAdvertisementJobSchema, (result, c) => {
    if (!result.success) {
        return c.json('Invalid!', 400)
    }
});  