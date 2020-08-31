import OrderItem from './orderItem';

interface Cart {
	products: OrderItem[];
	totalPrice: number;
	user: string;
}

export default Cart;
