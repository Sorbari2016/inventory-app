import { Router } from "express";
import { getHomepage } from "../controllers/homeController.js";

const router = Router();

export { router };

router.get("/", getHomepage);
