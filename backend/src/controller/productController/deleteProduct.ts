import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';
import { validate as IsUUID } from 'uuid';

export const deleteProduct = async(request: Request, response: Response) => {
    const { id } = request.params;

    if(!IsUUID(id)){
        response.status(404).json('Invalid ID format!');
        return;
    }

    try {

        const productExists = await prisma.product.findUnique({
            where: { id }
        })

        if(!productExists){
            response.status(404).json('Product not found!');
            return;
        }

        await prisma.product.delete({
            where: { id }
        });

        response.status(204).end();

    }catch(error){
        response.status(500).json({ Error: 'Something went wrong, try again.'})
    }
}