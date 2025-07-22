import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useHttpClient, {
  API_SERVICES_NAME,
  ApiResponse,
} from "@/hooks/use-http-client";

export const useGetListHostUser = (
  params: Record<string, any>
): UseQueryResult<any, Error> => {
  const { get } = useHttpClient(API_SERVICES_NAME.WEB);
  return useQuery({
    queryKey: ["host-user-list"],
    queryFn: (): Promise<ApiResponse<any>> =>
      get<any>(`/meeting-host`, { params }),
    select: (response) => response.data.data,
  });
};
