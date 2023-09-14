import { User } from "@interfaces/models/user";
import { api } from "@services/api";
import { FetchListRequest, FetchListResponse } from "@interfaces/api";

export interface ICreateAccountUser {
  email: string;
  name: string;
  phoneNumber: string;
  cpf: string;
  cnpj: string;
  companyName: string;
  password: string;
  password_confirmation: string;
  posPaidPlanId: string;
  active: boolean;
  balanceCredits: number;
  consumptionPlan: number;
}

export type TFindCustomerRequest = {
  name?: {
    contains?: string;
  };
  active?: boolean;
};

export type ICustomer = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  cpf: string;
  cnpj: string;
  companyName: string;
  password: string;
  active: boolean;
  planPayment: string;
  balanceCredits?: number;
  consumptionPlan?: number;
  posPaidPlanId: string;
  created_at: string;
  updated_at: string;
};

export const findCustomers = (
  params: FetchListRequest<TFindCustomerRequest>
) => {
  return api.get<FetchListResponse<ICustomer>>("customer", { params });
};

export const findCustomerById = (id: string) => {
  return api.get<User>(`customer/${id}`);
};

export const createCustomer = (data: Partial<ICreateAccountUser>) => {
  return api.post<User>(`customer`, data);
};

export const updateCustomer = (
  id: string,
  data: Partial<ICreateAccountUser>
) => {
  return api.patch<User>(`customer/${id}`, data);
};

export const deleteCustomer = (id: string) => {
  return api.delete<User>(`customer/${id}`);
};
