import express from "express";
import { CategoryController } from "../controllers/Category.controller";

const router = express.Router();

router.post("/create", CategoryController.addCategory);

router.get("/", CategoryController.AddProductTitleBaseOnCategory);

export const CategoryRoute = router;
