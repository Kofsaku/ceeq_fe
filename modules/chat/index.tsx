"use client";

import { useEffect, useRef, useState } from "react";
import ChatPanel from "./components/layout/ChatPanel";
import MessageList from "./components/layout/MessageList";
import Sidebar from "./components/layout/Sidebar";
import { useChatRealtime } from "./components/hooks/use-chat-realtime";
import { useUserStore } from "@/store/use-user-store";
import { useQueryClient } from "@tanstack/react-query";
import { UnreadByPlatformResponse } from "./components/hooks/use-unread-message-by-platform";
import { ChatContactResponse } from "./types";
import { RecentMessagesResponse } from "./components/hooks/use-recent-messages";
import dayjs from "dayjs";

export const Chat: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<{
    userId: number;
    sns_id: string;
    sender_email?: string;
  } | null>(null);

  const queryClient = useQueryClient();
  const userId = useUserStore((s) => s.userInfo?.id);
  const selectedUserIdRef = useRef(selectedUserId);

  useEffect(() => {
    selectedUserIdRef.current = selectedUserId;
  }, [selectedUserId]);

  const [platform, setPlatform] = useState<string>("line");
  const [tabActiveKey, setTabActiveKey] = useState("all");

  // Helper: format time HH:mm
  const formatTime = (date: string) => dayjs(date).format("HH:mm");

  useChatRealtime({
    userId,
    onMessage: (msg: any) => {
      const currentSelected = selectedUserIdRef.current;

      // Nếu là message mới từ người khác
      if (
        msg.message_data &&
        msg.sender_email !== currentSelected?.sender_email
      ) {
        // Update unread badge
        queryClient.setQueryData<UnreadByPlatformResponse>(
          ["unread-message-by-platform"],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                platform_unread_counts: {
                  ...oldData.data.platform_unread_counts,
                  [platform]:
                    (oldData.data.platform_unread_counts[platform] || 0) + 1,
                },
              },
            };
          }
        );
        // Update last message, unread count trong danh sách contact
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
                  c.email === msg.sender_email
                    ? {
                        ...c,
                        unread_count: c.unread_count + 1,
                        last_message: msg.message_data.content,
                        last_message_date: formatTime(msg.message_data.sent_at),
                      }
                    : c
                ),
              },
            };
          }
        );
      } else {
        // Update contact: unread = 0, update last message
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
                  c.email === msg.sender_email
                    ? {
                        ...c,
                        unread_count: 0,
                        last_message: msg.message_data.content,
                        last_message_date: formatTime(msg.message_data.sent_at),
                      }
                    : c
                ),
              },
            };
          }
        );
        // Thêm message mới vào recent-messages
        queryClient.setQueryData<RecentMessagesResponse>(
          [
            "recent-messages",
            { platform, target_user_id: currentSelected?.userId },
          ],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                conversations: [
                  ...oldData.data.conversations,
                  {
                    ...msg,
                    id: Date.now(),
                    external_message_id: msg.id,
                    content: msg.message_data.content,
                    message_type: "received",
                    content_type: "text",
                    status: "sent",
                    sent_at: formatTime(msg.message_data.sent_at),
                    read_at: null,
                    sender: {
                      user_id: msg.sender_id,
                      email: msg.sender_email,
                      name: msg.sender_name || "",
                      is_target_user: false,
                    },
                    receiver: {
                      user_id: userId || 0,
                      email: "",
                      name: "",
                      is_target_user: true,
                    },
                    platform_data: {},
                    unread_count: 0,
                  },
                ],
              },
            };
          }
        );
      }
    },
  });

  return (
    <div className="h-full max-h-full grid grid-cols-12 gap-2">
      <div className="col-span-3 h-full">
        <Sidebar onSelectPlatform={setPlatform} selectedPlatform={platform} />
      </div>
      <div className="col-span-4 h-full">
        <MessageList
          onSelectUser={setSelectedUserId}
          platform={platform}
          tabActiveKey={tabActiveKey}
          setTabActiveKey={setTabActiveKey}
        />
      </div>
      <div className="col-span-5 h-full">
        {selectedUserId ? (
          <ChatPanel
            selectedUserId={selectedUserId}
            tabActiveKey={tabActiveKey}
            platform={platform}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">ユーザーを選択してください</p>
          </div>
        )}
      </div>
    </div>
  );
};
