import express, { Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller.interface';
import Post from '../interfaces/post.interface';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import cartValidator from '../validators/cart.validator';
import cartModel from '../models/cart.model';
import orderItemModel from '../models/orderItem.model';
import CartNotFoundException from '../exceptions/CartNotFoundException';
import OrderItemNotFoundException from '../exceptions/OrderItemNotFound';

class CartController implements Controller {
	public path = '/cart';
	public router = express.Router();
	public cart = cartModel;
	public orderItem = orderItemModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router
			.all(`${this.path}*`, authMiddleware)
			.get(`${this.path}`, this.getCart)
			.delete(`${this.path}`, this.clearCart)
			.post(
				`${this.path}`,
				validationMiddleware(cartValidator.addToCart),
				this.addToCart
			)
			.delete(`${this.path}/:id`, this.removeOrderItem);
	}

	private getCart = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const cart = await this.cart
				.findOne({ user: req.user._id })
				.populate('products');

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

			if (!cart) {
				throw new CartNotFoundException(req.user.username);
			}

			const orderItemData = req.body;
			const createdOrder = new this.orderItem({
				...orderItemData,
				cart: cart._id,
			});

			let order = await createdOrder.save();
			order = await order.populate('product').execPopulate();
			const product = order.product as Post;

			cart.products.push(order._id);
			cart.totalPrice += product.price * order.quantity;
			await cart.save();

			const message = 'Item added to cart successfully';
			res.status(201).json({ message, order, cart });
		} catch (err) {
			next(err);
		}
	};

	private clearCart = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const cart = await this.cart.findOneAndUpdate(
				{ user: req.user._id },
				{ products: [], totalPrice: 0 }
			);

			if (!cart) {
				throw new CartNotFoundException(req.user.username);
			}

			await this.orderItem.deleteMany({ cart: cart._id });

			const message = 'Cart items deleted successfully';
			res.status(200).json({ message, cart });
		} catch (err) {
			next(err);
		}
	};

	private removeOrderItem = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const orderItemId = req.params.id;
			const cart = await this.cart.findOne({ user: req.user._id });
			const orderItem = await this.orderItem
				.findById(orderItemId)
				.populate('product');

			if (!cart) {
				throw new CartNotFoundException(req.user.username);
			}

			const cartProducts = cart.products as string[];

			if (!orderItem || !cartProducts.includes(orderItemId)) {
				throw new OrderItemNotFoundException(orderItemId);
			}

			const orderItemProduct = orderItem.product as Post;
			cart.products.splice(cartProducts.indexOf(orderItemId), 1);
			cart.totalPrice -= orderItem.quantity * orderItemProduct.price;
			await cart.save();
			await this.orderItem.findByIdAndDelete(orderItemId);

			const message = `Order item ${orderItemId} deleted from cart successfully`;
			res.status(200).json({ message, orderItem });
		} catch (err) {
			next(err);
		}
	};
}

export default CartController;
