// hooks/use-recent-messages.ts
import { useQuery } from "@tanstack/react-query";
import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";

export interface SenderReceiver {
  user_id: number;
  email: string;
  name: string;
  is_target_user: boolean;
}

export interface ConversationMessage {
  id: number;
  external_message_id: string;
  content: string;
  message_type: "sent" | "received";
  content_type: "text" | string;
  status: string;
  platform: string;
  sent_at: string;
  read_at: string | null;
  sender: SenderReceiver;
  receiver: SenderReceiver;
  platform_data: any;
  unread_count: number;
}

export interface RecentMessagesResponse {
  success: boolean;
  message: string;
  data: {
    conversations: ConversationMessage[];
    count: number;
    target_user: {
      id: number;
      email: string;
      name: string;
    };
    platform: string;
  };
}

const API_URL = "/sns/recent-messages";

interface UseRecentMessagesParams {
  platform: string;
  target_user_id: number;
}

export const useRecentMessages = (params: UseRecentMessagesParams) => {
  const { get } = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useQuery({
    queryKey: ["recent-messages", params],
    queryFn: async (): Promise<RecentMessagesResponse> => {
      const response = await get<RecentMessagesResponse>(API_URL, { params });
      return response.data;
    },
    enabled: !!params.platform && !!params.target_user_id,
  });
};
