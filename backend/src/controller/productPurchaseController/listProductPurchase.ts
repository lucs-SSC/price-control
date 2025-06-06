import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

export const listProductsPurchase = async(request: Request, response: Response) => {
    try {
        const listProductsPurchase = await prisma.productPurchase.findMany({
            select: {
                id: true,
                price: true,
                purchasedAt: true,
                Product: {
                    select: {
                        name: true,
                    }
                },
                Store: {
                    select: {
                        name: true
                    }
                }
            }
        })

        response.status(200).json(listProductsPurchase);
    }catch(error){
        response.status(500).json('Something went Wrong!');
    }
}