"use client";

import { LinkOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import { useConnectService } from "../hooks/use-connect-service";
import { useDisconnectService } from "../hooks/use-disconnect-service";
import { ProviderName, Service } from "../type";
import { useState } from "react";
import { useLineOAConfig } from "../hooks/use-line-oa-config";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/use-user-store";

interface ServiceModalProps {
  open: boolean;
  actionType: "link" | "unlink" | null;
  selectedService: Service | null;
  onCancel: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  open,
  actionType,
  selectedService,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [lineOAConfig, setLineOAConfig] = useState({
    channel_id: "",
    oa_name: "",
    channel_access_token: "",
  });
  const userId = useUserStore((s) => s.userInfo?.id);
  const [messageApi, contextHolder] = message.useMessage();

  const onDisconnectSuccess = () => {
    messageApi.success(`${selectedService?.name}の連携を解除しました。`);
    onCancel();
  };

  const connectMutation = useConnectService(userId);
  const disconnectMutation = useDisconnectService(onDisconnectSuccess, (err) =>
    messageApi.error(`解除失敗: ${err.message}`)
  );

  const lineOAConfigMutation = useLineOAConfig(
    () => {
      toast.success("LINE公式アカウントの設定が正常に保存されました");
      onCancel();
    },
    (error) => {
      const message = error?.data?.message;
      toast.error(message || "LINE OA情報の保存に失敗しました");
    }
  );

  const handleOk = async () => {
    if (!selectedService || !actionType) return;

    try {
      if (actionType === "link") {
        if (selectedService.provider === ProviderName.LINE_OA) {
          await form.validateFields();
          await lineOAConfigMutation.mutateAsync(lineOAConfig);
        }
        await connectMutation.mutateAsync(selectedService);
      } else {
        await disconnectMutation.mutateAsync(selectedService);
        onCancel();
      }
    } catch (error) {}
  };

  const isConnect = actionType === "link";
  const isLoading =
    connectMutation.isPending ||
    disconnectMutation.isPending ||
    lineOAConfigMutation.isPending;

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        footer={null}
        centered
        closable={false}
        onCancel={onCancel}
        className="rounded-xl !p-0"
        width={420}
      >
        <div className="text-center py-6 px-6">
          <p className="text-sm text-gray-800 font-medium mb-6">
            {isConnect
              ? `${selectedService?.name}と連携しますか？`
              : `${selectedService?.name}の連携を解除しますか？`}
          </p>
          {isConnect && (
            <p className="text-xs text-gray-500 mb-4">
              外部サイトに移動して認証を行います。
            </p>
          )}
          {isConnect && selectedService?.provider === ProviderName.LINE_OA && (
            <Form
              form={form}
              layout="vertical"
              className="mb-4 text-left"
              initialValues={lineOAConfig}
              onValuesChange={(_changed, all) => setLineOAConfig(all)}
            >
              <Form.Item
                label="Channel ID"
                name="channel_id"
                rules={[
                  { required: true, message: "Channel IDを入力してください" },
                ]}
              >
                <Input placeholder="Channel ID" />
              </Form.Item>
              <Form.Item
                label="LINE OA名"
                name="oa_name"
                rules={[{ required: true, message: "OA名を入力してください" }]}
              >
                <Input placeholder="LINE OA名" />
              </Form.Item>
              <Form.Item
                label="Channel Access Token"
                name="channel_access_token"
                rules={[
                  { required: true, message: "Tokenを入力してください" },
                  { min: 50, message: "50文字以上で入力してください" },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Channel Access Token" />
              </Form.Item>
            </Form>
          )}

          <div className="flex justify-center gap-2">
            <Button
              type={isConnect ? "primary" : "default"}
              icon={isConnect ? <LinkOutlined /> : <UnlockOutlined />}
              className={`${
                isConnect
                  ? "!bg-orange-500 !hover:bg-orange-600 !border-orange-500 text-white"
                  : "!border-red-400 !text-red-500 hover:!border-red-500"
              } px-6 font-semibold rounded w-40`}
              loading={isLoading}
              onClick={handleOk}
            >
              {isConnect ? "連携" : "解除"}
            </Button>
            <Button
              onClick={onCancel}
              disabled={isLoading}
              className="border border-gray-300 text-black px-6 font-semibold rounded w-40"
            >
              キャンセル
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
