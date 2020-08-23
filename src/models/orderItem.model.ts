import mongoose from 'mongoose';

import OrderItem from '../interfaces/orderItem.interface';

const orderItemSchema = new mongoose.Schema(
	{
		product: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
		quantity: { type: Number, required: true },
	},
	{ timestamps: true }
);

const orderItemModel = mongoose.model<OrderItem & mongoose.Document>(
	'Order Item',
	orderItemSchema
);

export default orderItemModel;
