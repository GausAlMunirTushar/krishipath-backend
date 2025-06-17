import { Request, Response } from "express";
import FarmerStory from "../models/farmerStory.model";

// Farmer submits story (with image upload)
export const submitFarmerStory = async (req: any, res: Response) => {
	try {
		const { name, address, message, videoUrl } = req.body;
		const imageUrl = req.file?.path;

		if (!imageUrl) {
			return res.status(400).json({ message: "Image is required" });
		}

		const story = await FarmerStory.create({
			name,
			address,
			message,
			imageUrl,
			videoUrl: videoUrl || null,
			submittedBy: req.user._id,
			isApproved: false,
		});

		res.status(201).json(story);
	} catch (err) {
		res.status(500).json({ message: "Failed to submit story", error: err });
	}
};

// Admin: Get all stories
export const getAllStories = async (_req: Request, res: Response) => {
	try {
		const stories = await FarmerStory.find().populate(
			"submittedBy",
			"name role email"
		);
		res.status(200).json(stories);
	} catch (err) {
		res.status(500).json({
			message: "Failed to fetch stories",
			error: err,
		});
	}
};

// Public: Get approved stories
export const getApprovedStories = async (_req: Request, res: Response) => {
	try {
		const stories = await FarmerStory.find({ isApproved: true }).sort({
			createdAt: -1,
		});
		res.status(200).json(stories);
	} catch (err) {
		res.status(500).json({
			message: "Failed to fetch approved stories",
			error: err,
		});
	}
};

// Admin: Approve a story
export const approveStory = async (req: Request, res: Response) => {
	try {
		const updated = await FarmerStory.findByIdAndUpdate(
			req.params.id,
			{ isApproved: true },
			{ new: true }
		);
		res.status(200).json(updated);
	} catch (err) {
		res.status(500).json({
			message: "Failed to approve story",
			error: err,
		});
	}
};

// Admin: Update story
export const updateStory = async (req: any, res: Response) => {
	try {
		const updateData: any = { ...req.body };

		// Optional: support image update
		if (req.file?.path) {
			updateData.imageUrl = req.file.path;
		}

		const updated = await FarmerStory.findByIdAndUpdate(
			req.params.id,
			updateData,
			{
				new: true,
			}
		);

		res.status(200).json(updated);
	} catch (err) {
		res.status(500).json({ message: "Failed to update story", error: err });
	}
};

// Admin: Delete story
export const deleteStory = async (req: Request, res: Response) => {
	try {
		await FarmerStory.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Story deleted" });
	} catch (err) {
		res.status(500).json({ message: "Failed to delete story", error: err });
	}
};
