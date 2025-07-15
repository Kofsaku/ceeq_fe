import CeeqButton from "@/components/button";
import React from "react";
import { useSequenceStore } from "@/store/use-sequence-store";
import MsgStep from "./msg/msg-step";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ISequenceStep } from "@/store/use-sequence-store";
import { twMerge } from "tailwind-merge";
import styles from "./style.module.scss";

export interface ISequenceStepProps {
  step: ISequenceStep;
  parentId?: string; // Add parentId prop
}

function SequenceStep(props: ISequenceStepProps) {
  const { step, parentId } = props;
  const { setIsModalOpen, setActionIndex } = useSequenceStore();

  return (
    <div>
      {!step?.isRoot && (
        <>
          <div
            className={twMerge(
              "flex justify-center my-[24px]",
              step?.isRoot && "w-[calc(50vw-200px)]",
              !step?.isHalfWidth && styles.buttonContainer,
              step?.isHalfWidth && styles.buttonContainerFlex
            )}
          >
            <div className={styles.horizontalLine}></div>
            <CeeqButton
              title=""
              className="!bg-transparent !border-none"
              icon={<PlusCircleOutlined className="!text-[#1A1A1A] text-xl" />}
              onClick={() => {
                setIsModalOpen(true);
                setActionIndex(parentId || null); // Use parentId, or null if it's a root node
              }}
            />
          </div>
        </>
      )}
      <MsgStep step={step} />
      {(!step?.children || step?.children?.length === 0) && (
        <div>
          <div
            className={twMerge(
              "flex justify-center my-[24px]",
              step?.isRoot && "w-[calc(50vw-200px)]",
              styles.buttonContainer
            )}
          >
            <CeeqButton
              title=""
              className="!bg-transparent !border-none"
              icon={<PlusCircleOutlined className="!text-[#1A1A1A] text-xl" />}
              onClick={() => {
                setIsModalOpen(true);
                setActionIndex(step.id || null); // For leaf nodes, use current step's id as it will be the parent for new children
              }}
            />
          </div>
          <div
            className={twMerge(
              "flex justify-center",
              step?.isRoot && "w-[calc(50vw-200px)]"
            )}
          >
            <CeeqButton
              title="完了"
              className="!bg-transparent !text-[#1A1A1A] !rounded-[50px] !px-6 !py-2"
            />
          </div>
        </div>
      )}
      {/* Children Container */}
      {step.children && step.children.length > 0 && (
        <div className="relative">
          <div className="flex w-[calc(50vw-200px)] gap-x-[20px]">
            {step.children.map((child) => (
              <div
                key={child.id}
                className={twMerge("relative")}
                // Set width to 50% when there are 2 or more children OR when all children have no children (leaf nodes)
              >
                <SequenceStep step={child} parentId={step.id} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SequenceStep;
