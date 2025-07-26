import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useHttpClient, {
  API_SERVICES_NAME,
  ApiResponse,
} from "@/hooks/use-http-client";

export const useGetFilterOptions = (): UseQueryResult<any, Error> => {
  const { get } = useHttpClient(API_SERVICES_NAME.PUBLIC);
  return useQuery({
    queryKey: ["filter-options"],
    queryFn: (): Promise<ApiResponse<any>> =>
      get<any>(`/accounts/get-filter-options`),
    select: (response) => response.data.data,
  });
};
