import HttpException from './HttpException';

class CartNotFoundException extends HttpException {
	constructor(username: string) {
		super(404, `Cart for ${username} not found`);
	}
}

export default CartNotFoundException;
