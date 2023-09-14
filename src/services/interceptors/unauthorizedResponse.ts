import { AxiosError } from "axios";

export const unauthorizedResponse = (
  error: AxiosError
): Promise<AxiosError> => {
  const status = error.response ? error.response.status : null;

  if (status === 401 && !window.location.pathname.includes("auth")) {
    window.location.href = "auth";
    localStorage.clear();
  }

  return Promise.reject(error);
};
