import mongoose, { Schema, Document } from "mongoose";

interface ConversionRate {
	toUnit: string;
	multiplier: number;
	label: string;
}
export interface IProduct extends Document {
	productName: string;
	image: string;
	unit: string;
	basePrice: number;
	category?: string;
	conversionRates?: ConversionRate[];
}

const ProductSchema = new Schema<IProduct>(
	{
		productName: { type: String, required: true },
		image: { type: String, required: true },
		unit: { type: String, default: "kg" },
		basePrice: { type: Number, required: true },
		category: { type: String },
		conversionRates: [
			{
				toUnit: String,
				multiplier: Number,
				label: String,
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
