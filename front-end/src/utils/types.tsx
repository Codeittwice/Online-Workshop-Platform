//import { ObjectId } from "mongodb";

export type LoginDataType = {
  user?: UserType;
  token?: string;
  description?: string;
};

export type UserType = {
  _id?: string; //ObjectId;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  tokens?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type PostTypeWithTimestamps = {
  _id?: string; //ObjectId;
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostUpdate = {
  title?: string;
  description?: string;
};

export type PostCreate = {
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};
