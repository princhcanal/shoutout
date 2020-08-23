import { body } from 'express-validator';

const cartValidator = {
	addToCart: [
		body('product')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Product cannot be empty'),
		body('quantity')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Quantity cannot be empty')
			.isNumeric()
			.withMessage('Quantity must be a number'),
	],
};

export default cartValidator;
