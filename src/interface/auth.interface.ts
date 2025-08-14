import { Model } from "mongoose";

export type AuthUser = {
  _id: string;
  email: string;
  name: string;
  role: string;
  password: string;
};

export type UserModel = Model<AuthUser>;
export type AuthUserWithToken = AuthUser & {
  token: string;
};
