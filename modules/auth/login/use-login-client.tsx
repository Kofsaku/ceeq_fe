import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation } from "@tanstack/react-query";

export interface LoginInput {
  email: string;
  password: string;
}

export const useLoginClient = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const { post } = useHttpClient(API_SERVICES_NAME.WEB);

  return useMutation({
    mutationFn: (input: LoginInput) => post("/login", { body: input }),
    onSuccess: (data: any) => onSuccess(data?.data?.data),
    onError: (error: any) => onError(error),
  });
};
