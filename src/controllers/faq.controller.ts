import { Request, Response } from "express";
import Faq from "../models/faq.model";

// Create
export const createFaq = async (req: Request, res: Response) => {
	try {
		const faq = await Faq.create(req.body);
		res.status(201).json(faq);
	} catch (err) {
		res.status(500).json({ message: "Failed to create FAQ", error: err });
	}
};

// Get All
export const getFaqs = async (_req: Request, res: Response) => {
	try {
		const faqs = await Faq.find().sort({ createdAt: -1 });
		res.status(200).json(faqs);
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch FAQs", error: err });
	}
};

// Get One
export const getFaq = async (req: Request, res: Response) => {
	try {
		const faq = await Faq.findById(req.params.id);
		if (!faq) return res.status(404).json({ message: "FAQ not found" });
		res.status(200).json(faq);
	} catch (err) {
		res.status(500).json({ message: "Error fetching FAQ", error: err });
	}
};

// Update
export const updateFaq = async (req: Request, res: Response) => {
	try {
		const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!faq) return res.status(404).json({ message: "FAQ not found" });
		res.status(200).json(faq);
	} catch (err) {
		res.status(500).json({ message: "Failed to update FAQ", error: err });
	}
};

// Delete
export const deleteFaq = async (req: Request, res: Response) => {
	try {
		const faq = await Faq.findByIdAndDelete(req.params.id);
		if (!faq) return res.status(404).json({ message: "FAQ not found" });
		res.status(200).json({ message: "FAQ deleted" });
	} catch (err) {
		res.status(500).json({ message: "Failed to delete FAQ", error: err });
	}
};
