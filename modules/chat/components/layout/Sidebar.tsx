import { Tabs } from "antd";
import { useUnreadMessageByPlatform } from "../hooks/use-unread-message-by-platform";

interface SidebarProps {
  onSelectPlatform: (platform: string) => void;
  selectedPlatform: string;
}

const snsTools = [
  { label: "Outlook", key: "outlook" },
  { label: "Gmail", key: "gmail" },
  { label: "LINE", key: "line" },
  { label: "メッセンジャー", key: "sms" },
  { label: "Messenger", key: "messenger" },
  { label: "Instagram", key: "instagram" },
  { label: "X", key: "twitter" },
];

const renderInboxFilters = (
  inboxFilters: { label: string; value: number }[]
) => (
  <div className="space-y-2">
    {inboxFilters.map((item, index) => (
      <div key={index} className="flex justify-between">
        <span className="font-bold">{item.label}</span>
        <span className="text-xs bg-gray-100 rounded-4xl px-2 py-0.5 text-gray-500 font-semibold">
          {item.value}
        </span>
      </div>
    ))}
  </div>
);

const renderSnsTools = (
  platformCounts: Record<string, number> | undefined,
  selectedPlatform: string,
  onSelectPlatform: (platform: string) => void
) => (
  <ul className="space-y-1 text-sm text-gray-600">
    {snsTools.map((tool) => (
      <li
        key={tool.key}
        className={`flex justify-between cursor-pointer rounded py-1 px-2 font-bold ${
          selectedPlatform === tool.key
            ? "bg-orange-100 font-semibold text-orange-600"
            : ""
        }`}
        onClick={() => onSelectPlatform(tool.key)}
      >
        <span>{tool.label}</span>
        <span className="text-xs bg-gray-100 rounded-xl px-2 py-0.5 text-gray-500">
          {platformCounts?.[tool.key] ?? 0}
        </span>
      </li>
    ))}
  </ul>
);

const Sidebar = ({ onSelectPlatform, selectedPlatform }: SidebarProps) => {
  const { data } = useUnreadMessageByPlatform();
  const summary = data?.data.summary;
  const platformCounts = data?.data.platform_unread_counts;

  const inboxFilters = [
    { label: "すべて", value: summary?.all ?? 0 },
    { label: "未読", value: summary?.unread ?? 0 },
    { label: "メンション", value: summary?.mention ?? 0 },
  ];

  const tabContent = (
    <>
      {/* Inbox filters */}
      {renderInboxFilters(inboxFilters)}
      <div className="my-4 border-t border-gray-200" />
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">SNSツール</h3>
        {renderSnsTools(platformCounts, selectedPlatform, onSelectPlatform)}
      </div>
    </>
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-full">
      <h2 className="text-lg font-semibold mb-2">受信トレイ</h2>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "個人アカウント",
            children: tabContent,
          },
          {
            key: "2",
            label: "会社アカウント",
            children: tabContent,
          },
        ]}
      />
    </div>
  );
};

export default Sidebar;
