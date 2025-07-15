import { Badge } from "antd";

interface MessageItemProps {
  name: string;
  content: string;
  time: string;
  unread: number;
  onClick?: () => void;
}

const MessageItem = ({
  name,
  content,
  time,
  unread,
  onClick,
}: MessageItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-start p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer"
    >
      <div className="flex-1">
        <div className="font-semibold text-gray-900 truncate">{name}</div>
        <div className="text-sm text-gray-600 truncate">{content}</div>
      </div>
      <div className="flex flex-col items-end ml-2 text-right">
        <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
        {unread > 0 && <Badge count={unread} size="small" className="mt-1" />}
      </div>
    </div>
  );
};

export default MessageItem;
