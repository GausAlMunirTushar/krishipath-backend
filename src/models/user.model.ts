import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../constants/roles";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: UserRole;
	phone?: string;
	address?: string;
	createdAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: Object.values(UserRole),
			default: UserRole.FARMER,
		},
		phone: { type: String },
		address: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
