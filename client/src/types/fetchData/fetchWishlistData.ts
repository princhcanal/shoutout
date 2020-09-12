import Wishlist from '../models/wishlist';
import Post from '../models/post';

interface FetchWishlistData {
	message: string;
	wishlist: Wishlist;
}

export default FetchWishlistData;
