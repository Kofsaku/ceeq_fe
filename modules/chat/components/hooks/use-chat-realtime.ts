import { useEffect, useRef } from "react";
import Pusher from "pusher-js";
import { ConversationMessage } from "./use-recent-messages";

interface UseChatRealtimeProps {
  userId: number;
  onMessage: (msg: ConversationMessage) => void;
  onUnreadUpdate?: (unreadData: any) => void;
}

export const useChatRealtime = ({
  userId,
  onMessage,
}: UseChatRealtimeProps) => {
  const pusherRef = useRef<Pusher | null>(null);

  useEffect(() => {
    if (!userId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      forceTLS: true,
    });

    const channelName = `user.${userId}`;
    const channel = pusher.subscribe(channelName);

    channel.bind("new-message", (data: ConversationMessage) => {
      onMessage(data);
    });

    pusherRef.current = pusher;

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [userId]);
};
