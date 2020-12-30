import express, { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';

import Controller from '../interfaces/controller.interface';
import Post from '../interfaces/post.interface';
import postModel from '../models/post.model';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import FileNotFoundException from '../exceptions/FileNotFoundException';
import postValidator from '../validators/post.validator';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';
import deleteFile from '../utils/deleteFile';

class PostController implements Controller {
	public path = '/posts';
	public router = express.Router();
	private post = postModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/:id`, this.getPostById);

		this.router
			.all(`${this.path}*`, authMiddleware)
			.post(
				this.path,
				validationMiddleware(postValidator.createPost),
				this.createPost
			)
			.delete(`${this.path}/:id`, this.deletePost)
			.patch(
				`${this.path}/:id`,
				validationMiddleware(postValidator.updatePost),
				this.updatePost
			);
	}

	private createPost = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const postData: Post = req.body;

			if (!req.file) {
				throw new FileNotFoundException();
			}

			const image = `${process.env.BASE_URL}/${req.file.path.replace(
				'\\',
				'/'
			)}`;

			const imagePath = req.file.path;

			let createdPost = new this.post({
				...postData,
				price: parseFloat(postData.price.toFixed(2)),
				image,
				imagePath,
				author: req.user._id,
				cloudinaryPublicId: 'hello',
				url: `${process.env.BASE_URL}${this.path}`,
			});
			createdPost = await createdPost.save();

			const { secure_url, public_id } = await cloudinary.uploader.upload(
				createdPost.imagePath
			);
			deleteFile(imagePath);

			const post = await this.post.findByIdAndUpdate(
				createdPost._id,
				{
					url: `${process.env.BASE_URL}${this.path}/${createdPost._id}`,
					image: secure_url,
					cloudinaryPublicId: public_id,
				},
				{ new: true }
			);
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
		try {
			const id = req.params.id;

			const post = await this.post.findById(id);

			if (!post) {
				throw new PostNotFoundException(id);
			}

			cloudinary.uploader.destroy(post.cloudinaryPublicId);

			if (post.author.toString() !== req.user._id.toString()) {
				throw new NotAuthorizedException();
			}

			await this.post.findByIdAndDelete(id);

			const message = 'Post deleted successfully';
			res.status(200).json({ message });
		} catch (err) {
			next(err);
		}
	};

	private getPostById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const id = req.params.id;

			const post = await this.post.findById(id).populate('author');

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
		try {
			const id = req.params.id;
			const postData: Post = req.body;

			const post = await this.post.findByIdAndUpdate(id, postData, {
				new: true,
			});

			if (!post) {
				throw new PostNotFoundException(id);
			}

			if (post.author.toString() !== req.user._id.toString()) {
				throw new NotAuthorizedException();
			}

			const message = 'Post updated successfully';
			res.status(200).json({ message, post });
		} catch (err) {
			next(err);
		}
	};
}

export default PostController;
