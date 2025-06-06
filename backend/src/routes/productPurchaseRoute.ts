import express from 'express';
import { createProductPurchase } from '../controller/productPurchaseController/createProductPurchase';
import { listProductsPurchase } from '../controller/productPurchaseController/listProductPurchase';

const router = express.Router();

router.get('/product-purchase', listProductsPurchase);
router.post('/product-purchase', createProductPurchase);

export const productPurchaseRoute = router;