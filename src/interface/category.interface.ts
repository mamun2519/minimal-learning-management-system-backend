import { Model } from "mongoose";

export type ICategory = {
  category: string;
};

export type CategoryModel = Model<ICategory>;
