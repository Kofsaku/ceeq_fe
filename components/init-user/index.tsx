import { useEffect } from "react";
import { useUserStore } from "@/store/use-user-store";
import { useUserInfo } from "@/hooks/use-user-info";

export const InitUser = () => {
  const hasHydrated = useUserStore((s) => s._hasHydrated);
  const userInfo = useUserStore((s) => s.userInfo);
  const setUserInfo = useUserStore((s) => s.setUserInfo);
  const { refetch } = useUserInfo();

  useEffect(() => {
    if (!hasHydrated) return;

    if (!userInfo) {
      refetch().then((res) => {
        if (res.data) {
          setUserInfo(res.data);
        }
      });
    }
  }, [hasHydrated, userInfo]);

  return null;
};
