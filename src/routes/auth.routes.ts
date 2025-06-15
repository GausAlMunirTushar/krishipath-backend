import { Router, RequestHandler } from "express";
import {
	register,
	login,
	forgotPassword,
	resetPassword,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register as RequestHandler);
router.post("/login", login as RequestHandler);
router.post("/forgot-password", forgotPassword as RequestHandler);
router.post("/reset-password", resetPassword as RequestHandler);

export default router;
