import mongoose, { Document, Schema } from "mongoose";

export interface IFarmerStory extends Document {
	name: string;
	address: string;
	message: string;
	imageUrl: string;
	videoUrl?: string;
	isApproved: boolean;
	submittedBy: mongoose.Types.ObjectId;
}

const FarmerStorySchema = new Schema<IFarmerStory>(
	{
		name: { type: String, required: true },
		address: { type: String, required: true },
		message: { type: String, required: true },
		imageUrl: { type: String, required: true },
		videoUrl: { type: String },
		isApproved: { type: Boolean, default: false },
		submittedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IFarmerStory>("FarmerStory", FarmerStorySchema);
