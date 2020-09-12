import User from '../models/user';
import Post from '../models/post';

interface FetchUserProfileData {
	message: string;
	user: User;
	posts: Post[];
}

export default FetchUserProfileData;
