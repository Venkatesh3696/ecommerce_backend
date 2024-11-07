import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import User from '../../models/user.model.js';

export const registerUser = async (req, res) => {
	const { userName, email, password } = req.body;

	try {
		const checkUser = await User.findOne({ email });

		if (checkUser) {
			return res.status(200).json({
				success: false,
				message:
					'User already exists with same email please try Login instead',
				checkUser,
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			userName,
			email,
			password: hashedPassword,
		});

		await newUser.save();
		res.status(200).json({
			success: true,
			message: 'Registeration Successful',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'Error registering user',
		});
	}
};
export const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const checkUser = await User.findOne({ email });

		if (!checkUser) {
			return res.json({
				success: false,
				message: "User doesn't exists please Register first",
			});
		}
		const passwordMatch = await bcrypt.compare(
			password,
			checkUser.password,
		);
		if (!passwordMatch) {
			return res.json({
				success: false,
				message: "passwords doesn't match please Try again",
			});
		}
		checkUser.password = '';
		const token = Jwt.sign(
			{
				id: checkUser._id,
				role: checkUser.role,
				email: checkUser.email,
				userName: checkUser.userName,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '60m' },
		);

		res.cookie('token', token, {
			httpOnly: true,
			secure: true,
			sameSite: true,
		}).json({
			success: true,
			message: 'Logged in successfully',
			user: checkUser,
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: 'Error registering user',
		});
	}
};

export const logoutUser = async (req, res) => {
	res.clearCookie('token').json({
		success: true,
		message: 'Logged Out successfully!',
	});
};
