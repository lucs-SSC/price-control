import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';
import { validate as isUUID } from 'uuid';

export const updateProduct = async(request: Request, response: Response) => {
    const { id } = request.params;

    if(!isUUID(id)){
        response.status(404).json('Invalid ID format!');
        return;
    }

    try {
        const { name } = request.body;

        const productExists = await prisma.product.findUnique({
            where: { id}
        });

        if(!productExists){
            response.status(404).json('Product Not Found!');
            return;
        }

        const updateProduct = await prisma.product.update({
            where: { id },
            data: {
                name
            }
        });

        response.status(200).json(updateProduct);
    }catch(error){
        response.status(500).json('Something went wrong!');
    }
}