import mongoose, { Document, Schema } from "mongoose";

export interface INews extends Document {
	title: string;
	image: string;
	description: string;
	content?: string;
	author?: string;
	tags?: string[];
	publishedAt?: Date;
}

const NewsSchema = new Schema<INews>(
	{
		title: { type: String, required: true },
		image: { type: String, required: true },
		description: { type: String, required: true },
		content: { type: String },
		author: { type: String },
		tags: [String],
		publishedAt: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

export default mongoose.model<INews>("News", NewsSchema);
