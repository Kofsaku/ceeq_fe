import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { EnumOptionsKey } from "../modules/calendar/type";

export enum MeetType {
  ONE_TO_ONE = 0,
  GROUP = 1,
}

export interface ICalendarStore {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  meetType: number;
  setMeetType: (value: MeetType | null) => void;
  activeKey: string;
  setActiveKey: (value: string) => void;
  enumOptions: EnumOptionsKey;
  setEnumOptions: (value: EnumOptionsKey) => void;
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
      enumOptions: {} as EnumOptionsKey,
      setEnumOptions: (value: EnumOptionsKey) => set({ enumOptions: value }),
    }),
    {
      name: "calendar-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isModalOpen: state.isModalOpen,
        meetType: state.meetType,
        activeKey: state.activeKey,
        enumOptions: state.enumOptions,
      }),
    }
  )
);
