import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../interfaces/user.interface';
import Login from '../interfaces/login.interface';
import Controller from '../interfaces/controller.interface';
import Token from '../interfaces/token.interface';
import TokenData from '../interfaces/tokenData.interface';
import validationMiddleware from '../middleware/validation.middleware';
import userModel from '../models/user.model';
import authValidator from '../validators/auth.validator';
import EmailAlreadyExistsException from '../exceptions/EmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import jwt from 'jsonwebtoken';

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
			validationMiddleware(authValidator.register),
			this.register
		);
		this.router.post(
			`${this.path}/login`,
			validationMiddleware(authValidator.login),
			this.login
		);
		this.router.post(`${this.path}/logout`, this.logout);
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
				const tokenData = this.createToken(user);
				const message = 'User registered successfully';
				res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
				res.status(201).json({ message, user });
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

			const tokenData = this.createToken(user);
			const message = 'User logged in successfully';
			res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
			res.status(200).json({ message, user });
		} catch (err) {
			next(err);
		}
	};

	private logout = (req: Request, res: Response, next: NextFunction) => {
		const message = 'User logged out successfully';
		res.setHeader('Set-Cookie', ['Authorization=; HttpOnly; Max-Age=0']);
		res.status(200).json({ message });
	};

	private createToken(user: User): Token {
		const expiresIn = 60 * 60; // an hour
		const secret = process.env.JWT_SECRET as string;
		const tokenData: TokenData = { _id: user._id };

		return {
			expiresIn,
			token: jwt.sign(tokenData, secret, { expiresIn }),
		};
	}

	private createCookie(token: Token) {
		return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`;
	}
}

export default AuthController;
