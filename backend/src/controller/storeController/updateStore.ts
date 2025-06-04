import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';
import { validate as isUUID } from 'uuid';


export const updateStore = async(request: Request, response: Response) =>{
    const { id } = request.params;

    if(!isUUID(id)){
        response.status(400).json('Invalid ID format!');
        return;
    }

    try{
        const { name } = request.body;

        const storeExists = await prisma.store.findUnique({
            where: {id}
        })

        if(!storeExists){
            response.status(404).json('Store not found!');
            return;
        }

        const updateStore = await prisma.store.update({
            where: { id },
            data: {
                name
            }
        });

        response.status(200).json(updateStore);

    }catch(error){
        response.status(500).json(`Something went wrong`);
    }

}