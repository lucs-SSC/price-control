import { Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

import bcrypt from 'bcrypt';

export const createUser = async(request: Request, response: Response) => {
    const { 
        name, 
        email, 
        password 
    } = request.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name, 
                email,
                password: encryptedPassword,
            }
        })

        response.status(200).json(user);
    }catch(error){
        response.status(500).json({ error : "Can't create user."})
    }
}