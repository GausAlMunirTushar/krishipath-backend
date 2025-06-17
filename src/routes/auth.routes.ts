import { Router, RequestHandler } from "express";
import {
	register,
	login,
	forgotPassword,
	resetPassword,
	getMyProfile,
	updateProfile,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post("/register", register as RequestHandler);
router.post("/login", login as RequestHandler);
router.post("/forgot-password", forgotPassword as RequestHandler);
router.post("/reset-password", resetPassword as RequestHandler);

router.get("/me", authenticate, getMyProfile as RequestHandler);
router.put(
	"/me",
	authenticate,
	upload("avatars").single("avatar"),
	updateProfile
);

export default router;
