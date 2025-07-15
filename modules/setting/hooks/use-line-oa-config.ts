import { useMutation, useQueryClient } from "@tanstack/react-query";
import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";

interface LineOAConfigPayload {
  channel_id: string;
  oa_name: string;
  channel_access_token: string;
}

export const useLineOAConfig = (
  onSuccess?: () => void,
  onError?: (error: any) => void
) => {
  const queryClient = useQueryClient();
  const { post } = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useMutation({
    mutationFn: (payload: LineOAConfigPayload) =>
      post("/sns/line/oa/config", { body: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["external-accounts"] });
      onSuccess?.();
    },
    onError,
  });
};
