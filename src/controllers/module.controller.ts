import { ModuleServices } from "../services/module.services";
import catchAsync from "../shared/catchAsync";
import sendResponse from "../shared/sendResponse";

const getAllModules = catchAsync(async (req, res) => {
  const module = await ModuleServices.getAllModuleFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Modules retrieved successfully",
    data: module,
  });
});

const getAllModulesByCourseId = catchAsync(async (req, res) => {
  const module = await ModuleServices.getAllModuleByCourseId(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Modules retrieved successfully",
    data: module,
  });
});

const getModuleById = catchAsync(async (req, res) => {
  const module = await ModuleServices.getModuleByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Module retrieved successfully",
    data: module,
  });
});

const deleteModule = catchAsync(async (req, res) => {
  const module = await ModuleServices.deleteModuleFromDb(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Module deleted successfully",
    data: module,
  });
});

export const ModuleController = {
  getAllModules,
  getModuleById,
  deleteModule,
  getAllModulesByCourseId,
};
