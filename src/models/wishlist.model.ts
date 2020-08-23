import mongoose from 'mongoose';

import Wishlist from '../interfaces/wishlist.interface';

const wishlistSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
	},
	{ timestamps: true }
);

const wishListModel = mongoose.model<Wishlist & mongoose.Document>(
	'Wishlist',
	wishlistSchema
);

export default wishListModel;
