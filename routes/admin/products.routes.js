import { Router } from 'express';
import {
	addProduct,
	deleteProduct,
	EditProduct,
	fetchAllProducts,
	handleImageUpload,
} from '../../controllers/admin/products.controller.js';
import { upload } from '../../helpers/cloudinary.js';

const router = Router();

// image upload
router.post('/upload-image', upload.single('my_file'), handleImageUpload);

// products
router.post('/', addProduct);
router.get('/', fetchAllProducts);
router.put('/:id', EditProduct);
router.delete('/:id', deleteProduct);

export default router;
