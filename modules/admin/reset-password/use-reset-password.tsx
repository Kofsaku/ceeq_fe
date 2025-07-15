import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation } from "@tanstack/react-query";

export interface ResetPasswordInput {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useResetPassword = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const { post } = useHttpClient(API_SERVICES_NAME.ADMIN);

  return useMutation({
    mutationFn: (input: ResetPasswordInput) =>
      post("/reset-password", { body: input }),
    onSuccess: (data: any) => onSuccess(data?.data),
    onError: (error: any) => onError(error),
  });
};
