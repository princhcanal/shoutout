import mongoose from 'mongoose';
import User from '../interfaces/user.interface';

const userSchema = new mongoose.Schema(
	{
		username: String,
		name: String,
		email: String,
		password: String,
		followers: [
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
