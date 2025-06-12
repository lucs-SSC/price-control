import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';
import { validateFields } from '../../utils/validateFields';


export const createProductPurchase = async(request: Request, response: Response) => {
    const { userId, productId, storeId, price } = request.body;

    const ids = { userId, productId, storeId };

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

    try{

        const createProductPurchase = await prisma.productPurchase.create({
            data: {
                price,
                purchasedAt: new Date(),
                userId,
                productId,
                storeId,
            }
        });
        
        response.status(200).json(createProductPurchase);
    }catch(error){
        response.status(500).json(`Something went wrong! ${console.log(error)}`);
    }
}
