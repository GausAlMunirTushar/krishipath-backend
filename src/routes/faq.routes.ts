import { RequestHandler, Router } from "express";
import {
	createFaq,
	getFaqs,
	getFaq,
	updateFaq,
	deleteFaq,
} from "../controllers/faq.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/role.middleware";

const router = Router();

// Public
router.get("/", getFaqs);
router.get("/:id", getFaq as RequestHandler);

// Admin only
router.post("/", authenticate, isAdmin, createFaq);
router.put("/:id", authenticate, isAdmin, updateFaq as RequestHandler);
router.delete("/:id", authenticate, isAdmin, deleteFaq as RequestHandler);

export default router;
