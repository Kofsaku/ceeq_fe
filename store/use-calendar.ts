import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export enum MeetType {
  ONE_TO_ONE = "0",
  GROUP = "1",
}

export interface ICalendarStore {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  meetType: MeetType | null;
  setMeetType: (value: MeetType | null) => void;
  activeKey: string;
  setActiveKey: (value: string) => void;
}

export const useCalendarStore = create<ICalendarStore>()(
  persist(
    (set) => ({
      isModalOpen: false,
      setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
      meetType: null,
      setMeetType: (value: MeetType | null) => set({ meetType: value }),
      activeKey: "1",
      setActiveKey: (value: string) => set({ activeKey: value }),
    }),
    {
      name: "calendar-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isModalOpen: state.isModalOpen,
        meetType: state.meetType,
        activeKey: state.activeKey,
      }),
    }
  )
);
