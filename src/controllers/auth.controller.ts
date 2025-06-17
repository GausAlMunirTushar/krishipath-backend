import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { IUser } from "../models/user.model";
import { generateToken } from "../utils/generateToken";

const JWT_SECRET = process.env.JWT_SECRET || "krishipath";

// ✅ Register
export const register = async (req: Request, res: Response) => {
	try {
		const {
			name,
			email,
			phone,
			password,
			role,
			division,
			district,
			upazila,
			address,
		} = req.body;

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
			division,
			district,
			upazila,
			address,
			avatar: req.file?.path || undefined,
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
		const { phone, password } = req.body;

		if (!phone || !password) {
			return res
				.status(400)
				.json({ message: "Phone and password are required." });
		}

		const user = (await User.findOne({ phone })) as IUser | null;

		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ id: user._id.toString(), role: user.role },
			JWT_SECRET,
			{ expiresIn: "7d" }
		);

		return res.status(200).json({
			token,
			user: {
				id: user._id.toString(),
				phone: user.phone,
				role: user.role,
			},
		});
	} catch (err) {
		console.error("Login error:", err);
		return res.status(500).json({
			message: "Login failed",
			error: err instanceof Error ? err.message : err,
		});
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
export const getMyProfile = async (req: any, res: Response) => {
	try {
		const user = await User.findById(req.user._id).select(
			"-password -resetToken -resetTokenExpiry"
		);
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({
			message: "Failed to fetch profile",
			error: err,
		});
	}
};

// ✅ Update Profile
export const updateProfile = async (req: any, res: Response) => {
	try {
		const {
			name,
			phone,
			email,
			password,
			division,
			district,
			upazila,
			address,
		} = req.body;

		const updateFields: Partial<IUser> = {};

		if (name) updateFields.name = name;
		if (phone) updateFields.phone = phone;
		if (email) updateFields.email = email;
		if (division) updateFields.division = division;
		if (district) updateFields.district = district;
		if (upazila) updateFields.upazila = upazila;
		if (address) updateFields.address = address;
		if (req.file?.path) updateFields.avatar = req.file.path;

		if (password) {
			const hashed = await bcrypt.hash(password, 10);
			updateFields.password = hashed;
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			updateFields,
			{
				new: true,
				select: "-password -resetToken -resetTokenExpiry",
			}
		);

		res.status(200).json({ message: "Profile updated", user: updatedUser });
	} catch (err) {
		res.status(500).json({ message: "Update failed", error: err });
	}
};
