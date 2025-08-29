import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import { getAllProducts } from "../controllers/product.controller.js";
import { getFeaturedProducts } from "../controllers/product.controller.js";
import { createProduct } from "../controllers/product.controller.js";
import { deleteProduct } from "../controllers/product.controller.js";
import { getRecommendedProducts } from "../controllers/product.controller.js";
import { getProductsByCategory } from "../controllers/product.controller.js";
import { toggleFeaturedProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations",getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);


export default router;

