import express, { Request, Response, NextFunction } from 'express';

import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import Stripe from 'stripe';

class PayController implements Controller {
	public path = '/pay';
	public router = express.Router();
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
			const baseUrl =
				process.env.NODE_ENV === 'production'
					? process.env.BASE_URL_PROD
					: process.env.BASE_URL_DEV;
			const session = await this.stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: [
					{
						price_data: {
							currency: 'usd',
							product_data: {
								name: 'T-shirt',
							},
							unit_amount: 2000,
						},
						quantity: 1,
					},
				],
				mode: 'payment',
				success_url: `${baseUrl}${this.path}/success`,
				cancel_url: `${baseUrl}${this.path}/cancel`,
			});

			const message = 'Stripe session created successfully';
			res.status(201).json({ message, session });
		} catch (err) {
			next(err);
		}
	};
}

export default PayController;
