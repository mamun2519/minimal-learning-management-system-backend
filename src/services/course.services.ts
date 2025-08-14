import { Request } from "express";
import { ICourse } from "../interface/course.interface";
import ApiError from "../error/apiError";
import cloudinary from "../config/cloudinary";
import { Course } from "../models/course.model";

const insertCourseInToDb = async (req: Request): Promise<ICourse> => {
  const fileData = req.file;
  const courseData = req.body as ICourse;
  if (!fileData) {
    throw new ApiError(201, "File is required");
  }

  const uploadFile = await cloudinary.uploader.upload(fileData.path, {
    folder: "lms_uploads",
    resource_type: "auto",
  });
  if (!uploadFile) {
    throw new ApiError(500, "Failed to upload file to Cloudinary");
  }

  const course: ICourse = {
    title: courseData?.title,
    description: courseData.description,
    price: courseData.price,
    file: {
      url: uploadFile.secure_url,
      key: uploadFile.public_id,
    },
  };
  const newCourse = await Course.create(course);

  return newCourse;
};

const getAllCoursesFromDb = async (): Promise<ICourse[]> => {
  const courses: ICourse[] = await Course.find({});
  return courses;
};

const getCourseByIdFromDb = async (id: string): Promise<ICourse | null> => {
  const course: ICourse | null = await Course.findById(id);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  return course;
};

const deleteCourseFromDb = async (id: string): Promise<ICourse | null> => {
  const course: ICourse | null = await Course.findByIdAndDelete(id);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  return course;
};

const updateCourseInDb = async (
  id: string,
  req: Request,
  courseData: Partial<ICourse>
): Promise<ICourse | null> => {
  const fileData = req.file;
  if (fileData) {
    const uploadFile = await cloudinary.uploader.upload(fileData.path, {
      folder: "lms_uploads",
      resource_type: "auto",
    });

    const updateCourse = {
      ...courseData,
      file: {
        url: uploadFile.secure_url,
        key: uploadFile.public_id,
      },
    };
    courseData = updateCourse;
  }

  const updatedCourse: ICourse | null = await Course.findByIdAndUpdate(
    id,
    courseData,
    { new: true }
  );
  if (!updatedCourse) {
    throw new ApiError(404, "Course not found");
  }
  return updatedCourse;
};

export const CourseService = {
  insertCourseInToDb,
  getAllCoursesFromDb,
  getCourseByIdFromDb,
  deleteCourseFromDb,
  updateCourseInDb,
};
