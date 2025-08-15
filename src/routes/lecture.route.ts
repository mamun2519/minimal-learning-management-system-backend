import express from "express";
import { LectureController } from "../controllers/lecture.controller";
import { FileUploadConfig } from "../utilis/multer";

const router = express.Router();
router.put(
  "/:id",
  FileUploadConfig.upload.array("files"),
  LectureController.updateLectureById
);
router.get("/", LectureController.getAllLectures);
router.get("/:id/lecture", LectureController.getAllLecturesByModuleId);
router.delete("/:id", LectureController.deleteLecture);
router.get("/:id", LectureController.getLectureById);

export const LectureRoute = router;
