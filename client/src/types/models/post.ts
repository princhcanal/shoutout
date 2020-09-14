import User from './user';

interface Post {
	_id: string;
	author: User;
	description: string;
	title: string;
	price: number;
	image: string;
	imagePath: string;
	url: string;
	createdAt: string;
	updatedAt: string;
}

export default Post;
