import { Router } from "express";
import { getHomepage } from "../controller/controllers.js";

const router = Router();

export { router };

router.get("/", getHomepage);
