import { useAccessToken } from "@hooks/useAccessToken";
import { AxiosHeaders, AxiosRequestConfig } from "axios";

export interface InternalAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosHeaders;
}

export const authRequest = (config: InternalAxiosRequestConfig) => {
  const tokens = useAccessToken.getAccessToken();
  if (!config.headers) {
    config.headers = {} as AxiosHeaders;
  }
  if (tokens) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
};
