import Post from './post.interface';
import Cart from './cart.interface';

interface OrderItem {
	cart: string | Cart;
	product: string | Post;
	quantity: number;
}

export default OrderItem;
