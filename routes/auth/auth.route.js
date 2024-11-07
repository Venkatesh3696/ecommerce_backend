import { Router } from 'express';
import {
	loginUser,
	registerUser,
	logoutUser,
} from '../../controllers/auth/auth-controllers.js';
import { checkUser } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/check-auth', checkUser, (req, res) => {
	const user = req.user;
	res.json({
		success: true,
		message: 'authenticated user!',
		user,
	});
});

export default router;
