import { getProductForm } from "../controllers/productController.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/new", getProductForm);
productRouter.get("/:productId/edit", getProductForm);

export { productRouter };
