import { Router, RequestHandler } from "express";
import {
	createContact,
	getContacts,
	updateContact,
	deleteContact,
} from "../controllers/contact.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/role.middleware";

const router = Router();

router.post("/", createContact);
router.get("/", authenticate, isAdmin, getContacts);
router.put("/:id", authenticate, isAdmin, updateContact as RequestHandler);
router.delete("/:id", authenticate, isAdmin, deleteContact as RequestHandler);

export default router;
