import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const isAdmin = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void => {
	if (req.user?.role !== "admin") {
		res.status(403).json({ message: "Access denied. Admins only." });
		return;
	}
	next();
};
