import mongoose, { Schema, Document } from "mongoose";

export interface IFaq extends Document {
	question: string;
	answer: string;
}

const FaqSchema = new Schema<IFaq>(
	{
		question: { type: String, required: true },
		answer: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<IFaq>("Faq", FaqSchema);
