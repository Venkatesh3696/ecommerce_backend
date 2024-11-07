import Jwt from 'jsonwebtoken';

export const checkUser = async (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized user!',
		});
	}

	try {
		const decoded = Jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({
			success: false,
			message: 'Unauthorized user!',
		});
	}
};
