import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "../routes/user.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);

export default app;
