import { Router } from "express";
import {
  getHomepage,
  getProductForm,
  getCategoryForm,
} from "../controller/controllers.js";

const router = Router();

export { router };

router.get("/", getHomepage);
router.get("/products/new", getProductForm);
router.get("/products/:productId/edit", getProductForm);
router.get("/categories/new", getCategoryForm);
router.get("/categories/:categoryId/edit", getCategoryForm);
