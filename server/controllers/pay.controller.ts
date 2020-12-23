import express, { Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import Stripe from 'stripe';
import cartModel from '../models/cart.model';
import orderItemModel from '../models/orderItem.model';
import postModel from '../models/post.model';
import CartNotFoundException from '../exceptions/CartNotFoundException';
import OrderItem from '../interfaces/orderItem.interface';
import User from '../interfaces/user.interface';
import discount from '../utils/discount';

class PayController implements Controller {
	public path = '/pay';
	public router = express.Router();
	public cart = cartModel;
	public orderItem = orderItemModel;
	public product = postModel;
	public stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
		apiVersion: '2020-03-02',
		typescript: true,
	});

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router
			.all(`${this.path}*`, authMiddleware)
			.post(
				`${this.path}/create-checkout-session`,
				this.createCheckoutSession
			);
	}

	private createCheckoutSession = async (
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
				.sort({ createdAt: -1 });

			products = products.map((product) => {
				const author = product.author as User;
				if (
					req.user.subscriptions.includes(author._id as string & User)
				) {
					product.price *= discount;
				}
				return product;
			});

			const lineItems:
				| Stripe.Checkout.SessionCreateParams.LineItem[]
				| undefined = products.map((product) => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: product.title,
						images: [product.image],
					},
					unit_amount: product.price * 100,
				},
				quantity: 1,
			}));

			const session = await this.stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: lineItems,
				mode: 'payment',
				success_url: `${process.env.BASE_URL_CLIENT}/pay/success`,
				cancel_url: `${process.env.BASE_URL_CLIENT}/pay/cancel`,
			});

			const message = 'Stripe session created successfully';
			res.status(201).json({ message, session });
		} catch (err) {
			next(err);
		}
	};
}

export default PayController;
