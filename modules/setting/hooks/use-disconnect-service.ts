import { useMutation, useQueryClient } from "@tanstack/react-query";
import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { Service } from "../type";
import { HTTP_METHODS } from "@/types/http.type";

export const useDisconnectService = (
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  const queryClient = useQueryClient();
  const httpClient = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useMutation({
    mutationFn: async (service: Service) => {
      return httpClient.request(`/sns/external-accounts/${service.id}`, {
        method: HTTP_METHODS.DELETE,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["external-accounts"] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error as Error);
    },
  });
};
