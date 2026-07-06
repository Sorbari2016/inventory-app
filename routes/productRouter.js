import {
  getProductForm,
  createProduct,
  reviseProduct,
} from "../controllers/productController.js";
import { validateProduct } from "../validation/validate.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/new", getProductForm);
productRouter.get("/:productId/edit", getProductForm);
productRouter.post("/new", validateProduct(), createProduct);
productRouter.post("/:productId/edit", validateProduct(), reviseProduct);

export { productRouter };
