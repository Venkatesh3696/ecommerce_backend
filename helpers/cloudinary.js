import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({
	cloud_name: 'dgcysjarm',
	api_key: '578167534688128',
	api_secret: 'PuwsDKiE7SEdmh-HO4sbAll49xw',
});

const storage = new multer.memoryStorage();

export const imageUploadUtil = async (file) => {
	try {
		const result = await cloudinary.uploader.upload(file, {
			resource_type: 'auto',
		});
		return result;
	} catch (err) {
		console.log(err);
	}
};

export const upload = multer({ storage });
