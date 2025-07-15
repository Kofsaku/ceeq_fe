import { Tabs, Spin, Flex } from "antd";
import { useChatContacts } from "../hooks/use-line-contacts";
import MessageItem from "../chat/MessageItem";
interface Props {
  onSelectUser: ({
    userId,
    sns_id,
    sender_email,
  }: {
    userId: number;
    sns_id: string;
    sender_email?: string;
  }) => void;
  platform: string;
  tabActiveKey: string;
  setTabActiveKey: (key: string) => void;
}

const MessageList = ({
  onSelectUser,
  platform,
  tabActiveKey,
  setTabActiveKey,
}: Props) => {
  const { data, isLoading } = useChatContacts({
    platform,
    limit: 50,
    unread_only: tabActiveKey === "unread",
  });

  const conversations = data?.data?.conversations || [];

  const tabs = [
    { key: "all", label: "すべて" },
    { key: "unread", label: "未読" },
    { key: "pinned", label: "ピン留め" },
    { key: "flag", label: "フラグ" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-full relative">
      <h2 className="text-lg font-semibold mb-2">受信トレイ</h2>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10">
          <Spin size="large" />
        </div>
      )}
      <div style={{ opacity: isLoading ? 0.3 : 1 }}>
        <Tabs
          activeKey={tabActiveKey}
          onChange={setTabActiveKey}
          items={tabs.map((tab) => ({
            ...tab,
            children: (
              <div className="space-y-2 mt-2">
                {conversations.map((msg, i) => (
                  <MessageItem
                    key={msg.user_id || i}
                    name={msg.email}
                    content={msg.last_message || "Tin nhắn gần nhất"}
                    time={msg.last_message_date}
                    unread={msg.unread_count}
                    onClick={() =>
                      onSelectUser({
                        userId: msg.user_id,
                        sns_id: msg.sns_id,
                        sender_email: msg.email,
                      })
                    }
                  />
                ))}
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
};

export default MessageList;
