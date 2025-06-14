import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export interface AuthRequest extends Request {
	user?: any;
}

export const authenticate = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
	}
};
