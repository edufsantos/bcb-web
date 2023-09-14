import { FetchListRequest, FetchListResponse } from "@interfaces/api";
import { Plan } from "@interfaces/models/plan";
import { api } from "@services/api";

export interface ICreatePlan {
  title: string;
  description: string;
  price: number;
  balanceCredits: number;
  active: boolean;
  isMostPopular?: boolean;
}

export type FindPlansRequest = {
  title?: {
    contains?: string;
  };
  active?: boolean;
};

export type IConnectToCustomer = {
  posPaidPlanId: string;
};

export const findPlans = (params: FetchListRequest<FindPlansRequest>) => {
  return api.get<FetchListResponse<Plan>>("pos-paid-plan", {
    params,
  });
};

export const findPlanById = (id: string) => {
  return api.get<Plan>(`pos-paid-plan/${id}`);
};

export const createPlan = (args: ICreatePlan) => {
  return api.post<Plan>("pos-paid-plan", args);
};

export const updatePlan = (id: string, args: ICreatePlan) => {
  return api.patch<Plan>(`pos-paid-plan/${id}`, args);
};

export const deletePlan = (id: string) => {
  return api.delete(`pos-paid-plan/${id}`);
};

export const connectPlanToCustomer = (data: IConnectToCustomer) => {
  return api.post(`pos-paid-plan/connect-to-customer`, data);
};

export const disconnectPlanToCustomer = () => {
  return api.delete(`pos-paid-plan`);
};
