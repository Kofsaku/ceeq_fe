import React, { useEffect, useState } from "react";
import SettingLayout from "../components/setting-layout";
import { Typography } from "antd";
import CeeqButton from "@/components/button";
import { LinkOutlined } from "@ant-design/icons";
import ModalSelectSns from "./modal-select-sns";
import CalendarConnected from "./calendar-connected";
import { useExternalAccounts } from "../hooks/use-external-accounts";
import { ExternalAccount } from "../type";
const { Title } = Typography;

export function CalendarConnect() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data: dataExternal } = useExternalAccounts();
  const [isConnectedCalendar, setIsConnectedCalendar] =
    useState<boolean>(false);
  const [typeCalendar, setTypeCalendar] = useState<"Google" | "Outlook">(
    "Google"
  );
  const [externalAccounts, setExternalAccounts] =
    useState<ExternalAccount | null>(null);

  useEffect(() => {
    if (!dataExternal) {
      return;
    }
    if (
      dataExternal?.["google_calendar"] ||
      dataExternal?.["outlook_calendar"]
    ) {
      setIsConnectedCalendar(true);
      setTypeCalendar(dataExternal?.["google_calendar"] ? "Google" : "Outlook");
      setExternalAccounts(
        dataExternal?.["google_calendar"]?.[0] ||
          dataExternal?.["outlook_calendar"]?.[0]
      );
    }
  }, [dataExternal]);
  if (isConnectedCalendar) {
    return (
      <SettingLayout>
        <CalendarConnected
          type={typeCalendar}
          externalAccounts={externalAccounts}
          setIsConnectedCalendar={setIsConnectedCalendar}
        />
      </SettingLayout>
    );
  }
  return (
    <SettingLayout>
      <Title level={4} className="mb-4 text-gray-800">
        カレンダー連携
      </Title>
      <p className="text-base text-gray-900">
        お持ちのGoogleアカウントやOutlookアカウントと連携することで、
        <br />
        予約内容を確認できるようになります。
      </p>
      <div className="mt-4">
        <CeeqButton
          title="カレンダー連携"
          className="!py-4"
          icon={<LinkOutlined className="!text-lg" />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <ModalSelectSns
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </SettingLayout>
  );
}
