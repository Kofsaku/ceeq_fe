import CeeqButton from "@/components/button";
import React, { useMemo } from "react";
import SvgIcon from "@/components/svg-icon";
import { useCalendarStore } from "@/store/use-calendar";
import { MeetType } from "@/store/use-calendar";

function ActionBar({
  onSubmit,
  onCancel,
}: {
  onSubmit?: () => void;
  onCancel?: () => void;
}) {
  const { activeKey, setActiveKey, meetType } = useCalendarStore();
  const isLastStep = useMemo(() => {
    if (meetType === MeetType.ONE_TO_ONE) {
      return activeKey === "3";
    }
    return activeKey === "4";
  }, [activeKey, meetType]);
  const onPrev = () => {
    if (activeKey === "1") {
      return;
    }
    setActiveKey(`${+activeKey - 1}`);
  };
  const onNext = () => {
    setActiveKey(`${+activeKey + 1}`);
  };
  return (
    <div
      className="w-full bg-white p-[24px] fixed bottom-0 flex items-center gap-x-2"
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      {activeKey !== "1" && (
        <CeeqButton
          title="次へ"
          icon={<SvgIcon path="/icons/keyboard_arrow_left.svg" />}
          onClick={onPrev}
          className="!px-8 !py-4 !bg-transparent !border-gray-900 !text-gray-900 !font-medium"
        />
      )}
      {isLastStep ? (
        <CeeqButton
          title="決定"
          icon={<SvgIcon path="/icons/check.svg" />}
          onClick={onSubmit}
          className="!px-8 !py-4"
        />
      ) : (
        <CeeqButton
          title="次へ"
          icon={<SvgIcon path="/icons/circle-right.svg" />}
          onClick={onNext}
          className="!px-8 !py-4"
        />
      )}
      <CeeqButton
        title="キャンセル"
        isOutlined
        className="!bg-transparent !border-none !underline"
        onClick={onCancel}
      />
    </div>
  );
}

export default ActionBar;
