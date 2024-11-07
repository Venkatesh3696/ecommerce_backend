import { imageUploadUtil } from '../../helpers/cloudinary.js';
import Product from '../../models/product.model.js';

export const handleImageUpload = async (req, res) => {
	try {
		const b64 = Buffer.from(req.file.buffer).toString('base64');
		const url = 'data:' + req.file.mimetype + ';base64,' + b64;
		const result = await imageUploadUtil(url);
		console.log({ result });

		res.json({
			success: true,
			result,
			message: 'image uploaded to cloudinary',
		});
	} catch (error) {
		// console.log(error);
		res.status(300).json({
			success: false,
			message: 'Error Occured while uploading image',
		});
	}
};

// add a new products

export const addProduct = async (req, res) => {
	try {
		const {
			image,
			title,
			description,
			brand,
			category,
			price,
			salePrice,
			totalStock,
		} = req.body;
		const newProduct = new Product({
			image,
			title,
			description,
			brand,
			category,
			price,
			salePrice,
			totalStock,
		});
		const product = await newProduct.save();
		res.status(201).json({
			success: true,
			message: 'Product Added Successfully',
			data: product,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			massage: ' error occured while creating product',
		});
	}
};

// fetch all prods
export const fetchAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});

		res.status(200).json({
			success: true,
			message: 'Products Fetched Successfully',
			data: products,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			massage: ' error occured while creating product',
		});
	}
};

export const EditProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			image,
			title,
			description,
			brand,
			category,
			price,
			salePrice,
			totalStock,
		} = req.body;

		const findProduct = await Product.findById(id);
		if (!findProduct) {
			res.json({
				success: false,
				message: 'Product not found',
			});
		}

		findProduct.title = title || findProduct.title;
		findProduct.description = description || findProduct.description;
		findProduct.category = category || findProduct.category;
		findProduct.brand = brand || findProduct.brand;
		findProduct.price = price || findProduct.price;
		findProduct.salePrice = salePrice || findProduct.salePrice;
		findProduct.totalStock = totalStock || findProduct.totalStock;
		findProduct.image = image || findProduct.image;

		await findProduct.save();

		res.status(200).json({
			success: true,
			message: 'Product updated successfully',
			updatedProduct: findProduct,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			massage: ' error occured while creating product',
		});
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			res.json({
				success: false,
				message: 'Product not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'product deleted successfully',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			massage: 'error occured while creating product',
		});
	}
};
