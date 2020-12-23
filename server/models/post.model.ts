// TODO: change post to product
import mongoose from 'mongoose';
import Post from '../interfaces/post.interface';

const postSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		description: { type: String, required: true },
		title: { type: String, required: true },
		price: { type: Number, required: true },
		image: { type: String, required: true },
		imagePath: { type: String, required: true },
		url: { type: String, required: true },
	},
	{ timestamps: true }
);

const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);

export default postModel;
