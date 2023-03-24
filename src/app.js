import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product";
import authRouter from "./routes/auth";
import mongoose from "mongoose";

dotenv.config();

// khởi tạo
const app = express();

app.use(express.json());

app.use("/api", productRouter);
app.use("/api", authRouter);

mongoose.connect(process.env.URI);

export const viteNodeApp = app;
