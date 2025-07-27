import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { MeetType } from "@/store/use-calendar";
import { useMutation } from "@tanstack/react-query";

interface IWorkingHours {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export interface ISettings {
  title_setting: string;
  duration: number;
  use_working_hours: boolean; // xem xét thời gian làm việc
  booking_window_type: number; // 0: rolling_days, 1: date_range
  notice_time_value: number; // Thời gian tối thiểu trước khi đặt
  notice_time_type: number; // 0: hours, 1: days
  min_booking_schedule: number;
  buffer_time: number;
  working_hours: IWorkingHours[];
}
interface IEmailReminder {
  reminder_value: number;
  reminder_unit: number;
}

export interface INotifications {
  enable_email_check: boolean;
  enable_reminder: boolean;
  email_reminders: IEmailReminder[];
  mail_template_subject: string;
  mail_template_body: string;
}

export interface CreateCalendarInput {
  name: string;
  user_id: number;
  title: string;
  slug: string;
  address: string;
  schedule_type: MeetType; // 0: 1vs1, 1: group
  meeting_type: number; // 0: zoom, 1: google_met
  email_template: string;
  group_members?: {
    user_id: number;
    role: number;
  }[];
  settings: ISettings;
  notifications: INotifications;
}

export const useCreateCalendar = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const { post } = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useMutation({
    mutationFn: (input: CreateCalendarInput) => {
      return post("/schedules", { body: input });
    },
    onSuccess: (data: any) => onSuccess(data?.data),
    onError: (error: any) => onError(error),
  });
};
