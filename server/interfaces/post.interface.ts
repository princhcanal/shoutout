import User from './user.interface';

interface Post {
	author: string | User;
	description: string;
	title: string;
	price: number;
	image: string;
	imagePath: string;
	cloudinaryPublicId: string;
	url: string;
}

export default Post;
