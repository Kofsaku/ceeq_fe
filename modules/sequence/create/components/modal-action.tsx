import { Modal } from "antd";
import React from "react";
import { useSequenceStore } from "@/store/use-sequence-store";
import SvgIcon from "@/components/svg-icon";
import { Action } from "../../type";
import { twMerge } from "tailwind-merge";
import styles from "./style.module.scss";

const ActionItem = ({
  icon,
  title,
  action,
}: {
  icon: string;
  title: string;
  action: Action;
}) => {
  const {
    setAction,
    setIsModalOpen,
    setIsOpenDrawer,
    stepStatus,
    setStepStatus,
  } = useSequenceStore();
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center gap-y-2 border border-[#B3B3B3] rounded-[4px] p-2 w-1/4 hover:bg-[#1A1A1A] hover:text-white cursor-pointer",
        styles.actionItem
      )}
      onClick={() => {
        setAction(action);
        if (action === Action.MESSAGE) {
          setStepStatus("sns-selection");
        }
        if (
          [Action.BRANCH, Action.TASK].includes(action) &&
          stepStatus === "msg"
        ) {
          setIsOpenDrawer(true);
        }
        setIsModalOpen(false);
      }}
    >
      <SvgIcon path={icon} className={styles.icon} />
      <h2 className="!font-bold !mb-0">{title}</h2>
    </div>
  );
};

const dataItems = [
  { icon: "/delay.svg", title: "遅延", action: Action.DELAY },
  { icon: "/tree.svg", title: "分岐", action: Action.BRANCH },
  { icon: "/mail.svg", title: "メッセージ", action: Action.MESSAGE },
  { icon: "/task.svg", title: "タスク", action: Action.TASK },
];

function ModalAction() {
  const { isModalOpen, setIsModalOpen } = useSequenceStore();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <h2 className="text-center mb-4 text-[18px]">アクションを選択</h2>
      <div className="flex justify-between gap-x-4">
        {dataItems.map((item) => (
          <ActionItem
            key={item.action}
            icon={item.icon}
            title={item.title}
            action={item.action}
          />
        ))}
      </div>
    </Modal>
  );
}

export default ModalAction;
