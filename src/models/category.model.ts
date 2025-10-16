import { model, Schema } from "mongoose";
import { CategoryModel, ICategory } from "../interface/category.interface";

const categorySchema = new Schema<ICategory, CategoryModel>({
  category: {
    type: String,
    required: [true, "Category is required"],
  },
});

export const Category = model<ICategory>("Category", categorySchema);
