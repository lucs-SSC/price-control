import express from 'express';

import { validateBody } from '../middlewares/validateBody';
import { createProductSchema } from '../schemas/productSchema';

import { createProduct } from '../controller/productController/createProduct';
import { listProducts } from '../controller/productController/listProducts';

const router = express.Router()

router.get('/products', listProducts);
router.post('/products', validateBody(createProductSchema), createProduct);


export const productRoutes = router;