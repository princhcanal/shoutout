import express, { Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from '../models/user.model';
import postModel from '../models/post.model';
import authMiddleware from '../middleware/auth.middleware';
import UserNotFoundException from '../exceptions/UserNotFoundException';

// TODO: implement subscription service for each user for discounts on products
// TODO: implement follow feature
class UserController implements Controller {
	public path = '/user';
	public router = express.Router();
	private user = userModel;
	private post = postModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/:username`, this.getUserProfile);
		this.router
			.all(`${this.path}/*`, authMiddleware)
			.get(`${this.path}/posts`, this.getAllPosts)
			.get(`${this.path}/posts/:id`, this.getPost)
			.patch(`${this.path}`, this.updateUser);
	}

	private getUserProfile = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			const user = await this.user.findOne({ username });

			if (!user) {
				throw new UserNotFoundException(username);
			}

			const posts = await this.post.find({ author: user._id });

			const message = `User ${username} fetched successfully`;
			user.password = '';
			res.status(200).json({ message, user, posts });
		} catch (err) {
			next(err);
		}
	};

	private getAllPosts = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const posts = await this.post.find({ author: req.user._id });
			const message = 'Posts fetched successfully';
			res.json({ message, posts });
		} catch (err) {
			next(err);
		}
	};

	private getPost = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const postId = req.params.id;
			const post = await this.post.findById(postId);
			const message = 'Post fetched successfully';
			res.json({ message, post });
		} catch (err) {}
	};

	private updateUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userData = req.body;
			const user = await this.user.findByIdAndUpdate(
				req.user._id,
				userData,
				{ new: true }
			);
			const message = 'User updated successfully';

			res.status(200).json({ message, user });
		} catch (err) {
			next(err);
		}
	};
}

export default UserController;
