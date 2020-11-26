import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import TokenData from '../interfaces/tokenData.interface';
import userModel from '../models/user.model';
import AuthTokenMissingException from '../exceptions/AuthTokenMissingException';
import WrongAuthTokenException from '../exceptions/WrongAuthTokenException';

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const cookies = req.cookies;

	console.log('COOKIES:', JSON.stringify(cookies));

	if (cookies && cookies.Authorization) {
		const secret = process.env.JWT_SECRET as string;

		try {
			const verificationResponse = jwt.verify(
				cookies.Authorization,
				secret
			) as TokenData;
			const id = verificationResponse._id;
			const user = await userModel.findById(id);

			if (!user) {
				throw new WrongAuthTokenException();
			}

			req.user = user;
			next();
		} catch (err) {
			next(err);
		}
	} else {
		next(new AuthTokenMissingException());
	}
};

export default authMiddleware;
