import axios, { AxiosError, AxiosResponse } from "axios";
import { authRequest } from "./interceptors/authorizationRequest";
import { unauthorizedResponse } from "./interceptors/unauthorizedResponse";
import { errorResponse } from "./interceptors/errorResponse";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST,
});

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

api.interceptors.request.use(authRequest, onRequestError);
api.interceptors.response.use(onResponse, unauthorizedResponse);
api.interceptors.response.use(onResponse, errorResponse);

export { api };
