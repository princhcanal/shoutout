// FIXME: change password error on chrome
import App from './app';
import 'dotenv/config';
import { validateEnv } from './utils/validateEnv';
import PostController from './controllers/post.controller';
import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';
import FeedController from './controllers/feed.controller';
import PayController from './controllers/pay.controller';
import CartController from './controllers/cart.controller';
import WishlistController from './controllers/wishlist.controller';
import User from './interfaces/user.interface';

declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}

validateEnv();

const port = parseInt(process.env.PORT as string) || 5000;

const app = new App(
	[
		new PostController(),
		new AuthController(),
		new UserController(),
		new FeedController(),
		new PayController(),
		new CartController(),
		new WishlistController(),
	],
	port
);

app.listen();
