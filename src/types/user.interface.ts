import { Pagination } from "../interfaces/pagination";

export interface IUser {
  id: string;
  phone: string;
  name: string;
  email: string;
  createdBy: {
    _id: string;
    name: string;
  };
  active: boolean;
  createdAt: string;
  updatedAt: string;
  temporalPass: string;
  password: string;
  repassword: string;
}

export type IUserCreate = Omit<
  IUser,
  "id" | "createdAt" | "updatedAt" | "createdBy"
>;
export type IUserUpdate = Partial<IUserCreate>;

export type IUserResponse = Partial<IUser>;

export interface IUserRequest {
  data: IUserResponse[];
  pagination: Pagination;
}
