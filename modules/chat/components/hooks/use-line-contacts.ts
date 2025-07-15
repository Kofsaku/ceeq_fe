// hooks/use-chat-contacts.ts
import { useQuery } from "@tanstack/react-query";
import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { ChatContactResponse } from "../../types";

const API_URL = "/sns/message-management/get-chat-contacts";

export interface ChatContactParams {
  platform: string;
  limit?: number;
  unread_only?: boolean;
}

export const useChatContacts = (params: ChatContactParams) => {
  const { get } = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useQuery({
    queryKey: ["chat-contacts", params],
    queryFn: async (): Promise<ChatContactResponse> => {
      const response = await get<ChatContactResponse>(API_URL, { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!params.platform,
  });
};
