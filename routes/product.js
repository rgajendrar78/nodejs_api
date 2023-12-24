import {
  addProduct,
  getAllProduct,
  searchProduct,
  searchProductFilter,
} from "../controllers/product.js";
import express from "express";
const router = express.Router();
router.post("/addProduct", addProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/searchProduct", searchProduct);
router.get("/searchProductFilter", searchProductFilter);
export default router;
