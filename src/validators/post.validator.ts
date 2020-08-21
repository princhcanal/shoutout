import { body } from 'express-validator';

const postValidator = {
	createPost: [
		body('content')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Content cannot be empty'),
		body('title')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Title cannot be empty'),
		body('price')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Price cannot be empty')
			.isNumeric()
			.withMessage('Price must be numeric'),
	],
	updatePost: [
		body('author').trim().optional(),
		body('content').trim().optional(),
		body('title').trim().optional(),
		body('price')
			.trim()
			.optional()
			.isNumeric()
			.withMessage('Price must be numeric'),
	],
};

export default postValidator;
