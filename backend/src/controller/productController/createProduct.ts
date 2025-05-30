import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

export const createProduct = async(request: Request, response: Response) => {
    const { name } = request.body;

    try {
        const product = await prisma.product.create({
            data: {
                name
            }
        })

        response.status(200).json(product);
    }catch(error){
        response.status(500).json({error: 'Something went wrong, try again'})
    }
}