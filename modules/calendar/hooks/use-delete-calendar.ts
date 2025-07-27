import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCalendar = (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const httpClient = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useMutation({
    mutationFn: async (scheduleId: number): Promise<any> => {
      const response = await httpClient.delete<any>(`/schedules/${scheduleId}`);
      return response.data;
    },
    onSuccess: (data: any) => {
      onSuccess?.(data);
    },
    onError: (error: any) => {
      onError?.(error);
    },
  });
};
