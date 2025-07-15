import { SendOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Space } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { RecentMessagesResponse } from "../hooks/use-recent-messages";
import { useSendLineMessage } from "../hooks/use-send-line-message";

interface MessageInputProps {
  selectedUserId: {
    userId: number;
    sns_id: string;
    sender_email?: string;
  };
  onSendSuccess?: (lastMessage: any) => void;
}

const MessageInput = ({ selectedUserId, onSendSuccess }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const { mutate: sendMessage, isPending } = useSendLineMessage();
  const queryClient = useQueryClient();

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(
      {
        to: selectedUserId.sns_id,
        subject: "",
        message,
        message_type: "text",
      },
      {
        onSuccess: (res: any) => {
          const lastMessage = {
            id: Date.now(),
            content: message,
            message_type: "sent",
            sent_at: dayjs(res?.data?.data?.timestamp).format("HH:mm"),
          };
          queryClient.setQueryData<RecentMessagesResponse>(
            [
              "recent-messages",
              { platform: "line", target_user_id: selectedUserId?.userId },
            ],
            (oldData) => {
              if (!oldData) return oldData;
              return {
                ...oldData,
                data: {
                  ...oldData.data,
                  conversations: [
                    ...oldData.data.conversations,
                    lastMessage as any,
                  ],
                },
              };
            }
          );
          setMessage("");
          onSendSuccess?.(lastMessage);
        },
        onError: () => {},
      }
    );
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }} size="small">
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <div className="text-[#2290F1] cursor-pointer font-medium">
            テンプレートファイルシーケンス
          </div>
          <Button
            type="primary"
            icon={<SendOutlined />}
            loading={isPending}
            onClick={handleSend}
            disabled={isPending}
            className="!bg-orange-500"
          >
            送信
          </Button>
        </Space>
        <Input.TextArea
          placeholder="ここにメッセージを入力"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isPending}
        />
      </Space>
    </div>
  );
};

export default MessageInput;
