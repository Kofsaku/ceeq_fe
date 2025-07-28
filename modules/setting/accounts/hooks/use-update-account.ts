import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation } from "@tanstack/react-query";

interface UpdateAccountInput {
  id?: number;
  first_name?: string;
  last_name?: string;
  first_name_kana?: string;
  last_name_kana?: string;
  email?: string;
  password?: string;
  role_id?: number;
}

export const useUpdateAccount = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const { put } = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useMutation({
    mutationFn: (input: UpdateAccountInput) => {
      const { id, ...rest } = input;
      return put(`/accounts/${id}`, { body: rest });
    },
    onSuccess: (data: any) => onSuccess(data?.data),
    onError: (error: any) => onError(error),
  });
};
