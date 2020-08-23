import express, { Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller.interface';
import wishlistModel from '../models/wishlist.model';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import wishlistValidator from '../validators/wishlist.validator';
import WishlistNotFoundException from '../exceptions/WishlistNotFoundException';

class WishlistController implements Controller {
	public path = '/wishlist';
	public router = express.Router();
	private wishlist = wishlistModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router
			.all(`${this.path}*`, authMiddleware)
			.get(`${this.path}`, this.getWishlist)
			.post(
				`${this.path}/add`,
				validationMiddleware(wishlistValidator.addToWishlist),
				this.addToWishlist
			);
	}

	private getWishlist = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const wishlist = await this.wishlist.findOne({
				user: req.user._id,
			});

			if (!wishlist) {
				throw new WishlistNotFoundException(req.user.username);
			}

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

			if (!wishlist) {
				throw new WishlistNotFoundException(req.user.username);
			}

			wishlist.products.push(req.body.product);
			await wishlist.save();

			const message = 'Product added to wishlist successfully';
			res.status(201).json({ message, wishlist });
		} catch (err) {
			next(err);
		}
	};
}

export default WishlistController;
