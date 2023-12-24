import { emailSend } from "../controllers/emailSend.js";
import express from "express";
const router = express.Router();
router.post("/emailSend", emailSend);
export default router;
