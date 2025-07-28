import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation } from "@tanstack/react-query";

interface CreateAccountInput {
  first_name?: string;
  last_name?: string;
  first_name_kana?: string;
  last_name_kana?: string;
  email?: string;
  password?: string;
  role_id?: number;
}

export const useCreateAccount = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const { post } = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useMutation({
    mutationFn: (input: CreateAccountInput) => {
      return post("/accounts", { body: input });
    },
    onSuccess: (data: any) => onSuccess(data?.data),
    onError: (error: any) => onError(error),
  });
};
