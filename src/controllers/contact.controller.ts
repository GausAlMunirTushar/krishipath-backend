import { Request, Response } from "express";
import Contact from "../models/contact.model";
import { AuthRequest } from "../middlewares/auth.middleware";

// Create contact (public)
export const createContact = async (req: Request, res: Response) => {
	try {
		const { name, email, message } = req.body;
		const contact = await Contact.create({ name, email, message });
		res.status(201).json(contact);
	} catch (err) {
		res.status(400).json({
			message: "Failed to submit contact",
			error: err,
		});
	}
};

// Get all contacts (admin only)
export const getContacts = async (_req: AuthRequest, res: Response) => {
	try {
		const contacts = await Contact.find().sort({ createdAt: -1 });
		res.status(200).json(contacts);
	} catch (err) {
		res.status(500).json({
			message: "Error fetching contacts",
			error: err,
		});
	}
};

// Update contact (admin only)
export const updateContact = async (req: AuthRequest, res: Response) => {
	try {
		const { id } = req.params;
		const updated = await Contact.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updated)
			return res.status(404).json({ message: "Contact not found" });
		res.status(200).json(updated);
	} catch (err) {
		res.status(500).json({ message: "Error updating contact", error: err });
	}
};

// Delete contact (admin only)
export const deleteContact = async (req: AuthRequest, res: Response) => {
	try {
		const { id } = req.params;
		const deleted = await Contact.findByIdAndDelete(id);
		if (!deleted)
			return res.status(404).json({ message: "Contact not found" });
		res.status(200).json({ message: "Contact deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Error deleting contact", error: err });
	}
};
