import express, { Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import Post from '../interfaces/post.interface';
import postModel from '../models/post.model';
import postValidator from '../validators/post.validator';
import PostNotFoundException from '../exceptions/PostNotFoundException';

class PostController implements Controller {
	public path = '/posts';
	public router = express.Router();
	private post = postModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(this.path, this.createPost);
		this.router.delete(`${this.path}/:id`, this.deletePost);
		this.router.get(this.path, this.getAllPosts);
		this.router.get(`${this.path}/:id`, this.getPostById);
		this.router.patch(`${this.path}/:id`, this.updatePost);
	}

	private createPost = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const postData: Post = req.body;
		const createdPost = new this.post(postData);

		try {
			const post = await createdPost.save();
			const message = 'Post created successfully';
			res.status(201).json({ message, post });
		} catch (err) {
			next(err);
		}
	};

	private deletePost = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const id = req.params.id;

		try {
			const post = await this.post.findByIdAndDelete(id);

			if (!post) {
				throw new PostNotFoundException(id);
			}

			const message = 'Post deleted successfully';
			res.status(200).json({ message });
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
			const posts = await this.post.find();
			const message = 'Posts fetched successfully';
			res.status(200).json({ message, posts });
		} catch (err) {
			next(err);
		}
	};

	private getPostById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const id = req.params.id;

		try {
			const post = await this.post.findById(id);

			if (!post) {
				throw new PostNotFoundException(id);
			}

			const message = 'Post fetched successfully';
			res.status(200).json({ message, post });
		} catch (err) {
			next(err);
		}
	};

	private updatePost = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const id = req.params.id;
		const postData: Post = req.body;

		try {
			const post = await this.post.findByIdAndUpdate(id, postData, {
				new: true,
			});

			if (!post) {
				throw new PostNotFoundException(id);
			}

			const message = 'Post updated successfully';
			res.status(200).json({ message, post });
		} catch (err) {
			next(err);
		}
	};
}

export default PostController;
