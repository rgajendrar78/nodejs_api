import express from "express";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import imageRoutes from "./routes/image.js";
import { config } from "dotenv";
import emailSendRoutes from "./routes/emailSend.js";
export const app = express();
config({ path: "./data/config.env" });
// using middleware
app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);
app.use(imageRoutes);
app.use(emailSendRoutes);
