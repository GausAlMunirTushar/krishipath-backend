import { Request, Response } from "express";
import Product from "../models/product.model";

// Create
export const createProduct = async (req: Request, res: Response) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (err) {
		res.status(500).json({
			message: "Failed to create product",
			error: err,
		});
	}
};

// Get all
export const getProducts = async (_req: Request, res: Response) => {
	try {
		const products = await Product.find().sort({ createdAt: -1 });
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({
			message: "Failed to fetch products",
			error: err,
		});
	}
};

// Get one
export const getProduct = async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) return res.status(404).json({ message: "Not found" });
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ message: "Error getting product", error: err });
	}
};

// Update
export const updateProduct = async (req: Request, res: Response) => {
	try {
		const updated = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updated) return res.status(404).json({ message: "Not found" });
		res.status(200).json(updated);
	} catch (err) {
		res.status(500).json({
			message: "Failed to update product",
			error: err,
		});
	}
};

// Delete
export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const deleted = await Product.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).json({ message: "Not found" });
		res.status(200).json({ message: "Deleted successfully" });
	} catch (err) {
		res.status(500).json({
			message: "Failed to delete product",
			error: err,
		});
	}
};
