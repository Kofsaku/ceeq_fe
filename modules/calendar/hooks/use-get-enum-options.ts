import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useHttpClient, {
  API_SERVICES_NAME,
  ApiResponse,
} from "@/hooks/use-http-client";

export const useGetEnumOptions = (): UseQueryResult<any, Error> => {
  const { get } = useHttpClient(API_SERVICES_NAME.PUBLIC);
  return useQuery({
    queryKey: ["enum-options"],
    queryFn: (): Promise<ApiResponse<any>> =>
      get<any>(`/schedules/enum-options`),
    select: (response) => response.data.data,
  });
};
