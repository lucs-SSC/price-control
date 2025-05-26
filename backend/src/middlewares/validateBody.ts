import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody =
    (schema: ZodSchema) =>
    (request: Request, response: Response, next: NextFunction):void => {
        const result = schema.safeParse(request.body);

        if(!result.success){
            const formattedErrors = result.error.errors.map((err) => ({
                field: err.path[0], 
                message: err.message,      
            }));

            response.status(400).json({ error: formattedErrors });
            return;
        }

        request.body = result.data;
        next()
    }