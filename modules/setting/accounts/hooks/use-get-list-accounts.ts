import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useHttpClient, {
  API_SERVICES_NAME,
  ApiResponse,
} from "@/hooks/use-http-client";

interface IParams {
  sort_role_id: string;
  search?: string;
  limit?: number;
  page?: number;
}

// export interface IResponse {
//   records: [
//     {
//       id: number;
//       name: string;
//       title: string;
//       slug: string;
//       description: string;
//       schedule_type: number;
//       meeting_type: number;
//       meeting_url: number;
//       color: string;
//       status: number;
//       settings: {
//         id: number;
//         title_setting: string;
//         duration: number;
//         use_working_hours: number;
//         booking_window_type: number;
//         notice_time_type: number;
//         notice_time_value: number;
//         min_booking_schedule: number;
//         buffer_time: number;
//         working_hours: {
//           id: number;
//           day_of_week: number;
//           start_time: string;
//           end_time: string;
//         }[];
//       };
//       notifications: {
//         id: number;
//         enable_email_check: number;
//         enable_reminder: number;
//         mail_template_subject: string;
//         mail_template_body: string;
//         email_reminders: {
//           id: number;
//           reminder_value: number;
//           reminder_unit: number;
//         }[];
//       };
//       created_at: string;
//       updated_at: string;
//     },
//   ];
//   page: number;
//   limit: number;
//   total: number;
// }

export const useGetListAccounts = (
  params: IParams
): UseQueryResult<any, Error> => {
  const { get } = useHttpClient(API_SERVICES_NAME.PUBLIC);
  return useQuery({
    queryKey: ["accounts", { ...params }],
    queryFn: (): Promise<ApiResponse<any>> => get<any>(`/accounts`, { params }),
    select: (response) => response.data.data,
  });
};
