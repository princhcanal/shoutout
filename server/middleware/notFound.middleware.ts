import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

const notFoundMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const message = 'Not found';
	res.status(404).json({ message });
};

export default notFoundMiddleware;
