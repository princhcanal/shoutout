import User from './user';

interface Post {
	_id: string;
	author: User;
	description: string;
	title: string;
	price: number;
	image: string;
	url: string;
}

export default Post;
