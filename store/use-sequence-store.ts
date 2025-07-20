import { Action } from "@/modules/sequence/type";
import { create } from "zustand";
import { MSG_ITEM } from "@/modules/sequence/type";
interface IMessageSample {
  id: string;
  title: string;
  content: string;
  date?: string;
}

export interface ISequenceStep {
  title: string;
  content: string;
  children?: ISequenceStep[];
  id?: string;
  parentId?: string;
  isMsg?: boolean;
  msgType?: MSG_ITEM[];
  isHalfWidth?: boolean;
  isRoot?: boolean;
}

export interface ISequenceStore {
  dataSteps: ISequenceStep[];
  setDataSteps: (data: ISequenceStep[]) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  action: Action | null;
  setAction: (value: Action) => void;
  isOpenDrawer: boolean;
  setIsOpenDrawer: (value: boolean) => void;
  messageSample: IMessageSample[];
  setMessageSample: (value: IMessageSample[]) => void;
  msgItem: MSG_ITEM[] | null;
  setMsgItem: (value: MSG_ITEM[]) => void;
  msgTemplate: IMessageSample | null;
  setMsgTemplate: (value: IMessageSample | null) => void;
  actionIndex: string | null;
  setActionIndex: (value: string | null) => void;
  stepStatus?: "init" | "sns-selection" | "msg";
  setStepStatus: (value: "init" | "sns-selection" | "msg") => void;
  isDisabledTab: {
    step: boolean;
    setting: boolean;
  };
  setIsDisabledTab: (value: { step: boolean; setting: boolean }) => void;
  activeKey: string;
  setActiveKey: (value: string) => void;
  settingInput: any;
  setSettingInput: (value: any) => void;
}

export const useSequenceStore = create<ISequenceStore>((set) => ({
  dataSteps: [],
  setDataSteps: (data: ISequenceStep[]) => set({ dataSteps: data }),
  isModalOpen: false,
  setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
  action: null,
  setAction: (value: Action) => set({ action: value }),
  isOpenDrawer: false,
  setIsOpenDrawer: (value: boolean) => set({ isOpenDrawer: value }),
  messageSample: [
    {
      id: "11",
      title: "ステップ1",
      content:
        "テンプレタイトルテンプレタイトルテンプレタイトルテンプレタイトルテンプレタイトルテンプレタイトル",
      date: "2025-07-01",
    },
    {
      id: "12",
      title: "ステップ2",
      content:
        "テンプレタイトルテンプレタイトルテンプレタイトルテンプレタイトルテンプレタイトルテンプレタイトル",
      date: "2025-07-01",
    },
  ],
  setMessageSample: (value: IMessageSample[]) => set({ messageSample: value }),
  msgItem: [],
  setMsgItem: (value: MSG_ITEM[]) => set({ msgItem: value }),
  msgTemplate: null,
  setMsgTemplate: (value: IMessageSample | null) => set({ msgTemplate: value }),
  actionIndex: null,
  setActionIndex: (value: string | null) => set({ actionIndex: value }),
  stepStatus: "init",
  setStepStatus: (value: "init" | "sns-selection" | "msg") =>
    set({ stepStatus: value }),
  isDisabledTab: {
    step: true,
    setting: false,
  },
  setIsDisabledTab: (value: { step: boolean; setting: boolean }) =>
    set({ isDisabledTab: value }),
  activeKey: "2",
  setActiveKey: (value: string) => set({ activeKey: value }),
  settingInput: null,
  setSettingInput: (value: any) => set({ settingInput: value }),
}));
