import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

export const listStores = async(request: Request, response: Response) => {
    try{
        const listStores = await prisma.store.findMany({
            select: { 
                id: true,
                name: true
            }
        })

        response.status(200).json(listStores)
    }catch(error){
        response.status(500).json({Error: 'Something went wrong.'})
    }
}