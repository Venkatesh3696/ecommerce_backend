export const corsConfig = {
	origin: [
		'http://localhost:5173',
		'https://e-commerce-frontend-c9fi.onrender.com/',
	],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: [
		'Content-Type',
		'Authorization',
		'Cache-Control',
		'Expires',
		'Pragma',
	],
	credentials: true,
};
