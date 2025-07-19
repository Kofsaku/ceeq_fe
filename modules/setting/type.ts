export enum ServiceName {
  LINE = "LINE",
  GMAIL = "Gmail",
  OUTLOOK = "Outlook",
  SMS = "SMS",
  MESSENGER = "Messenger",
  INSTAGRAM = "Instagram",
  X = "X",
  GOOGLE_MEET = "Google Meet",
  ZOOM = "Zoom",
  GOOGLE_CALENDAR = "google_calendar",
  OUTLOOK_CALENDAR = "outlook_calendar",
}

export enum ProviderName {
  LINE = "line",
  GMAIL = "google",
  OUTLOOK = "outlook",
  SMS = "twilio",
  MESSENGER = "facebook",
  INSTAGRAM = "instagram",
  X = "twitter",
  GOOGLE_MEET = "google_meet",
  ZOOM = "zoom",
  // Các provider OA (Official Account)
  LINE_OA = "line_oa",
  GMAIL_OA = "google_oa",
  OUTLOOK_OA = "outlook_oa",
  GOOGLE_CALENDAR = "google_calendar",
  OUTLOOK_CALENDAR = "outlook_calendar",
}

export type Service = {
  name: ServiceName;
  icon?: string;
  color?: string;
  connected?: boolean;
  provider: ProviderName;
  id?: number;
};

export interface ExternalAccount {
  id: number;
  provider: ProviderName;
  provider_user_id: string;
  provider_email: string;
  provider_name: string;
  provider_avatar: string;
  access_token: string;
  refresh_token: string;
  expires_at: string; // ISO format
  created_at: string;
  updated_at: string;
}

export interface ExternalAccountsListResponse {
  success: boolean;
  message: string;
  data: ExternalAccount[];
}

export interface ExternalAccount {
  id: number;
  user_id: number;
  provider: ProviderName;
  provider_user_id: string;
  name: string | null;
  access_token: string;
  refresh_token: string | null;
  token_expires_at: string;
  scopes: string[] | null;
  email: string | null;
  provider_data: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ExternalAccountsResponse {
  success: boolean;
  message: string;
  data: Record<string, ExternalAccount[]>;
}

export enum ProviderCalendarConnect {
  google_calendar = "Google",
  outlook_calendar = "Outlook",
}
