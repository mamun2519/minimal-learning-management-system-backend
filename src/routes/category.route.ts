import express from "express";
import { CategoryController } from "../controllers/Category.controller";

const router = express.Router();

router.post("/create", CategoryController.addCategory);

export const CategoryRoute = router;
