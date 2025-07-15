// hooks/use-send-line-message.ts
import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface SendLineMessagePayload {
  to: string;
  subject: string;
  message: string;
  message_type: "text" | "image" | "sticker"; // hoặc thêm các loại khác nếu có
}

export interface SendLineMessageResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useSendLineMessage = (
  onSuccess?: (res: any) => void,
  onError?: (error: any) => void
) => {
  const { post } = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useMutation({
    mutationFn: (payload: SendLineMessagePayload) =>
      post("/sns/line/oa/send-message", { body: payload }),
    onSuccess: (res) => {
      if (onSuccess) onSuccess(res);
    },
    onError: (error) => {
      if (onError) onError(error);
    },
  });
};
