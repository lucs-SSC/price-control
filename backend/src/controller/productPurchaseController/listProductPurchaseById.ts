import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

import { validate as isUUID} from 'uuid';

export const listProductPurchaseById = async (request: Request, response: Response ) => {
    const { id } = request.params;

    if(!isUUID(id)){
        response.status(400).json('Invalid ID format!');
        return;
    }

    try {
        const productPurchaseExists = await prisma.productPurchase.findUnique({
            where: { id }
        });

        if(!productPurchaseExists){
            response.status(404).json('Product Purchase not Found!');
            return;
        }

        response.status(200).json(productPurchaseExists);
    }catch(error){  
        response.status(500).json('Something went wrong!');
    }
}