import { body, check } from 'express-validator';
import userModel from '../models/user.model';
import EmailAlreadyExistsException from '../exceptions/EmailAlreadyExistsException';

const authValidator = {
	register: [
		body('name').trim().optional(),
		body('username')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Username cannot be empty'),
		check('email')
			.isEmail()
			.withMessage('Please enter a valid email')
			.custom(async (value, { req }) => {
				const user = await userModel.findOne({ email: value });
				if (user) {
					console.log('validator', user);
					throw new EmailAlreadyExistsException(value);
				}
			})
			.normalizeEmail(),
		body('password', 'Password must be at least 4 characters')
			.trim()
			.isLength({ min: 4 })
			.isAlphanumeric(),
	],
	login: [
		check('email').isEmail().withMessage('Please enter a valid email'),
		body('password', 'Invalid password')
			.trim()
			.isLength({ min: 4 })
			.isAlphanumeric(),
	],
	updateUser: [
		body('name').trim().optional(),
		body('email').trim().optional(),
		body('username').trim().optional(),
	],
};

export default authValidator;
