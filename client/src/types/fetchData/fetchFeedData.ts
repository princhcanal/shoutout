import Post from '../models/post';

interface FetchFeedData {
	message: string;
	posts: Post[];
}

export default FetchFeedData;
