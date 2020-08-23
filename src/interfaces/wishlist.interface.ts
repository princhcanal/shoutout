import User from './user.interface';
import Post from './post.interface';

interface Wishlist {
	user: string | User;
	products: string[] | Post[];
}

export default Wishlist;
