import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

export const createStore = async(request: Request, response: Response) =>{
    try {
        const { name } = request.body;

        const store = await prisma.store.create({
            data: {
                name,
            }
        });

        response.status(200).json(store)

    }catch(error){
        response.status(500).json({Error: 'Something went wrong!'})
    }
}