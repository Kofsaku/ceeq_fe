"use client";

import { ECookieKeys } from "@/const/cookie-keys.const";
import { API_ADMIN, API_CLIENT, API_PUBLIC } from "@/const/env.const";
import { HTTP_METHODS } from "@/types/http.type";
import Cookies from "js-cookie";

export interface HttpError {
  status: number;
  statusText: string;
  data?: any;
}

export interface ApiResponse<T> {
  status: number;
  statusText: string;
  data?: T;
}

export interface ErrorData extends Error {
  status: number;
  statusText: string;
  data: {
    statusCode: number;
    message: string;
    error: string;
    errorMessage?: string;
  };
}

export enum API_SERVICES_NAME {
  ADMIN = "admin",
  WEB = "web",
  PUBLIC = "public",
}

const API_SERVICES_ENDPOINT = {
  [API_SERVICES_NAME.ADMIN]: API_ADMIN,
  [API_SERVICES_NAME.WEB]: API_CLIENT,
  [API_SERVICES_NAME.PUBLIC]: API_PUBLIC,
};

const useHttpClient = (service?: API_SERVICES_NAME) => {
  const getEndpoint = () => {
    if (service && API_SERVICES_ENDPOINT[service]) {
      return API_SERVICES_ENDPOINT[service];
    }

    return API_SERVICES_ENDPOINT[API_SERVICES_NAME.WEB];
  };

  const request = async <T>(
    input: string,
    options?: {
      params?: Record<string, any>;
      body?: Record<string, any>;
      method?: HTTP_METHODS;
      headers?: Record<string, any>;
      isFormData?: boolean;
    }
  ) => {
    const tokenAdmin = Cookies.get(ECookieKeys.TOKEN_ADMIN);
    const token = Cookies.get(ECookieKeys.TOKEN);
    const getAccessToken = () => {
      if (service && service === API_SERVICES_NAME.ADMIN) {
        return tokenAdmin;
      }

      return token;
    };
    const accessToken = getAccessToken();
    const headers = {
      ...(!options?.isFormData && {
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      ...(options?.headers ?? {}),
    };

    const { params, body, method = HTTP_METHODS.GET } = options || {};
    const paramsQueries = params
      ? "?" +
        Object.entries(params)
          .flatMap(([key, value]) => {
            if (value == null) return [];
            return Array.isArray(value)
              ? value.map((v) => `${key}=${encodeURIComponent(v)}`)
              : `${key}=${encodeURIComponent(value)}`;
          })
          .join("&")
      : "";

    const response = await fetch(`${getEndpoint()}${input}${paramsQueries}`, {
      method,
      headers,
      body: options?.isFormData
        ? (body as FormData)
        : body
          ? JSON.stringify(body)
          : undefined,
    });

    const { status, statusText } = response;
    const data = await response.json();

    if (status === 401) {
      //to do
      // await signOut({ redirect: false });
      // return router.push(AUTH_ROUTES.LOGIN);
    }

    if (!response.ok) {
      throw { status, statusText, data } as HttpError;
    }

    return { status, statusText, data } as ApiResponse<T>;
  };

  const requestGetFile = async (
    input: string,
    options?: { params?: Record<string, any>; headers?: Record<string, any> }
  ) => {
    const tokenAdmin = Cookies.get(ECookieKeys.TOKEN_ADMIN);
    const token = Cookies.get(ECookieKeys.TOKEN);
    const getAccessToken = () => {
      if (service && service === API_SERVICES_NAME.ADMIN) {
        return tokenAdmin;
      }

      return token;
    };
    const accessToken = getAccessToken();
    const headers = {
      Accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      ...(options?.headers ?? {}),
    };

    const paramsQueries = options?.params
      ? `?${new URLSearchParams(options.params)}`
      : "";
    const response = await fetch(`${getEndpoint()}${input}${paramsQueries}`, {
      method: HTTP_METHODS.GET,
      headers,
    });

    const { status, statusText } = response;
    const blob = await response.blob();
    if (status === 401) {
      //to do
      // await signOut({ redirect: false });
      // return router.push(AUTH_ROUTES.LOGIN);
    }

    if (!response.ok) {
      throw { status, statusText, blob } as HttpError;
    }

    return blob;
  };

  return {
    request,
    get: async <T>(
      input: string,
      options?: {
        params?: Record<string, any>;
        headers?: Record<string, any>;
      }
    ) => request<T>(input, { ...options, method: HTTP_METHODS.GET }),
    post: async <T>(
      input: string,
      options?: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        headers?: Record<string, string>;
        isFormData?: boolean;
      }
    ) => request<T>(input, { ...options, method: HTTP_METHODS.POST }),
    put: async <T>(
      input: string,
      options?: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        headers?: Record<string, string>;
        isFormData?: boolean;
      }
    ) => request<T>(input, { ...options, method: HTTP_METHODS.PUT }),
    delete: async <T>(
      input: string,
      options?: {
        params?: Record<string, any>;
        body?: Record<string, any>;
        headers?: Record<string, string>;
      }
    ) => request<T>(input, { ...options, method: HTTP_METHODS.DELETE }),
    requestGetFile,
  };
};

export default useHttpClient;
