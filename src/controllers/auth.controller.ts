import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { IUser } from "../models/user.model";
import { generateToken } from "../utils/generateToken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// ✅ Register
export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, phone, password, role } = req.body;

		const existingUser = await User.findOne({
			$or: [{ email }, { phone }],
		});
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			name,
			email,
			phone,
			password: hashedPassword,
			role,
		});
		await user.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err });
	}
};

// ✅ Login with email or phone
export const login = async (req: Request, res: Response) => {
	try {
		const { loginId, password } = req.body;

		const user = (await User.findOne({
			$or: [{ email: loginId }, { phone: loginId }],
		})) as IUser;

		if (!user)
			return res.status(400).json({ message: "Invalid credentials" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });

		const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
			expiresIn: "7d",
		});

		res.status(200).json({
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				role: user.role,
			},
		});
	} catch (err) {
		res.status(500).json({ message: "Login failed", error: err });
	}
};

// ✅ Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { loginId } = req.body;
		const user = await User.findOne({
			$or: [{ email: loginId }, { phone: loginId }],
		});

		if (!user) return res.status(404).json({ message: "User not found" });

		const resetToken = generateToken(32);
		user.resetToken = resetToken;
		user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 mins
		await user.save();

		// Send this via email or SMS
		// e.g., sendSMS(user.phone, `Reset Token: ${resetToken}`)

		res.json({ message: "Password reset token generated", resetToken }); // For dev only
	} catch (err) {
		res.status(500).json({
			message: "Error sending reset token",
			error: err,
		});
	}
};

// ✅ Reset Password
export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { token, newPassword } = req.body;

		const user = await User.findOne({
			resetToken: token,
			resetTokenExpiry: { $gt: new Date() },
		});
		if (!user)
			return res
				.status(400)
				.json({ message: "Invalid or expired token" });

		const hashed = await bcrypt.hash(newPassword, 10);
		user.password = hashed;
		user.resetToken = undefined;
		user.resetTokenExpiry = undefined;
		await user.save();

		res.json({ message: "Password reset successful" });
	} catch (err) {
		res.status(500).json({ message: "Reset failed", error: err });
	}
};
