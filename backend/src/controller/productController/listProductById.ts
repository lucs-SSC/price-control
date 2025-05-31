import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

import { validate as IsUUID} from 'uuid';

export const listProductsById = async(request: Request, response: Response ) => {
    const { id } = request.params;

    if(!IsUUID(id)){
        response.status(404).json('Invalid ID Format!');
        return;
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id },
        })

        if(!product){
            response.status(404).json('Product not found!');
            return;
        }

        response.status(200).json(product)
    }catch(error){
        response.status(500).json({Error: 'Something went wront, try again!'});
    }

}
