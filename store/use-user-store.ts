import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user";

type UserStore = {
  userInfo: User | null;
  setUserInfo: (user: User) => void;
  clearUserInfo: () => void;
  _hasHydrated: boolean;
  setHasHydrated: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user) => set({ userInfo: user }),
      clearUserInfo: () => set({ userInfo: null }),
      _hasHydrated: false,
      setHasHydrated: () => set({ _hasHydrated: true }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ userInfo: state.userInfo }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    }
  )
);
