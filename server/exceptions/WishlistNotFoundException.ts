import HttpException from './HttpException';

class WishlistNotFoundException extends HttpException {
	constructor(username: string) {
		super(404, `Wishlist for ${username} not found`);
	}
}

export default WishlistNotFoundException;
