import { Router } from "express";
import { getHomepage, getProductForm } from "../controller/controllers.js";

const router = Router();

export { router };

router.get("/", getHomepage);
router.get("/products/new", getProductForm);
router.get("/products/:productId/edit", getProductForm);
