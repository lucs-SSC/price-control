import express from 'express';

//Validations
import { validateBody } from '../middlewares/validateBody';
import { createUserSchema } from '../schemas/userSchema';

//Routes
import { listUsers } from '../controller/userController/listUsers';
import { createUser } from '../controller/userController/createUser';
import { listUserById } from '../controller/userController/listUserById';

const router = express.Router();

router.get('/user', listUsers);
router.get('/user/:id', listUserById);

router.post('/user', validateBody(createUserSchema), createUser);

export const userRoutes = router;