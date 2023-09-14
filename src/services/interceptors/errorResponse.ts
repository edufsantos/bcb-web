import ApiError from "@hooks/errorReponse";
import { AxiosError } from "axios";

export interface IErrorData {
  statusCode: number;
  code: string;
  path: string;
}

const errors: Record<string, string> = {
  UndefinedError: "Houve um erro ao realizar a consulta",
  AccountNotFound: "Não localizamos nenhum registro com os dados informados",
  UserDontHaveLimitToSendMessage:
    "Voçê está sem saldo para enviar mensagens, por favor verifique seu saldo!",
  LimitOfThePlanReached:
    "Seu bônus para envio de mensagens acabou, por favor verifique seu plano!",
  YourAccountIsNotActive:
    "Sua conta está inativa, por favor entre em contato para ativar sua conta",
};

export const errorResponse = ({
  response,
}: AxiosError<IErrorData>): Promise<ApiError> => {
  const data = response?.data;
  const error = new ApiError(errors[data?.code ?? "UndefinedError"], data);
  return Promise.reject(error);
};
