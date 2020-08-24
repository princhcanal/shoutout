import { body } from 'express-validator';

const wishlistValidator = {
	addToWishlist: [
		body('product')
			.trim()
			.not()
			.isEmpty()
			.withMessage('ProductId cannot be empty'),
	],
};

export default wishlistValidator;
