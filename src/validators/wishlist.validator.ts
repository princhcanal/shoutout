import { body } from 'express-validator';

const wishlistValidator = {
	addToWishlist: [
		body('product')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Product cannot be empty'),
	],
};

export default wishlistValidator;
