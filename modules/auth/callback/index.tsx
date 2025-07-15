"use client";
import { CeeqLayout } from "@/components/layout";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { ECookieKeys } from "@/const/cookie-keys.const";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";

export function Callback() {
  const router = useRouter();
  const queries = useSearchParams();

  const token = queries.get("token");

  useEffect(() => {
    if (token) {
      Cookies.set(ECookieKeys.TOKEN, token);
      router.push("/");
    }
  }, [token]);

  return (
    <div>
      <Loading />
    </div>
  );
}
Callback.layout = CeeqLayout.BLANK;
