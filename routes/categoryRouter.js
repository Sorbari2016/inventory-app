import { getCategoryForm } from "../controllers/categoryController.js";
import { Router } from "express";

const categoryRouter = Router();

categoryRouter.get("/new", getCategoryForm);
categoryRouter.get("/:categoryId/edit", getCategoryForm);

export { categoryRouter };
