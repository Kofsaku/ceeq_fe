import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation } from "@tanstack/react-query";

export interface VerifyOtpInput {
  email: string;
  verification_code: string;
}

export const useVerifyOtpClient = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const { post } = useHttpClient(API_SERVICES_NAME.WEB);

  return useMutation({
    mutationFn: (input: VerifyOtpInput) =>
      post("/email/verify", { body: input }),
    onSuccess: (data: any) => onSuccess(data?.data),
    onError: (error: any) => onError(error),
  });
};
