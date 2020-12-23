import express, { Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller.interface';
import Post from '../interfaces/post.interface';
import authMiddleware from '../middleware/auth.middleware';
import validationMiddleware from '../middleware/validation.middleware';
import cartValidator from '../validators/cart.validator';
import cartModel from '../models/cart.model';
import orderItemModel from '../models/orderItem.model';
import postModel from '../models/post.model';
import CartNotFoundException from '../exceptions/CartNotFoundException';
import OrderItemNotFoundException from '../exceptions/OrderItemNotFound';
import OrderItem from '../interfaces/orderItem.interface';
import User from '../interfaces/user.interface';
import discount from '../utils/discount';

class CartController implements Controller {
	public path = '/cart';
	public router = express.Router();
	public cart = cartModel;
	public orderItem = orderItemModel;
	public product = postModel;

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

			if (!cart) {
				throw new CartNotFoundException(req.user.username);
			}

			const cartProducts = cart.products as OrderItem[];
			const productIds = cartProducts.map((product) => product.product);
			let products = await this.product
				.find({
					_id: { $in: productIds },
				})
				.sort({ createdAt: -1 })
				.populate('author');

			products = products.map((product) => {
				const author = product.author as User;
				if (
					req.user.subscriptions.includes(author._id as string & User)
				) {
					product.price *= discount;
				}
				return product;
			});

			const message = 'Cart fetched successfully';
			res.status(200).json({ message, cart, products });
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
			const prodId = req.params.id;
			const cart = await this.cart.findOne({ user: req.user._id });
			const orderItem = await this.orderItem
				.findOne({ product: prodId })
				.populate('product');

			if (!cart) {
				throw new CartNotFoundException(req.user.username);
			}

			const cartProducts = cart.products as string[];

			if (!orderItem || !cartProducts.includes(orderItem._id)) {
				throw new OrderItemNotFoundException(orderItem?._id as string);
			}

			const orderItemProduct = orderItem.product as Post;
			cart.products.splice(cartProducts.indexOf(orderItem._id), 1);
			cart.totalPrice -= orderItem.quantity * orderItemProduct.price;
			await cart.save();
			await this.orderItem.findByIdAndDelete(orderItem._id);

			const message = `Order item ${orderItem._id} deleted from cart successfully`;
			res.status(200).json({ message, orderItem });
		} catch (err) {
			next(err);
		}
	};
}

export default CartController;
