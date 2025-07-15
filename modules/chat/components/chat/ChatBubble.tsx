import { UserOutlined } from "@ant-design/icons";

interface ChatBubbleProps {
  text: string;
  sender: "user" | "other";
  time?: string;
}

const ChatBubble = ({ text, sender, time }: ChatBubbleProps) => {
  const isUser = sender === "user";

  return (
    <div
      className={`flex mb-5 items-center ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <span className="mr-2">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300">
            <UserOutlined className="text-[#1A1A1A]" width={38} />
          </span>
        </span>
      )}
      <div
        className={`max-w-[70%] px-4 py-2 rounded-sm text-sm relative shadow
          ${
            isUser ? "bg-[#F2F2F2] text-[#1A1A1A]" : "bg-[#666666] text-white"
          }`}
      >
        <p className="break-words whitespace-pre-line">{text}</p>
        {time && (
          <span
            className={`absolute text-[10px] bottom-[-1.2rem] whitespace-nowrap text-zinc-400
              ${isUser ? "right-2" : "left-2"}`}
          >
            {time}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
