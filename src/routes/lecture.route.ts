import express from "express";
import { LectureController } from "../controllers/lecture.controller";

const router = express.Router();

router.get("/", LectureController.getAllLectures);
router.get("/:id/lecture", LectureController.getAllLecturesByModuleId);
router.delete("/:id", LectureController.deleteLecture);
router.get("/:id", LectureController.getLectureById);

export const LectureRoute = router;
