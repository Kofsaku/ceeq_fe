import React from "react";
import CeeqButton from "@/components/button";
import { DownOutlined } from "@ant-design/icons";
import { ISequenceStepProps } from "../step";
import { twMerge } from "tailwind-merge";

function MsgStep(props: ISequenceStepProps) {
  const { step } = props;
  return (
    <div
      className={twMerge(
        "border border-[#666666] rounded-[20px] p-8 w-[calc(50vw-200px)]"
        // step?.isRoot && "w-1/2"
      )}
    >
      {step.isMsg && (
        <>
          <h1 className="text-base font-bold">1・メッセージの送付</h1>
          <p className="text-sm font-bold">
            送付方法: {step.msgType.toString()}
          </p>
        </>
      )}
      <h2 className="text-base font-bold mt-[24px]">{step.title}</h2>
      <p className="text-sm">本文: {step.content}</p>
      <div className="flex justify-center mt-[24px]">
        <CeeqButton
          title="さらに表示"
          loading={false}
          className="!px-6 !py-2 flex flex-row-reverse !bg-transparent !text-[#1A1A1A] !border-none !font-medium"
          icon={<DownOutlined />}
          isNotBoldTitle
        />
      </div>
    </div>
  );
}

export default MsgStep;
