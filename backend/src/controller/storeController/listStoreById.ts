
import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';
import { validate as isUUID } from 'uuid';

export const listStoreById = async (request: Request, response: Response) => {
    const { id } = request.params;

    if(!isUUID(id)){
        response.status(400).json('Invalid ID format!');
        return;
    }

    try{
        const storeExists = await prisma.store.findUnique({
            where: { id }
        })

        if(!storeExists){
            response.status(404).json('Store not found.');
            return;
        }

        response.status(200).json(storeExists);
    }catch(error){
        response.status(500).json({Error: 'Something went wrong!'});
    }
}