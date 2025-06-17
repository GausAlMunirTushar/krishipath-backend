import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

export interface AuthRequest extends Request {
	user?: IUser;
}

const JWT_SECRET = process.env.JWT_SECRET || "krishipath";

export const authenticate = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		let userId: string | undefined;
		if (
			typeof decoded === "object" &&
			decoded !== null &&
			"id" in decoded
		) {
			userId = (decoded as { id: string }).id;
		}
		if (!userId) {
			res.status(401).json({ message: "Invalid token payload" });
			return;
		}
		const user = await User.findById(userId).select("-password");
		if (!user) {
			res.status(401).json({ message: "User not found" });
			return;
		}
		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
	}
};
