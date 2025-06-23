import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

import { validateFields } from '../../utils/validateFields';

export const updateProductPurchase = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { userId, productId, storeId, price } = request.body;

    const { invalidFormat, notFound } = await validateFields({ userId, productId, storeId });
    
    if(invalidFormat.length > 0) {
        response.status(400).json({error: `Invalid ID format for: ${invalidFormat.join(', ')}`});
        return;
    }

   if(notFound.length > 0 ){
        const errors = notFound.map(field => ({
            field,
            message: `${field} not found`,
        }));

        response.status(404).json({ errors });
        return;
   }


   try {
        const productPurchaseExists = await prisma.productPurchase.findUnique({where: { id }});

        if(!productPurchaseExists){
            response.status(404).json('Product Purchase not found!');
            return;
        }

        const updateProductPurchase = await prisma.productPurchase.update({
            where: { id },
            data: {
                price,
                userId,
                productId,
                storeId,
            }
        });

        response.status(200).json(updateProductPurchase);
   }catch(error) {
    console.log(error);
    response.status(500).json('Something went wrong!');
   }
}