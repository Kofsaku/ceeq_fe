import React, { useMemo } from "react";
import { Modal } from "antd";
import { MeetType, useCalendarStore } from "@/store/use-calendar";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ModalSelectMeet() {
  const { isModalOpen, setIsModalOpen, setMeetType } = useCalendarStore();
  const router = useRouter();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const meetOptions = useMemo(() => {
    return [
      {
        id: MeetType.ONE_TO_ONE,
        label: "1対1",
        icon: "/icons/icon1vs1.svg",
        description: `チームの代表者1人との/nミーティングをスケジュールにできます。`,
      },
      {
        id: MeetType.GROUP,
        label: "グループ",
        icon: "/icons/icon_group.svg",
        description: `チームの複数のメンバー/nとのミーティングをスケジュールできます。`,
      },
    ];
  }, []);

  const handleSelectMeet = (id: MeetType) => {
    setMeetType(id);
    router.push(`/calendar/create`);
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      width={600}
    >
      <h2 className="text-base font-bold mt-6 bg-gray-50 border border-gray-100 px-3 py-2">
        スケジュール設定ページのタイプを選択
      </h2>
      <div className="flex justify-center mt-2 gap-x-2">
        {meetOptions.map((option) => (
          <div
            key={option.label}
            className="flex flex-col items-center gap-y-5 text-center border border-gray-100 p-4 cursor-pointer"
            onClick={() => handleSelectMeet(option.id)}
          >
            <Image
              src={option.icon}
              alt={option.label}
              width={48}
              height={48}
            />
            <h3 className="text-sm font-bold">{option.label}</h3>
            <p className="text-sm text-gray-500">{option.description}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ModalSelectMeet;
