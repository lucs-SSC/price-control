import express from 'express';

import { validateBody } from '../middlewares/validateBody';
import { validateProductSchema } from '../schemas/productSchema';

import { createProduct } from '../controller/productController/createProduct';
import { listProducts } from '../controller/productController/listProducts';
import { listProductsById } from '../controller/productController/listProductById';
import { deleteProduct } from '../controller/productController/deleteProduct';
import { updateProduct } from '../controller/productController/updateProduct';

const router = express.Router()

router.get('/products', listProducts);
router.get('/products/:id', listProductsById);
router.post('/products', validateBody(validateProductSchema), createProduct);
router.put('/products/:id', validateBody(validateProductSchema), updateProduct);
router.delete('/products/:id', deleteProduct);


export const productRoutes = router;