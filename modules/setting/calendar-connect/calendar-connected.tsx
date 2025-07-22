import React from "react";
import { Input, Typography, message, Button } from "antd";
import { UnlockOutlined } from "@ant-design/icons";
import { useDisconnectService } from "../hooks/use-disconnect-service";
import { ExternalAccount } from "../type";
const { Title } = Typography;

function CalendarConnected({
  type = "Google",
  externalAccounts,
  setIsConnectedCalendar,
}: {
  type?: "Google" | "Outlook";
  externalAccounts: ExternalAccount;
  setIsConnectedCalendar: (isConnectedCalendar: boolean) => void;
}) {
  const [messageApi] = message.useMessage();
  const onDisconnectSuccess = () => {
    messageApi.success(`${externalAccounts?.name}の連携を解除しました。`);
  };

  const disconnectMutation = useDisconnectService(onDisconnectSuccess, (err) =>
    messageApi.error(`解除失敗: ${err.message}`)
  );

  const handleDisconnect = () => {
    disconnectMutation.mutate({
      id: externalAccounts?.id,
      name: externalAccounts?.provider as any,
      provider: externalAccounts?.provider,
    });
    setIsConnectedCalendar(false);
  };
  return (
    <div className="">
      <Title level={4} className="mb-4 text-gray-800">
        {type}カレンダー連携
      </Title>
      <p className="text-base text-gray-900">
        お持ちの{type}アカウントと連携することで、
        <br />
        予約内容を確認できるようになります。
      </p>
      <div className="border border-gray-100 rounded-[12px] p-[20px] mt-4">
        <div className="text-gray-900 font-bold">連携</div>
        <div className="flex items-center my-8 justify-between">
          <div>{type}アカウントと連携</div>
          <Button
            icon={<UnlockOutlined />}
            type="primary"
            size="small"
            className="!border-[#F15A22] !bg-[#FEF7F4] !text-gray-600 !hover:border-gray-400 !hover:text-gray-800"
            onClick={handleDisconnect}
          >
            解除
          </Button>
        </div>
        <div className="w-full lg:w-1/2">
          <Input disabled value={externalAccounts?.email} />
        </div>
      </div>
    </div>
  );
}

export default CalendarConnected;
