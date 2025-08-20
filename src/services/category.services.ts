import { ICategory } from "../interface/category.interface";
import { Category } from "../models/category.model";

const addCategory = async (category: ICategory): Promise<ICategory> => {
  const result = await Category.create(category);
  return result;
};

const AddProductTitleBaseOnCategory = async (title: string) => {
  const allCategory = await Category.find({});

  const matchCategory = allCategory.filter(
    (category) => category.category == title
  );
};

export const CategoryServices = {
  addCategory,
};
