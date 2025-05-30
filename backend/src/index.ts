import express from 'express';
import { prisma } from '../prisma/client';

const app = express();
const PORT = process.env.PORT || 3000;

import { userRoutes } from './routes/userRoutes';
import { productRoutes } from './routes/productRoutes';

async function startServer(){
    try {
        await prisma.$connect();

        console.log('✅ Sucessfully sincronized!');
        console.log('✅ Connected with database!');
        
        app.use(express.json());

        app.use(userRoutes);
        app.use(productRoutes);

        app.listen(PORT, () => {
        console.log(`✅ Server is runnin on:  http://localhost:${PORT}`);
        });

    }catch(error){
        console.error('❌ Failled to connect, check if the database is running!');
        process.exit(1);
    }
}

startServer();




