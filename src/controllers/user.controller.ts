import { Request, Response } from "express";
import User from "../models/user.model";

export const getAllUsers = async (_req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const newUser = await User.create(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ error: "User creation failed", details: error });
	}
};
