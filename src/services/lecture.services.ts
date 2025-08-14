import ApiError from "../error/apiError";
import { ILecture } from "../interface/lecture.interface";
import { Lecture } from "../models/lecture.model";

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
};
