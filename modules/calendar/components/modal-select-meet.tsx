import { useCalendarStore } from "@/store/use-calendar";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

function ModalSelectMeet() {
  const {
    isModalOpen,
    setIsModalOpen,
    setMeetType,
    setActiveKey,
    enumOptions,
  } = useCalendarStore();
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
        id: enumOptions?.schedule_types[0].value,
        label: enumOptions?.schedule_types[0].label,
        icon: "/icons/icon1vs1.svg",
        description: `チームの代表者1人との/nミーティングをスケジュールにできます。`,
      },
      {
        id: enumOptions?.schedule_types[1].value,
        label: enumOptions?.schedule_types[1].label,
        icon: "/icons/icon_group.svg",
        description: `チームの複数のメンバー/nとのミーティングをスケジュールできます。`,
      },
    ];
  }, []);

  const handleSelectMeet = (id: number) => {
    setMeetType(id);
    router.push(`/calendar/create`);
    setIsModalOpen(false);
    setActiveKey("1");
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
            onClick={() => handleSelectMeet(+option.id)}
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
