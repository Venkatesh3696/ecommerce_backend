import { Router } from 'express';
import {
	getFilteredProducts,
	getProductDetails,
} from '../../controllers/shop/products.controller.js';

const router = Router();

router.get('/', getFilteredProducts);

router.get('/:id', getProductDetails);

export default router;
