import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

import { userRoutes } from './routes/userRoutes';

app.use(express.json());

app.get('/', (request, response) => {
    response.send('API rodando com TypeScript + ESModules!');
});

app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

