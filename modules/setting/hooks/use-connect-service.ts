import { useMutation } from "@tanstack/react-query";
import { ProviderName, Service } from "../type";
import { BASE_API, CALLBACK_URL } from "@/const/env.const";

const CALLBACK_URL_SUCCESS = `${CALLBACK_URL}/setting`;
const CALLBACK_URL_ERROR = `${CALLBACK_URL}/setting`;
const LIST_AUTH_PROVIDERS = [
  ProviderName.LINE,
  ProviderName.GMAIL,
  ProviderName.GMAIL_OA,
];

const generateRedirectUrl = (service: Service, userId?: number): string => {
  const { provider } = service;

  if (!Object.values(ProviderName).includes(provider)) {
    throw new Error(`Provider ${service.name} not supported`);
  }

  const query = new URLSearchParams({
    callbackUrl: CALLBACK_URL_SUCCESS,
    callbackUrlErr: CALLBACK_URL_ERROR,
  });

  if (userId) query.append("user_id", String(userId));

  const isOAuth = provider.endsWith("_oa");
  const cleanProvider = isOAuth ? provider.replace("_oa", "") : provider;
  const providerQuery = isOAuth ? `provider=${provider}&` : "";
  const basePath = LIST_AUTH_PROVIDERS.includes(provider)
    ? `${BASE_API}/auth/sns/${service.provider}/redirect`
    : provider === ProviderName.LINE_OA
    ? (() => {
        throw new Error(`Provider ${service.name} not supported`);
      })()
    : `${BASE_API}/api/user/${cleanProvider}/redirect`;

  return `${basePath}?${providerQuery}${query.toString()}`;
};

export const useConnectService = (
  userId?: number,
  onSuccess?: () => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: async (service: Service) => {
      if (!userId) {
        throw new Error("Missing userId");
      }
      const redirectUrl = generateRedirectUrl(service, userId);
      sessionStorage.setItem("connecting_service", JSON.stringify(service));
      window.location.href = redirectUrl;
      return { success: true };
    },
    onSuccess: () => onSuccess?.(),
    onError: (error) => onError?.(error as Error),
  });
};
