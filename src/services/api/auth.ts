import { User } from "@interfaces/models/user";
import { TSignInResponse } from "../../interfaces/models/auth";
import { api } from "../api";

export interface IAuthUser {
  email: string;
  password: string;
}

export const loginAdmin = (data: IAuthUser) => {
  return api.post<TSignInResponse>("/auth/login", data);
};

export const loginCustomer = (data: IAuthUser) => {
  return api.post<TSignInResponse>("/auth/login-customer", data);
};

export const findCurrentData = () => {
  return api.get<User>("/auth/current");
};
