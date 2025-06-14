import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { IUser } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password, role } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({ name, email, password: hashedPassword, role });
		await user.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = (await User.findOne({ email })) as IUser;
		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid email or password" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: "Invalid email or password" });
		}

		const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
			expiresIn: "7d",
		});

		res.status(200).json({
			token,
			user: { id: user._id, email: user.email, role: user.role },
		});
	} catch (err) {
		res.status(500).json({ message: "Login failed", error: err });
	}
};
