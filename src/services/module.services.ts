import ApiError from "../error/apiError";
import { IModule } from "../interface/module.interface";
import { Module } from "../models/module.model";

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
