import ApiError from "../error/apiError";
import { IEnrolledCourse } from "../interface/enrolledCourse.interface";
import { EnrolledCourse } from "../models/enrolledCourse.model";

const enrolledIntoTheCourse = async (
  payload: IEnrolledCourse
): Promise<IEnrolledCourse> => {
  const isAllReadyEnrolled = await EnrolledCourse.findOne({
    and: [{ courseId: payload.courseId }, { userId: payload.userId }],
  });
  if (isAllReadyEnrolled) {
    throw new ApiError(201, "Already enrolled the course");
  }
  const result = await EnrolledCourse.create(payload);
  return result;
};

const getMyAllCourse = async (userId: string): Promise<IEnrolledCourse[]> => {
  const result = await EnrolledCourse.find({ userId }).populate("courseId");
  return result;
};

export const EnrolledCourseServices = {
  enrolledIntoTheCourse,
  getMyAllCourse,
};
