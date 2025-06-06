import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

import { validate as isUUID } from 'uuid';

export const createProductPurchase = async(request: Request, response: Response) => {
    const { userId, productId, storeId, price } = request.body;

    const ids = { userId, productId, storeId };

    const invalidFields: string[] = [];

    for (const [key, value] of Object.entries(ids)){
        if(value !== undefined && value !== null && value !== ''){
            if(!isUUID(value)){
                invalidFields.push(key);
            }
        }
        
    }

    if(invalidFields.length > 0){
        response.status(400).json({
           error: `Invalid ID format for: ${invalidFields.join(', ')}` ,
        })

        return;
    };

    try{

        const [user, product, store] = await Promise.all([
            prisma.user.findUnique({ where: {id: userId}}),
            prisma.product.findUnique({ where: {id: productId}}),
            prisma.store.findUnique({ where: {id: storeId}}),
        ]);

        if(!user) invalidFields.push('userId');
        if(!product) invalidFields.push('productId');
        if(!store) invalidFields.push('storeId');

        if(invalidFields.length > 0){
            const errors = invalidFields.map(field => ({
                field,
                message: `${field} not found`,
            }));

            response.status(404).json({ errors });
            return;
        }
        
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
