import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client'

export const listUsers = async (request:Request, response: Response) => {
    try{
        const users = await prisma.user.findMany({
            select:{
                id: true,
                name: true,
                email: true
            }
        });

        response.status(200).json(users);
    }catch(error){
        console.log(error)
        response.status(500).json({ error: 'Erro ao buscar usuários' } );
    }
}