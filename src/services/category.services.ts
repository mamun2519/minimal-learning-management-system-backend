import { StatusCodes } from "http-status-codes";
import ApiError from "../error/apiError";
import { ICategory } from "../interface/category.interface";
import { Category } from "../models/category.model";

const addCategory = async (category: ICategory): Promise<ICategory> => {
  const result = await Category.create(category);
  return result;
};

const AddProductTitleBaseOnCategory = async (title: string) => {
  const allCategory = await Category.find({
    or: {
      $regex: title,
      $options: "i",
    },
  });

  if (!allCategory.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Similor Category not found");
  }
  return allCategory;
};

export const CategoryServices = {
  addCategory,
  AddProductTitleBaseOnCategory,
};
