// hooks/use-mark-messages-as-read.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { HTTP_METHODS } from "@/types/http.type";

type MarkAsReadPayload = {
  target_user_id: number;
};

export const useMarkMessagesAsRead = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const httpClient = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useMutation({
    mutationFn: (payload: MarkAsReadPayload) =>
      httpClient.request("/sns/messages/mark-as-read", {
        method: HTTP_METHODS.PATCH,
        body: payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["unread-message-by-platform"],
      });
      if (onSuccess) onSuccess();
    },
  });
};
