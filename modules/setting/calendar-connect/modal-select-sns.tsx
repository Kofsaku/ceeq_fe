import { Modal } from "antd";
import React from "react";
import CeeqButton from "@/components/button";
import SvgIcon from "@/components/svg-icon";
import { useUserStore } from "@/store/use-user-store";
import { CALLBACK_URL, CALLBACK_URL_BE } from "@/const/env.const";

function ModalSelectSns({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}) {
  const userId = useUserStore((s) => s.userInfo?.id);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConnectGoogle = () => {
    const urlRedirect = `${CALLBACK_URL_BE}/api/user/calendar/connect?callbackUrl=${CALLBACK_URL}/setting/calendar-connect&callbackUrlErr=${CALLBACK_URL}/setting/calendar-connect&user_id=${userId}`;
    window.location.href = urlRedirect;
  };

  const handleConnectOutlook = () => {
    const urlRedirect = `${CALLBACK_URL_BE}/api/user/outlook-calendar/connect?callbackUrl=${CALLBACK_URL}/setting/calendar-connect&callbackUrlErr=${CALLBACK_URL}/setting/calendar-connect&user_id=${userId}`;
    window.location.href = urlRedirect;
  };
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <h2 className="text-center mb-4 text-[18px]">カレンダー連携</h2>
      <p className="text-center mb-4 text-[16px]">
        連携させたいアカウントを選択してください。
      </p>
      <div className="flex flex-col justify-center items-center gap-y-4">
        <CeeqButton
          title="Googleカレンダー"
          className="!py-4 !bg-transparent !border !border-gray-900 !text-gray-900 !font-medium w-max"
          icon={<SvgIcon path={"/icons/devicon_google.svg"} />}
          onClick={handleConnectGoogle}
        />
        <CeeqButton
          title="Outlookカレンダー"
          className="!py-4 !bg-transparent !border !border-gray-900 !text-gray-900 !font-medium w-max"
          icon={<SvgIcon path={"/icons/Outlook.svg"} />}
          onClick={handleConnectOutlook}
        />
      </div>
    </Modal>
  );
}

export default ModalSelectSns;
