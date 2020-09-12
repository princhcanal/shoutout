import Cart from '../models/cart';
import Post from '../models/post';

interface FetchCartData {
	message: string;
	cart: Cart;
	products: Post[];
}

export default FetchCartData;
