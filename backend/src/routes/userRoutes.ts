import express from 'express';

const router = express.Router();

router.get('/user', (_, res) => {
    res.send('Lista de Usuários');
});

router.get('/user/:id', (req, res) => {
    res.send(`Lista Usuário por Id. Id: ${req.params.id}`);
});
router.post('/user', (req, res) => {
    res.send('Criação de Usuários');
});

export const userRoutes = router;