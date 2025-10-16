import { CategoryServices } from "../services/category.services";
import catchAsync from "../shared/catchAsync";
import sendResponse from "../shared/sendResponse";

const addCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.addCategory(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category create Successfully.",
    data: result,
  });
});

const AddProductTitleBaseOnCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.addCategory(req.body.title);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "fetch match category Successfully.",
    data: result,
  });
});

export const CategoryController = {
  addCategory,
  AddProductTitleBaseOnCategory,
};
