import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation } from "@tanstack/react-query";

export interface ResendOtpInput {
  email: string;
}

export const useResendOtpClient = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const { post } = useHttpClient(API_SERVICES_NAME.WEB);

  return useMutation({
    mutationFn: (input: ResendOtpInput) =>
      post("/email/resend", { body: input }),
    onSuccess: (data: any) => onSuccess(data?.data?.data),
    onError: (error: any) => onError(error),
  });
};
