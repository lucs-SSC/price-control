import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';
import { validate as isUUID} from 'uuid';


export const deleteUser = async(request: Request, response: Response) => {
    const { id } = request.params

    if(!isUUID(id)){
        response.status(400).json({Error: 'Invalid ID format!'});
        return;
    }

    try{
        const userExists = await prisma.user.findUnique({
            where: { id },
        })

        if(!userExists){
            response.status(404).json({Error: 'User not found!'});
            return;
        }

        if(userExists.id != id){
            response.status(401).json({Error: 'Action not allowed!'});
            return;
        }

        const deleteUser = await prisma.user.delete({where: {id}})

        response.status(204).end();
    }catch(error){
        response.status(500).json({Error: 'Something went wrong!'})
    }
    

    
}