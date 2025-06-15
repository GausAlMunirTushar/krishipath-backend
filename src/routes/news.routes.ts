import { RequestHandler, Router } from "express";
import {
	createNews,
	getAllNews,
	getSingleNews,
	updateNews,
	deleteNews,
} from "../controllers/news.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/role.middleware";

const router = Router();

// Public
router.get("/", getAllNews);
router.get("/:id", getSingleNews as RequestHandler);

// Admin-only
router.post("/", authenticate, isAdmin, createNews);
router.put("/:id", authenticate, isAdmin, updateNews as RequestHandler);
router.delete("/:id", authenticate, isAdmin, deleteNews as RequestHandler);

export default router;
