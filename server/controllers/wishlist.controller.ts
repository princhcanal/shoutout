import express, { Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller.interface';
import wishlistModel from '../models/wishlist.model';
import postModel from '../models/post.model';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import wishlistValidator from '../validators/wishlist.validator';
import WishlistNotFoundException from '../exceptions/WishlistNotFoundException';
import WishlistItemNotFoundException from '../exceptions/WishlistItemNotFoundException';
import User from '../interfaces/user.interface';
import discount from '../utils/discount';

class WishlistController implements Controller {
	public path = '/wishlist';
	public router = express.Router();
	private wishlist = wishlistModel;
	private products = postModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router
			.all(`${this.path}*`, authMiddleware)
			.get(`${this.path}`, this.getWishlist)
			.post(
				`${this.path}`,
				validationMiddleware(wishlistValidator.addToWishlist),
				this.addToWishlist
			)
			.delete(`${this.path}/:id`, this.removeFromWishlist);
	}

	private getWishlist = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const wishlist = await this.wishlist
				.findOne({
					user: req.user._id,
				})
				.populate('products');

			if (!wishlist) {
				throw new WishlistNotFoundException(req.user.username);
			}

			let products = await this.products
				.find({ _id: { $in: wishlist.products } })
				.sort({ createdAt: -1 })
				.populate('author', 'username');

			products = products.map((product) => {
				const author = product.author as User;
				if (req.user.subscription === 'Premium') {
					product.price *= 0.25;
				}
				if (
					req.user.subscriptions.includes(author._id as string & User)
				) {
					product.price *= discount;
				}
				return product;
			});

			wishlist.products = products;

			const message = 'Wishlist fetched successfully';
			res.status(200).json({ message, wishlist });
		} catch (err) {
			next(err);
		}
	};

	private addToWishlist = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const wishlist = await this.wishlist.findOne({
				user: req.user._id,
			});
			const prodId = req.body.product;

			if (!wishlist) {
				throw new WishlistNotFoundException(req.user.username);
			}

			let message = `Product ${prodId} already in wishlist`;
			if (wishlist.products.includes(prodId)) {
				return res.status(200).json({ message, wishlist });
			}

			wishlist.products.push(prodId);
			await wishlist.save();

			message = 'Product added to wishlist successfully';
			res.status(201).json({ message, wishlist });
		} catch (err) {
			next(err);
		}
	};

	private removeFromWishlist = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const wishlist = await this.wishlist.findOne({
				user: req.user._id,
			});

			const prodId = req.params.id;

			if (!wishlist) {
				throw new WishlistNotFoundException(req.user.username);
			}

			const wishlistProducts = wishlist.products as string[];

			if (!wishlistProducts.includes(prodId)) {
				throw new WishlistItemNotFoundException(prodId);
			}

			wishlist.products.splice(wishlistProducts.indexOf(prodId), 1);
			await wishlist.save();

			const message = `Product ${prodId} removed from wishlist successfully`;
			res.status(200).json({ message, wishlist });
		} catch (err) {
			next(err);
		}
	};
}

export default WishlistController;
