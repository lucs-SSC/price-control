import { z } from 'zod';

export const validateProductSchema = z.object({
    name: z
            .string({required_error: 'Name is required'})
            .min(1, 'Name is required')
});