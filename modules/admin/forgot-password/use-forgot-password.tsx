import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation } from "@tanstack/react-query";

export interface ForgotPasswordInput {
  email: string;
}

export const useForgotPassword = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const { post } = useHttpClient(API_SERVICES_NAME.ADMIN);

  return useMutation({
    mutationFn: (input: ForgotPasswordInput) =>
      post("/forgot-password", { body: input }),
    onSuccess: (data: any) => onSuccess(data?.data?.data),
    onError: (error: any) => onError(error),
  });
};
