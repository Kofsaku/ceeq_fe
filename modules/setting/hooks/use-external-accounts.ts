import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useQuery } from "@tanstack/react-query";
import { ExternalAccountsResponse, ExternalAccount } from "../type";

export const useExternalAccounts = () => {
  const { get } = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useQuery({
    queryKey: ["external-accounts"],
    queryFn: async (): Promise<Record<string, ExternalAccount[]>> => {
      const res = await get<ExternalAccountsResponse>("/sns/external-accounts");
      return res.data.data;
    },
  });
};
