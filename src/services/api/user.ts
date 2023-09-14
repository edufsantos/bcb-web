import { api } from "../api";

export interface ICreateAccountUser {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  password: string;
  password_confirmation?: string;
}

export interface ICreateAccountCustomer {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  password: string;
  password_confirmation?: string;
  cnpj: string;
  companyName: string;
}

export const createAccountUser = (data: ICreateAccountUser) => {
  return api.post("/auth/create-account", data);
};

export const createCustomerAccount = (data: ICreateAccountCustomer) => {
  return api.post("/auth/create-customer-account", data);
};
