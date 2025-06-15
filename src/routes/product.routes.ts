import { RequestHandler, Router } from "express";
import {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isAdminOrAgent, isAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/", getProducts); // Public
router.get("/:id", getProduct as RequestHandler); // Public

router.post("/", authenticate, isAdminOrAgent, createProduct);
router.put(
	"/:id",
	authenticate,
	isAdminOrAgent,
	updateProduct as RequestHandler
);
router.delete("/:id", authenticate, isAdmin, deleteProduct as RequestHandler);

export default router;
