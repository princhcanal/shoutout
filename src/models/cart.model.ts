import mongoose from 'mongoose';

import Cart from '../interfaces/cart.interface';

const cartSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, required: true },
		products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order Item' }],
		totalPrice: { type: Number, required: true },
	},
	{ timestamps: true }
);

const cartModel = mongoose.model<Cart & mongoose.Document>('Cart', cartSchema);

export default cartModel;
