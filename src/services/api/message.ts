import { FetchListRequest, FetchListResponse } from "@interfaces/api";
import { Message } from "@interfaces/models/messages";
import { api } from "@services/api";

export type FindMessageRequest = {
  phoneNumber?: {
    contains?: string;
  };
};

export type SendMessageArgs = {
  isWhatsApp: boolean;
  text: string;
  phoneNumbers: string[];
};

export const findMessages = (params: FetchListRequest<FindMessageRequest>) => {
  return api.get<FetchListResponse<Message>>("/messages", { params });
};

export const sendMessage = (body: SendMessageArgs) => {
  return api.post<null>("/messages/send", body);
};
