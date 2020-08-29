import User from './user';
import Post from './post';

interface FetchUserProfileData {
	message: string;
	user: User;
	posts: Post[];
}

export default FetchUserProfileData;
