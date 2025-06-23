import express from 'express';
import { createProductPurchase } from '../controller/productPurchaseController/createProductPurchase';
import { listProductsPurchase } from '../controller/productPurchaseController/listProductPurchase';
import { listProductPurchaseById } from '../controller/productPurchaseController/listProductPurchaseById';
import { deleteProductPurchase } from '../controller/productPurchaseController/deleteProductPurchase';
import { updateProductPurchase } from '../controller/productPurchaseController/updateProductPurchase';

const router = express.Router();

router.get('/product-purchase', listProductsPurchase);
router.get('/product-purchase/:id', listProductPurchaseById);
router.post('/product-purchase', createProductPurchase);
router.put('/product-purchase/:id', updateProductPurchase);
router.delete('/product-purchase/:id', deleteProductPurchase);

export const productPurchaseRoute = router;