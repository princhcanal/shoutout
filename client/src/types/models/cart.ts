import OrderItem from './orderItem';
import Post from './post';

interface Cart {
	products: OrderItem[];
	totalPrice: number;
	user: string;
}

export default Cart;
