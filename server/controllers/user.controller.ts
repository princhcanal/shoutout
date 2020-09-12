import express, { Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from '../models/user.model';
import postModel from '../models/post.model';
import authMiddleware from '../middleware/auth.middleware';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import User from '../interfaces/user.interface';
import { Next } from 'compose-middleware';

// TODO: implement subscription service for each user for discounts on products
// TODO: implement unfollow and unsubscribe
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
		this.router.get(`${this.path}/:username/posts`, this.getUserPosts);
		this.router.get(`${this.path}/:username/following`, this.getFollowing);
		this.router.get(`${this.path}/:username/followers`, this.getFollowers);
		this.router.get(
			`${this.path}/:username/subscribing`,
			this.getSubscribing
		);
		this.router.get(
			`${this.path}/:username/subscribers`,
			this.getSubscribers
		);

		this.router
			.all(`${this.path}*`, authMiddleware)
			.patch(`${this.path}`, this.updateUser)
			.post(`${this.path}/:username/follow`, this.followUser)
			.post(`${this.path}/:username/unfollow`, this.unfollowUser)
			.post(`${this.path}/:username/subscribe`, this.subscribeUser)
			.post(`${this.path}/:username/unsubscribe`, this.unsubscribeUser);
	}

	private getUserProfile = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			const user = await this.user
				.findOne({ username })
				.select('-password');

			if (!user) {
				throw new UserNotFoundException(username);
			}

			const posts = await this.post
				.find({ author: user._id })
				.sort({ createdAt: -1 })
				.populate('author');
			const message = `User ${username} fetched successfully`;
			res.status(200).json({ message, user, posts });
		} catch (err) {
			next(err);
		}
	};

	private followUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			let followingUser = await this.user.findOne({ username });
			let user = await this.user.findById(req.user._id);
			let message = `User ${username} followed successfully`;

			if (!followingUser || !user) {
				throw new UserNotFoundException(username);
			}

			if (!followingUser.followers.includes(user._id)) {
				followingUser.followers.push(user._id);
			} else {
				message = `User ${username} already followed`;
				return res.status(200).json({ message });
			}

			if (!user.following.includes(followingUser._id)) {
				user.following.push(followingUser._id);
				await user.save();
			}

			followingUser = await followingUser.save();
			await followingUser
				.populate('followers', 'username')
				.execPopulate();
			const numFollowers = followingUser.followers.length;

			res.status(200).json({ message, numFollowers });
		} catch (err) {
			next(err);
		}
	};

	private unfollowUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			let followingUser = await this.user.findOne({ username });
			let user = await this.user.findById(req.user._id);

			if (!followingUser || !user) {
				throw new UserNotFoundException(username);
			}

			if (followingUser.followers.includes(user._id)) {
				const index = followingUser.followers.indexOf(user._id);
				followingUser.followers.splice(index, 1);
				await followingUser.save();
			}

			if (user.following.includes(followingUser._id)) {
				const index = user.following.indexOf(followingUser._id);
				user.following.splice(index, 1);
				await user.save();
			}

			const message = `User ${username} unfollowed successfully`;
			const numFollowers = followingUser.followers.length;
			res.status(200).json({ message, numFollowers });
		} catch (err) {
			console.log(err);
		}
	};

	private subscribeUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			let subscribingUser = await this.user.findOne({ username });
			let user = await this.user.findById(req.user._id);
			let message = `User ${username} subscribed successfully`;

			if (!subscribingUser || !user) {
				throw new UserNotFoundException(username);
			}

			if (!subscribingUser.subscribers.includes(user._id)) {
				subscribingUser.subscribers.push(user._id);
			} else {
				message = `User ${username} already subscribed`;
				return res.status(200).json({ message });
			}

			if (!user.subscriptions.includes(subscribingUser._id)) {
				user.subscriptions.push(subscribingUser._id);
				await user.save();
			}

			subscribingUser = await subscribingUser.save();
			await subscribingUser
				.populate('subscribers', 'username')
				.execPopulate();

			res.status(200).json({ message });
		} catch (err) {
			next(err);
		}
	};

	private unsubscribeUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			let subscribingUser = await this.user.findOne({ username });
			let user = await this.user.findById(req.user._id);

			if (!subscribingUser || !user) {
				throw new UserNotFoundException(username);
			}

			if (subscribingUser.subscribers.includes(user._id)) {
				const index = subscribingUser.subscribers.indexOf(user._id);
				subscribingUser.subscribers.splice(index, 1);
				await subscribingUser.save();
			}

			if (user.subscriptions.includes(subscribingUser._id)) {
				const index = user.subscriptions.indexOf(subscribingUser._id);
				user.subscriptions.splice(index, 1);
				await user.save();
			}

			const message = `User ${username} unsubscribed successfully`;
			const numSubscribers = subscribingUser.subscribers.length;
			res.status(200).json({ message, numSubscribers });
		} catch (err) {
			console.log(err);
		}
	};

	private getUserPosts = async (
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
			const message = 'Posts fetched successfully';
			res.status(200).json({ message, posts });
		} catch (err) {
			next(err);
		}
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

	private getFollowing = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			const user = await this.user
				.findOne({ username })
				.populate('following');

			if (!user) {
				throw new UserNotFoundException(username);
			}

			const following = user.following as User[];

			const message = 'Following fetched successfully';
			res.status(200).json({
				message,
				following,
			});
		} catch (err) {
			next(err);
		}
	};

	private getFollowers = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			const user = await this.user
				.findOne({ username })
				.populate('followers');

			if (!user) {
				throw new UserNotFoundException(username);
			}

			const followers = user.followers as User[];

			const message = 'Followers fetched successfully';
			res.status(200).json({
				message,
				followers,
			});
		} catch (err) {
			next(err);
		}
	};

	private getSubscribing = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			const user = await this.user
				.findOne({ username })
				.populate('subscriptions');

			if (!user) {
				throw new UserNotFoundException(username);
			}

			const subscribing = user.subscriptions as User[];

			const message = 'Subscriptions fetched successfully';
			res.status(200).json({
				message,
				subscribing,
			});
		} catch (err) {
			next(err);
		}
	};

	private getSubscribers = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const username = req.params.username;
			const user = await this.user
				.findOne({ username })
				.populate('subscribers');

			if (!user) {
				throw new UserNotFoundException(username);
			}

			const subscribers = user.subscribers as User[];

			const message = 'Subscribers fetched successfully';
			res.status(200).json({
				message,
				subscribers,
			});
		} catch (err) {
			next(err);
		}
	};
}

export default UserController;
