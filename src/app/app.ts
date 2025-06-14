import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

export default app;
