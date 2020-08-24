import User from './user.interface';
import OrderItem from './orderItem.interface';

interface Cart {
	user: string | User;
	products: string[] | OrderItem[];
	totalPrice: number;
}

export default Cart;
