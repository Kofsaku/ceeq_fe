import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useHttpClient, {
  API_SERVICES_NAME,
  ApiResponse,
} from "@/hooks/use-http-client";

export const useSequenceCondition = (): UseQueryResult<any, Error> => {
  const { get } = useHttpClient(API_SERVICES_NAME.PUBLIC);
  return useQuery({
    queryKey: ["sequence-conditions"],
    queryFn: (): Promise<ApiResponse<any>> => get<any>(`/sequence-conditions`),
    select: (response) => response.data.data,
  });
};
