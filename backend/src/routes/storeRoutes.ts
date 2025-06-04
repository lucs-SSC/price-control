import express from 'express';

//Validations
import { validateBody } from '../middlewares/validateBody';
import { validateStoreSchema } from '../schemas/storeSchema';

//Routes
import { createStore } from '../controller/storeController/createStore';
import { listStores } from '../controller/storeController/listStores';
import { listStoreById } from '../controller/storeController/listStoreById';
import { updateStore } from '../controller/storeController/updateStore';
import { deleteStore } from '../controller/storeController/deleteStore';

const router = express.Router();

router.get('/store', listStores);
router.get('/store/:id', listStoreById);
router.put('/store/:id', validateBody(validateStoreSchema), updateStore);
router.post('/store', validateBody(validateStoreSchema), createStore);
router.delete('/store/:id', deleteStore);

export const storeRoutes = router;