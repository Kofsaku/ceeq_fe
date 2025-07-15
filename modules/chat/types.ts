export interface ChatContact {
  email: string;
  name: string;
  user_id: number;
  sns_id: string;
  sns_provider: string;
  sns_avatar: string | null;
  provider_user_id: null;
  sns_provider_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  is_active: number;
  last_message_date: string;
  message_count: number;
  unread_count: number;
  has_user_profile: true;
  last_message: string;
}

export interface ChatContactResponse {
  success: boolean;
  message: string;
  data: {
    conversations: ChatContact[];
    total_count: number;
    platform: string;
  };
}

export type MessageEvent = {
  type: string;
  platform: string;
  user_id: number;
  timestamp: string;
  message_data: {
    id: number;
    content: string;
    sender_name: string;
    sender_email: string;
    receiver_user_id: number;
    sent_at: string;
    platform: string;
    message_type: string;
    [key: string]: any; // để chấp nhận các field phụ khác
  };
  message: string;
  sender_name: string;
  sender_email: string;
  message_type: string;
  message_id: number;
  unread_counts: Record<string, number>;
  total_unread: number;
};
