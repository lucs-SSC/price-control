import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

export const listProducts = async(request: Request, response: Response) => {
    try {
        const products = await prisma.product.findMany({
            select:{
                id: true,
                name: true,
            }
        });

        response.status(200).json(products);
    }catch(error) {
        response.status(500).json({error: 'Something went wrong, try again!'});
    }
}