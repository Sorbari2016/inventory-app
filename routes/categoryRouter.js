import {
  getCategoryForm,
  createCategory,
  reviseCategory,
  removeCategory,
} from "../controllers/categoryController.js";
import { validataCategory } from "../validation/validate.js";

import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get("/new", getCategoryForm);
categoryRouter.get("/:categoryId/edit", getCategoryForm);
categoryRouter.post("/new", validataCategory(), createCategory);
categoryRouter.post("/:categoryId/edit", validataCategory(), reviseCategory);
categoryRouter.post("/:categoryId/delete", removeCategory);

export { categoryRouter };
