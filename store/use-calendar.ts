import { create } from "zustand";

export enum MeetType {
  ONE_TO_ONE = "1",
  GROUP = "2",
}

export interface ICalendarStore {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  meetType: MeetType | null;
  setMeetType: (value: MeetType | null) => void;
  activeKey: string;
  setActiveKey: (value: string) => void;
}

export const useCalendarStore = create<ICalendarStore>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
  meetType: null,
  setMeetType: (value: MeetType | null) => set({ meetType: value }),
  activeKey: "1",
  setActiveKey: (value: string) => set({ activeKey: value }),
}));
