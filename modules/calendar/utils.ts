import { CALLBACK_URL } from "@/const/env.const";
import { MeetType } from "@/store/use-calendar";

export const formatParamsCreateCalendar = (
  formValues: any,
  meetType: MeetType
) => {
  return {
    user_id: formValues.user_id,
    title: formValues.title,
    name: formValues.name,
    address: formValues.address,
    slug: `${CALLBACK_URL}/calendar/${formValues.slug}`,
    schedule_type: meetType,
    meeting_type: formValues?.meeting_type,
    email_template: formValues.email_template,
    settings: {
      title_setting: formValues?.title_setting ?? "",
      duration: formValues?.duration,
      use_working_hours: formValues?.use_working_hours,
      booking_window_type: formValues?.booking_window_type,
      notice_time_value: formValues?.notice_time_value,
      notice_time_type: formValues?.notice_time_type,
      min_booking_schedule: formValues?.min_booking_schedule,
      buffer_time: formValues?.buffer_time,
      working_hours: formValues?.working_hours,
    },
    notifications: {
      enable_email_check: formValues?.enable_email_check,
      enable_reminder: formValues?.enable_reminder,
      email_reminders: formValues?.notifications,
      mail_template_subject: formValues?.mail_template_subject,
      mail_template_body: formValues?.mail_template_body,
    },
  };
};
