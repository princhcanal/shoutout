import mongoose from 'mongoose';

import OrderItem from '../interfaces/orderItem.interface';
import Post from '../interfaces/post.interface';

const orderItemSchema = new mongoose.Schema(
	{
		cart: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Cart',
			required: true,
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		quantity: { type: Number, required: true },
	},
	{ timestamps: true }
);

const orderItemModel = mongoose.model<OrderItem & mongoose.Document>(
	'Order Item',
	orderItemSchema
);

export default orderItemModel;
