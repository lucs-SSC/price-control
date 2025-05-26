import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

import { validate as isUUID } from 'uuid';

export const listUserById = async (request: Request, response: Response ) => {
    const { id } = request.params;
    
    if(!isUUID(id)){
        response.status(400).json({ error: 'Invalid ID format'});
        return;
    }

    try{

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
              name: true,
              email: true,
            }
        });

        

        if(!user){
            response.status(404).json({ error: 'User not found' });
            return;
        }

        response.status(200).json(user);
    }catch(error){

        response.status(500).json({ error: `Server error.`});
    }
}
