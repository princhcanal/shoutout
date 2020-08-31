import User from './user.interface';
import OrderItem from './orderItem.interface';
import Post from './post.interface';

interface Cart {
	user: string | User;
	products: string[] | OrderItem[];
	totalPrice: number;
}

export default Cart;
