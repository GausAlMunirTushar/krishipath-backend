import mongoose, { Document, Schema } from "mongoose";
import { UserRole } from "../constants/roles";

export interface IUser extends Document {
	name: string;
	email?: string;
	phone?: string;
	password: string;
	role: UserRole;
	address?: string;
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
		address: { type: String },
		resetToken: { type: String },
		resetTokenExpiry: { type: Date },
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
