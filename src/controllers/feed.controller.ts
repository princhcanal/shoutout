import express, { Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller.interface';
import postModel from '../models/post.model';
import authMiddleware from '../middleware/auth.middleware';

class FeedController implements Controller {
	public path = '/feed';
	public router = express.Router();
	private post = postModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router
			.all(`${this.path}*`, authMiddleware)
			.get(`${this.path}`, this.getFeed);
	}

	private getFeed = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			let count = 1;
			if (req.query.count) {
				count = parseInt(req.query.count.toString());
			}
			const posts = await this.post
				.find({
					author: { $in: req.user.following },
				})
				.sort({ createdAt: -1 })
				.skip(10 * (count - 1))
				.limit(10);

			const message = 'Feed fetched successfully';
			res.status(200).json({ message, posts });
		} catch (err) {
			next(err);
		}
	};
}

export default FeedController;
