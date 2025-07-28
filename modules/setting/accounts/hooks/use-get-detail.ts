import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useHttpClient, {
  API_SERVICES_NAME,
  ApiResponse,
} from "@/hooks/use-http-client";

export interface IResponse {
  id?: number;
  first_name?: string;
  last_name?: string;
  first_name_kana?: string | null;
  last_name_kana?: string | null;
  full_name?: string;
  full_name_kana?: string | null;
  email?: string;
  role?: {
    id?: number;
    name?: string;
    display_name?: string;
  };
  user_create_id?: number | null;
  created_at?: string;
  updated_at?: string;
}

export const useGetDetailAccount = (
  id: number
): UseQueryResult<IResponse, Error> => {
  const { get } = useHttpClient(API_SERVICES_NAME.PUBLIC);
  return useQuery({
    queryKey: ["account-detail", { id }],
    queryFn: (): Promise<ApiResponse<any>> => get<any>(`/accounts/${id}`),
    select: (response) => response.data.data,
    enabled: !!id,
  });
};
