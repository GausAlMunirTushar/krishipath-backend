// src/routes/farmerStory.routes.ts
import { Router } from "express";
import {
	submitFarmerStory,
	getAllStories,
	getApprovedStories,
	updateStory,
	deleteStory,
	approveStory,
} from "../controllers/farmerStory.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/role.middleware";

const router = Router();

// Public
router.get("/approved", getApprovedStories);

// Farmer
router.post("/apply", authenticate, submitFarmerStory);

// Admin
router.get("/", authenticate, isAdmin, getAllStories);
router.put("/:id", authenticate, isAdmin, updateStory);
router.delete("/:id", authenticate, isAdmin, deleteStory);
router.patch("/:id/approve", authenticate, isAdmin, approveStory);

export default router;
