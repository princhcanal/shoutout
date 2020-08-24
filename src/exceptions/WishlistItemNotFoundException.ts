import HttpException from './HttpException';

class WishlistItemNotFoundException extends HttpException {
	constructor(prodId: string) {
		super(404, `Wishlist item ${prodId} not found`);
	}
}

export default WishlistItemNotFoundException;
