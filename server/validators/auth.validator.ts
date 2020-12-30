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
					throw new EmailAlreadyExistsException(value);
				}
			})
			.normalizeEmail(),
		body('password')
			.trim()
			.isLength({ min: 4, max: 15 })
			.withMessage('Password must be 4-15 characters'),
	],
	login: [
		check('email').isEmail().withMessage('Please enter a valid email'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 15 })
			.withMessage('Password must be 4-15 characters'),
	],
	updateUser: [
		body('name').trim().optional(),
		body('email').trim().optional(),
		body('username').trim().optional(),
	],
};

export default authValidator;
