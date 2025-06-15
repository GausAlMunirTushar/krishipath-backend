import { Request, Response } from "express";
import News from "../models/news.model";

// Create
export const createNews = async (req: Request, res: Response) => {
	try {
		const news = await News.create(req.body);
		res.status(201).json(news);
	} catch (err) {
		res.status(500).json({ message: "Failed to create news", error: err });
	}
};

// Get all
export const getAllNews = async (_req: Request, res: Response) => {
	try {
		const news = await News.find().sort({ publishedAt: -1 });
		res.status(200).json(news);
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch news", error: err });
	}
};

// Get one
export const getSingleNews = async (req: Request, res: Response) => {
	try {
		const news = await News.findById(req.params.id);
		if (!news) return res.status(404).json({ message: "News not found" });
		res.status(200).json(news);
	} catch (err) {
		res.status(500).json({ message: "Error retrieving news", error: err });
	}
};

// Update
export const updateNews = async (req: Request, res: Response) => {
	try {
		const updated = await News.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updated)
			return res.status(404).json({ message: "News not found" });
		res.status(200).json(updated);
	} catch (err) {
		res.status(500).json({ message: "Failed to update news", error: err });
	}
};

// Delete
export const deleteNews = async (req: Request, res: Response) => {
	try {
		const deleted = await News.findByIdAndDelete(req.params.id);
		if (!deleted)
			return res.status(404).json({ message: "News not found" });
		res.status(200).json({ message: "News deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Failed to delete news", error: err });
	}
};
