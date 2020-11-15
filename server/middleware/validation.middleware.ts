import { Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import HttpException from '../exceptions/HttpException';
import { compose } from 'compose-middleware';

const validationResultMiddleware = (req: Request, res: Response, next: any) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const error = new HttpException(422, 'Wrong Credentials', {
				errors: errors.array(),
			});

			throw error;
		}
		next();
	} catch (err) {
		next(err);
	}
};

const validationMiddleware = (validations: ValidationChain[]) => {
	return compose([validations, validationResultMiddleware]);
};

export default validationMiddleware;
