import express from "express";
import { ModuleController } from "../controllers/module.controller";

const router = express.Router();

router.get("/", ModuleController.getAllModules);
router.get("/:id/courses", ModuleController.getAllModulesByCourseId);
router.delete("/:id", ModuleController.deleteModule);
router.get("/:id", ModuleController.getModuleById);

export const ModuleRoute = router;
