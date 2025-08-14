import express from "express";
import { FileUploadConfig } from "../utilis/multer";
import { CourseValidation } from "../validation/course.validaiton";
import { CourseController } from "../controllers/course.controller";
const router = express.Router();

router.post("/", FileUploadConfig.upload.single("file"), (req, res, next) => {
  req.body = CourseValidation.insertCourseValidation.parse(req.body.data);

  return CourseController.insertCourse(req, res, next);
});

router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getCourseById);
router.delete("/:id", CourseController.deleteCourse);
router.put("/:id", FileUploadConfig.upload.single("file"), (req, res, next) => {
  req.body = CourseValidation.updateCourseValidation.parse(req.body.data);

  return CourseController.updateCourse(req, res, next);
});
