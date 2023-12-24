import { imageUpload, upload } from "../controllers/image.js";
import express from "express";
const router = express.Router();
router.post("/imageUpload", upload, imageUpload);
export default router;
