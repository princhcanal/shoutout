import express, { Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import Stripe from 'stripe';
import cartModel from '../models/cart.model';
import orderItemModel from '../models/orderItem.model';
import postModel from '../models/post.model';
import userModel from '../models/user.model';
import CartNotFoundException from '../exceptions/CartNotFoundException';
import OrderItem from '../interfaces/orderItem.interface';
import User from '../interfaces/user.interface';
import discount from '../utils/discount';
import AlreadySubscribedException from '../exceptions/AlreadySubscribedException';

class PayController implements Controller {
	public path = '/pay';
	public router = express.Router();
	public cart = cartModel;
	public orderItem = orderItemModel;
	public product = postModel;
	public user = userModel;
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
			)
			.post(
				`${this.path}/create-subscription-session`,
				this.createSubscriptionSession
			)
			.get(`${this.path}/checkout-session`, this.getCheckoutSession)
			.post(`${this.path}/customer-portal`, this.createPortalSession);
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
				if (req.user.subscription === 'Premium') {
					product.price *= 0.25;
				}
				if (
					req.user.subscriptions.includes(author._id as string & User)
				) {
					product.price *= discount;
				}
				product.price = parseFloat(product.price.toFixed(2));
				return product;
			});

			const lineItems:
				| Stripe.Checkout.SessionCreateParams.LineItem[]
				| undefined = products.map((product) => {
				return {
					price_data: {
						currency: 'usd',
						product_data: {
							name: product.title,
							images: [product.image],
						},
						unit_amount: Math.ceil(product.price * 100),
					},
					quantity: 1,
				};
			});

			const session = await this.stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: lineItems,
				mode: 'payment',
				success_url: `${process.env.BASE_URL_CLIENT}/pay-status?success=true`,
				cancel_url: `${process.env.BASE_URL_CLIENT}/pay-status?canceled=true`,
			});

			const message = 'Stripe session created successfully';
			res.status(201).json({ message, session });
		} catch (err) {
			next(err);
		}
	};

	private createSubscriptionSession = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { priceId } = req.body;

		try {
			if (req.user.subscription !== 'None') {
				throw new AlreadySubscribedException(
					req.user.username,
					'Shoutout Premium'
				);
			}
			const session = await this.stripe.checkout.sessions.create({
				mode: 'subscription',
				payment_method_types: ['card'],
				line_items: [
					{
						price: priceId,
						// For metered billing, do not pass quantity
						quantity: 1,
					},
				],
				// {CHECKOUT_SESSION_ID} is a string literal; do not change it!
				// the actual Session ID is returned in the query parameter when your customer
				// is redirected to the success page.
				success_url: `${process.env.BASE_URL_CLIENT}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${process.env.BASE_URL_CLIENT}/`,
			});

			res.status(201).json({ sessionId: session.id });
		} catch (err) {
			next(err);
		}
	};

	private getCheckoutSession = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { sessionId } = req.query;
		const session = await this.stripe.checkout.sessions.retrieve(
			sessionId as string
		);
		// const user = this.user.findByIdAndUpdate(req.user, {
		// 	subscription: 'Shoutout Premium',
		// });
		res.status(200).json({ session });
	};

	private createPortalSession = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { sessionId } = req.body;
			const checkoutSession = await this.stripe.checkout.sessions.retrieve(
				sessionId
			);
			const returnUrl = process.env.BASE_URL_CLIENT;
			let { customer } = checkoutSession;
			customer = customer as string;
			const portalSession = await this.stripe.billingPortal.sessions.create(
				{
					customer,
					return_url: returnUrl,
				}
			);
			const { url } = portalSession;

			res.status(201).json({ url });
		} catch (err) {
			next(err);
		}
	};
}

export default PayController;
