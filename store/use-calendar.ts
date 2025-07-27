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
  isModalOpenClone: boolean;
  setIsModalOpenClone: (value: boolean) => void;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (value: React.Key[]) => void;
  groupMembers: {
    id: number;
    label: string;
    value: number;
    role_id: number;
  }[];
  setGroupMembers: (
    value: {
      id: number;
      label: string;
      value: number;
      role_id: number;
    }[]
  ) => void;
  accounts: {
    id: number;
    label: string;
    value: number;
    role_id: number;
  }[];
  setAccounts: (
    value: {
      id: number;
      label: string;
      value: number;
      role_id: number;
    }[]
  ) => void;
  isModalOpenAddMember: boolean;
  setIsModalOpenAddMember: (value: boolean) => void;
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
      isModalOpenClone: false,
      setIsModalOpenClone: (value: boolean) => set({ isModalOpenClone: value }),
      selectedRowKeys: [],
      setSelectedRowKeys: (value: React.Key[]) =>
        set({ selectedRowKeys: value }),
      groupMembers: [],
      setGroupMembers: (
        value: {
          id: number;
          label: string;
          value: number;
          role_id: number;
        }[]
      ) => set({ groupMembers: value }),
      accounts: [],
      setAccounts: (
        value: {
          id: number;
          label: string;
          value: number;
          role_id: number;
        }[]
      ) => set({ accounts: value }),
      isModalOpenAddMember: false,
      setIsModalOpenAddMember: (value: boolean) =>
        set({ isModalOpenAddMember: value }),
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
