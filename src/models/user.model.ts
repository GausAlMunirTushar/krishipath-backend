import mongoose, { Document, Schema, Types } from "mongoose";
import { UserRole } from "../constants/roles";

export interface IUser extends Document {
	_id: Types.ObjectId;
	name: string;
	email?: string;
	phone?: string;
	password: string;
	role: UserRole;
	division?: string;
	district?: string;
	upazila?: string;
	address?: string;
	avatar?: string;
	resetToken?: string;
	resetTokenExpiry?: Date;
	createdAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, unique: true, sparse: true },
		phone: { type: String, unique: true, sparse: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: Object.values(UserRole),
			default: UserRole.FARMER,
		},
		division: { type: String },
		district: { type: String },
		upazila: { type: String },
		address: { type: String },
		avatar: { type: String },
		resetToken: { type: String },
		resetTokenExpiry: { type: Date },
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
