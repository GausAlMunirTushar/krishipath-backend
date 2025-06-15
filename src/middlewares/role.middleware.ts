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

export const isAdminOrAgent = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void => {
	const role = req.user?.role;
	if (role === "admin" || role === "agent") {
		next();
	} else {
		res.status(403).json({ message: "Admins or Agents only" });
	}
};

export const isAgent = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void => {
	if (req.user?.role !== "agent") {
		res.status(403).json({ message: "Access denied. Agents only." });
		return;
	}
	next();
};
