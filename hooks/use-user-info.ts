import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { User, UserResponse } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useUserInfo = () => {
  const { get } = useHttpClient(API_SERVICES_NAME.WEB);

  const queryResult = useQuery({
    queryKey: ["user-info"],
    queryFn: async (): Promise<User> => {
      const res = await get<UserResponse>("/profile");
      return res.data.data;
    },
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });

  return queryResult;
};
