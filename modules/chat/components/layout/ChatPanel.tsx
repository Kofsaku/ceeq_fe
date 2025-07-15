import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import ChatBubble from "../chat/ChatBubble";
import MessageInput from "../chat/MessageInput";
import { useMarkMessagesAsRead } from "../hooks/use-mark-messages-as-read";
import {
  ConversationMessage,
  useRecentMessages,
} from "../hooks/use-recent-messages";
import { useQueryClient } from "@tanstack/react-query";
import { ChatContactResponse } from "../../types";
import dayjs from "dayjs";

interface ChatPanelProps {
  selectedUserId: {
    userId: number;
    sns_id: string;
    sender_email?: string;
  };
  tabActiveKey: string;
  platform: string;
}

const ChatPanel = ({
  selectedUserId,
  tabActiveKey,
  platform,
}: ChatPanelProps) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: dataRecentMsg, isLoading } = useRecentMessages({
    platform: platform || "line",
    target_user_id: selectedUserId?.userId,
  });

  const { mutate: markAsRead } = useMarkMessagesAsRead();

  // Cập nhật trạng thái đã đọc và danh sách contact khi gửi tin nhắn thành công
  const onSuccessMarkAsRead = (lastMessage: any) => {
    queryClient.setQueryData<ChatContactResponse>(
      [
        "chat-contacts",
        { platform, limit: 50, unread_only: tabActiveKey === "unread" },
      ],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            conversations: oldData.data.conversations.map((c) =>
              c.sns_id === selectedUserId.sns_id
                ? {
                    ...c,
                    unread_count: 0,
                    last_message: lastMessage?.content || "",
                    last_message_date: lastMessage?.sent_at,
                  }
                : c
            ),
          },
        };
      }
    );
  };

  // Lấy messages và đánh dấu đã đọc khi có data mới
  useEffect(() => {
    if (dataRecentMsg?.data.conversations) {
      setMessages(dataRecentMsg.data.conversations);
      if (selectedUserId?.userId && selectedUserId?.sns_id) {
        markAsRead({
          target_user_id: selectedUserId.userId,
        });
      }
    }
  }, [dataRecentMsg, selectedUserId, markAsRead]);

  // Tự động scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendSuccess = (lastMessage: any) => {
    onSuccessMarkAsRead(lastMessage);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div
      className="bg-white p-4 rounded-xl shadow-sm flex flex-col h-full relative"
      style={{ maxHeight: "calc(100vh - 128px)" }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
          <Spin size="large" />
        </div>
      )}
      <div className="flex justify-between items-center text-lg font-normal mb-8">
        <span>{dataRecentMsg?.data?.target_user?.email}</span>
        <span>{dataRecentMsg?.data?.platform?.toUpperCase()}</span>
      </div>
      <div
        className="flex-1 overflow-y-auto space-y-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            text={msg.content}
            sender={msg.message_type === "sent" ? "user" : "other"}
            time={msg.sent_at}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4">
        <MessageInput
          selectedUserId={selectedUserId}
          onSendSuccess={handleSendSuccess}
        />
      </div>
    </div>
  );
};

export default ChatPanel;
