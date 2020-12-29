import express, { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';

import Controller from '../interfaces/controller.interface';
import userModel from '../models/user.model';

class WebhookController implements Controller {
	public path = '/stripe-webhook';
	public router = express.Router();
	public stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
		apiVersion: '2020-03-02',
		typescript: true,
	});
	public user = userModel;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}`, this.listenStripeWebhook);
	}

	private listenStripeWebhook = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		let event;

		try {
			event = JSON.parse(req.body);
		} catch (err) {
			res.status(400).send(`Webhook Error: ${err.message}`);
		}

		// Handle the event
		switch (event.type) {
			case 'checkout.session.completed':
				await this.user.findByIdAndUpdate(req.user._id, {
					subscription: 'Premium',
				});
				break;
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		// Return a res to acknowledge receipt of the event
		res.json({ received: true });
	};
}

export default WebhookController;
