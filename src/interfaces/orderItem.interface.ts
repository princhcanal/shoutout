import Post from './post.interface';

interface OrderItem {
	product: string | Post;
	quantity: number;
}

export default OrderItem;
