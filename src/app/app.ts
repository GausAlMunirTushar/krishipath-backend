import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import contactRoutes from "../routes/contact.routes";
import faqRoutes from "../routes/faq.routes";
import productRoutes from "../routes/product.routes";
import newsRoutes from "../routes/news.routes";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
	res.json({
		success: true,
		status: 200,
		message: "Krishipath API",
	});
});

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/faq", faqRoutes);
app.use("/api/v1/news", newsRoutes);

export default app;
