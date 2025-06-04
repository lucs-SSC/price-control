import { z } from 'zod';

export const validateStoreSchema = z.object({
    name: z
            .string({required_error: 'Name is required'})
            .min(1, 'Name is required')
});