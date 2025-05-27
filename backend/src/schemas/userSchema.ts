import { z } from 'zod';

export const createUserSchema = z.object({
    name: z
            .string({ required_error: 'Name is required'})
            .min(1, 'Name is required.'),
    email: z
            .string({ required_error: 'Email is required'})
            .email('Invalid email.'),
    password: z
            .string({ required_error: 'Password is required'})
            .min(8, 'Password must have at least 8 characteres.') 
})

export const updateUserSchema = z.object({
        name: z
                .string({ required_error: 'Name is required.'})
                .min(1, 'Name is required.'),
        email: z
                .string({ required_error: 'Email is required.'})
                .email('Invalid email.'),
})