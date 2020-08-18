import express, { Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import Post from '../interfaces/post.interface';
import postModel from '../models/post.model';
import postValidator from '../validators/post.validator';

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
			const savedPost = await createdPost.save();
			res.json(savedPost);
		} catch (err) {}
	};

	private deletePost = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const id = req.params.id;
		try {
			await this.post.findByIdAndDelete(id);
			res.json(200);
		} catch (err) {
			res.json(404);
		}
	};

	private getAllPosts = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const posts = await this.post.find();
			res.json(posts);
		} catch (err) {
			console.log(err);
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
			res.json(post);
		} catch (err) {
			console.log(err);
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
			res.json(post);
		} catch (err) {
			console.log(err);
		}
	};
}

export default PostController;
