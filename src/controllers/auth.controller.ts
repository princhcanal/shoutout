import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import userModel from '../models/user.model';
import User from '../interfaces/user.interface';
import Login from '../interfaces/login.interface';
import userValidator from '../validators/user.validator';
import EmailAlreadyExistsException from '../exceptions/EmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';

class AuthController implements Controller {
	public path = '/auth';
	public router = express.Router();
	private user = userModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`${this.path}/register`,
			validationMiddleware(userValidator.register),
			this.register
		);
		this.router.post(
			`${this.path}/login`,
			validationMiddleware(userValidator.login),
			this.login
		);
	}

	private register = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userData: User = req.body;
			const user = await this.user.findOne({ email: userData.email });

			if (user) {
				throw new EmailAlreadyExistsException(userData.email);
			} else {
				const hashedPassword = await bcrypt.hash(userData.password, 10);
				const user = await this.user.create({
					...userData,
					password: hashedPassword,
				});
				res.status(201).json({ user });
			}
		} catch (err) {
			next(err);
		}
	};

	private login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const loginData: Login = req.body;
			const user = await this.user.findOne({ email: loginData.email });

			if (!user) {
				throw new WrongCredentialsException();
			}

			const isPasswordMatch = await bcrypt.compare(
				loginData.password,
				user.password
			);

			if (!isPasswordMatch) {
				throw new WrongCredentialsException();
			}

			res.status(200).json({ user });
		} catch (err) {
			next(err);
		}
	};
}

export default AuthController;
