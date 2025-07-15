// hooks/use-unread-message-by-platform.ts
import { useQuery } from "@tanstack/react-query";
import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";

export interface UnreadSummary {
  all: number;
  unread: number;
  mention: number;
}

export interface PlatformUnreadCounts {
  gmail: number;
  outlook: number;
  line: number;
  sms: number;
  messenger: number;
  instagram: number;
  twitter: number;
  google: number;
  [key: string]: number; // phòng trường hợp có thêm platform mới
}

export interface UnreadByPlatformResponse {
  success: boolean;
  message: string;
  data: {
    summary: UnreadSummary;
    platform_unread_counts: PlatformUnreadCounts;
    total_unread_count: number;
    user_email: string;
    timestamp: string;
  };
}

const API_URL = "/sns/message-management/unread-by-platform";

export const useUnreadMessageByPlatform = () => {
  const { get } = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useQuery<UnreadByPlatformResponse>({
    queryKey: ["unread-message-by-platform"],
    queryFn: async (): Promise<UnreadByPlatformResponse> => {
      const response = await get<UnreadByPlatformResponse>(API_URL);
      return response.data;
    },
    staleTime: 60 * 1000, // 1 phút
  });
};
