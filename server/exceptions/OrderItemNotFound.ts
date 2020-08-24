import HttpException from './HttpException';

class OrderItemNotFoundException extends HttpException {
	constructor(orderItemId: string) {
		super(404, `Order ${orderItemId} not found`);
	}
}

export default OrderItemNotFoundException;
