import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useHttpClient, {
  API_SERVICES_NAME,
  ApiResponse,
} from "@/hooks/use-http-client";

export const useGetListSequences = (
  params: Record<string, any>
): UseQueryResult<any, Error> => {
  const { get } = useHttpClient(API_SERVICES_NAME.PUBLIC);
  return useQuery({
    queryKey: ["sequence-list"],
    queryFn: (): Promise<ApiResponse<any>> =>
      get<any>(`/sequences`, { params }),
    select: (response) => response.data.data,
  });
};
