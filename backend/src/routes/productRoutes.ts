import express from 'express';

import { validateBody } from '../middlewares/validateBody';
import { createProductSchema } from '../schemas/productSchema';

import { createProduct } from '../controller/productController/createProduct';
import { listProducts } from '../controller/productController/listProducts';
import { listProductsById } from '../controller/productController/listProductById';
import { deleteProduct } from '../controller/productController/deleteProduct';

const router = express.Router()

router.get('/products', listProducts);
router.get('/products/:id', listProductsById);
router.post('/products', validateBody(createProductSchema), createProduct);
router.delete('/products/:id', deleteProduct);


export const productRoutes = router;