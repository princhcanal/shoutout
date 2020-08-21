import mongoose from 'mongoose';
import User from '../interfaces/user.interface';

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		name: { type: String, default: '' },
		email: { type: String, required: true },
		password: { type: String, required: true },
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		subscriptions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		subscribers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
