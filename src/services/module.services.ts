import { Request } from "express";
import ApiError from "../error/apiError";
import { ILecture } from "../interface/lecture.interface";
import { IModule } from "../interface/module.interface";
import { Module } from "../models/module.model";
import { Course } from "../models/course.model";
import { StatusCodes } from "http-status-codes";
import cloudinary from "../config/cloudinary";

// const insertModuleAndLectureIntoDB = async (
//   req: Request,
//   module: IModule,
//   lecture: ILecture[]
// ) => {
//   try {
//     const course = await Course.findById(module.courseId);
//     if (!course) {
//       throw new ApiError(
//         StatusCodes.NOT_FOUND,
//         "Requested Course Does Not Found"
//       );
//     }

//     const fileUploadResult = req.files?.map(async (file) => {
//       const uploadFile = await cloudinary.uploader.upload(file.path, {
//         folder: "lms_uploads",
//         resource_type: "auto",
//       });
//       return uploadFile;
//     });
//     console.log(fileUploadResult);
//     const uploadModule = await Module.create(module);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const insertModuleAndLectureIntoDB = async (
  req: Request,
  module: IModule,
  lectures: ILecture[]
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const course = await Course.findById(module.courseId).session(session);
    if (!course) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "Requested Course Does Not Found"
      );
    }

    // Upload files to Cloudinary
    const uploadedFiles = await Promise.all(
      (req.files as Express.Multer.File[]).map(async (file) => {
        const uploaded = await cloudinary.uploader.upload(file.path, {
          folder: "lms_uploads",
          resource_type: "auto",
        });
        return {
          url: uploaded.secure_url,
          key: uploaded.public_id,
        };
      })
    );

    // Create Module
    const newModule = await Module.create([module], { session });
    const moduleId = newModule[0]._id;

    // Attach files to lectures based on your matching logic
    // Here, assuming all uploaded files are pdfNotes for now
    const lectureDocs = lectures.map((lec) => ({
      ...lec,
      moduleId,
      courseId: module.courseId,
      pdfNotes: uploadedFiles,
    }));

    await Lecture.insertMany(lectureDocs, { session });

    await session.commitTransaction();
    session.endSession();

    return { module: newModule[0], lectures: lectureDocs };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const getAllModuleFromDB = async (): Promise<IModule[]> => {
  const modules: IModule[] = await Module.find({});
  return modules;
};
const getAllModuleByCourseId = async (courseId: string): Promise<IModule[]> => {
  const modules: IModule[] = await Module.find({ courseId });
  return modules;
};

const getModuleByIdFromDb = async (id: string): Promise<IModule | null> => {
  const modules: IModule | null = await Module.findById(id);
  if (!modules) {
    throw new ApiError(404, "Module not found");
  }
  return modules;
};

const deleteModuleFromDb = async (id: string): Promise<IModule | null> => {
  const modules: IModule | null = await Module.findByIdAndDelete(id);
  if (!Module) {
    throw new ApiError(404, "Module not found");
  }
  return modules;
};

export const ModuleServices = {
  deleteModuleFromDb,
  getAllModuleFromDB,
  getAllModuleByCourseId,
  getModuleByIdFromDb,
};
