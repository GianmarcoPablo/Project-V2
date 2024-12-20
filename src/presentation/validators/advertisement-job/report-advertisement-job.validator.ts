import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const reportAdvertisementJobSchema = z.object({})

export const zReportAdvertisementJobSchema = zValidator("json", reportAdvertisementJobSchema, (result, c) => {
    if (!result.success) {
        return c.json('Invalid!', 400)
    }
});  