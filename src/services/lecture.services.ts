import mongoose from "mongoose";
import ApiError from "../error/apiError";
import { ILecture } from "../interface/lecture.interface";
import { Lecture } from "../models/lecture.model";
import { StatusCodes } from "http-status-codes";
import { Request } from "express";
import cloudinary from "../config/cloudinary";
import { Module } from "../models/module.model";

const updateLectureIntoDB = async (
  req: Request,
  lectureId: string,
  lectureData: Partial<ILecture>
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingLecture = await Lecture.findById(lectureId).session(session);
    if (!existingLecture) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Lecture not found");
    }

    // Upload new files if provided
    let uploadedFiles: any = [];
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      uploadedFiles = await Promise.all(
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
    }

    // Update fields if provided
    if (lectureData.title) existingLecture.title = lectureData.title;
    if (lectureData.order !== undefined)
      existingLecture.order = lectureData.order;
    if (lectureData.videoURl) existingLecture.videoURl = lectureData.videoURl;

    // Append new PDF notes if uploaded
    if (uploadedFiles.length > 0) {
      existingLecture.pdfNotes.push(...uploadedFiles);
    }

    await existingLecture.save({ session });

    await session.commitTransaction();
    session.endSession();

    return existingLecture;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const getAllLectures = async (filters: {
  courseId?: string;
  moduleId?: string;
  search?: string;
}) => {
  const { courseId, moduleId, search } = filters;

  let moduleIds: string[] = [];

  if (moduleId) {
    moduleIds = [moduleId];
  } else if (courseId) {
    const modules = await Module.find({ courseId }).select("_id");
    if (!modules.length) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "No modules found for this course"
      );
    }
    moduleIds = modules.map((m) => m._id.toString());
  }

  // lecture query
  const query: any = {};
  if (moduleIds.length > 0) query.moduleId = { $in: moduleIds };
  if (search) query.title = { $regex: search, $options: "i" };

  const lectures = await Lecture.find(query)
    .sort({ createdAt: -1 })
    .populate("moduleId", "title moduleNumber")
    .populate("courseId", "title")
    .exec();

  return lectures;
};

const getAllLectureFromDB = async (): Promise<ILecture[]> => {
  const lecture: ILecture[] = await Lecture.find({});
  return lecture;
};

const getAllLectureByModuleId = async (
  moduleId: string
): Promise<ILecture[]> => {
  const lecture: ILecture[] = await Lecture.find({ moduleId });
  return lecture;
};

const getLectureByIdFromDb = async (id: string): Promise<ILecture | null> => {
  const lecture: ILecture | null = await Lecture.findById(id);
  if (!lecture) {
    throw new ApiError(404, "Lecture not found");
  }
  return lecture;
};

const deleteLectureFromDb = async (id: string): Promise<ILecture | null> => {
  const lecture: ILecture | null = await Lecture.findByIdAndDelete(id);
  if (!lecture) {
    throw new ApiError(404, "Lecture not found");
  }
  return lecture;
};

export const LectureServices = {
  deleteLectureFromDb,
  getAllLectureFromDB,
  getAllLectureByModuleId,
  getLectureByIdFromDb,
  updateLectureIntoDB,
  getAllLectures,
};
