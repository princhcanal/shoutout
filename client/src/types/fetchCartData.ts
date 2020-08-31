import Cart from './cart';
import Post from './post';

interface FetchCartData {
	message: string;
	cart: Cart;
	products: Post[];
}

export default FetchCartData;
