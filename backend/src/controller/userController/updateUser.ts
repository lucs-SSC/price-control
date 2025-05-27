import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';
import { validate as isUUID } from 'uuid';


export const updateUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const {
        name,
        email,
    } = request.body;

    if(!isUUID(id)){
        response.status(400).json({Error: 'Invalid ID format!'});
        return;
    }
    
    try {

        const userExists = await prisma.user.findUnique({
            where: { id }
        })

        if(!userExists){
            response.status(404).json({Error: 'User not found.'});
            return;
        }

        const updatedUser = await prisma.user.update({
           where: {id},
           data: {
                name,
                email
           } 
        });

        response.status(200).json(updatedUser);
        
    }catch(error){
        response.status(500).json({Error: 'Something went wrong!'});
    }

}