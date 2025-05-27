import express from 'express';

//Validations
import { validateBody } from '../middlewares/validateBody';
import { createUserSchema } from '../schemas/userSchema';
import { updateUserSchema } from '../schemas/userSchema';

//Routes
import { listUsers } from '../controller/userController/listUsers';
import { createUser } from '../controller/userController/createUser';
import { listUserById } from '../controller/userController/listUserById';
import { updateUser } from '../controller/userController/updateUser';
import { deleteUser } from '../controller/userController/deleteUser';

const router = express.Router();

router.get('/user', listUsers);
router.get('/user/:id', listUserById);

router.post('/user', validateBody(createUserSchema), createUser);
router.put('/user/:id', validateBody(updateUserSchema), updateUser);
router.delete('/user/:id', deleteUser)

export const userRoutes = router;