import express, { Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller.interface';
import Post from '../interfaces/post.interface';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import cartValidator from '../validators/cart.validator';
import cartModel from '../models/cart.model';
import orderItemModel from '../models/orderItem.model';
import CartNotFoundException from '../exceptions/CartNotFoundException';

class CartController implements Controller {
	public path = '/cart';
	public router = express.Router();
	public cart = cartModel;
	public order = orderItemModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router
			.all(`${this.path}*`, authMiddleware)
			.get(`${this.path}`, this.getCart)
			.post(
				`${this.path}/add`,
				validationMiddleware(cartValidator.addToCart),
				this.addToCart
			);
	}

	private getCart = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const cart = await this.cart.findOne({ user: req.user._id });

			const message = 'Cart fetched successfully';
			res.status(200).json({ message, cart });
		} catch (err) {
			next(err);
		}
	};

	private addToCart = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const cart = await this.cart.findOne({ user: req.user._id });
			const orderItemData = req.body;
			const createdOrder = new this.order({
				...orderItemData,
			});
			const order = await createdOrder.populate('product').save();
			const product = order.product as Post;

			if (!cart) {
				throw new CartNotFoundException(req.user.username);
			}

			cart.products.push(order._id);
			cart.totalPrice += product.price;
			await cart.save();

			const message = 'Item added to cart successfully';
			res.status(201).json({ message, order });
		} catch (err) {
			next(err);
		}
	};
}

export default CartController;
