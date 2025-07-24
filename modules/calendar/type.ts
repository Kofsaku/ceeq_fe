export interface EnumOptionsKey {
  booking_window_types: EnumOptionsOption[];
  days_of_week: EnumOptionsOption[];
  durations: EnumOptionsOption[];
  end_times: EnumOptionsOption[];
  meeting_types: EnumOptionsOption[];
  notice_time_types: EnumOptionsOption[];
  schedule_types: EnumOptionsOption[];
  start_times: EnumOptionsOption[];
}

export interface EnumOptionsOption {
  value: string | number;
  label: string;
}
