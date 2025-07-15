import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation } from "@tanstack/react-query";

export interface RegisterInput {
  email: string;
  password: string;
  password_confirmation: string;
}

export const useRegisterClient = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const { post } = useHttpClient(API_SERVICES_NAME.WEB);

  return useMutation({
    mutationFn: (input: RegisterInput) => post("/register", { body: input }),
    onSuccess: (data: any) => onSuccess(data?.data),
    onError: (error: any) => onError(error),
  });
};
