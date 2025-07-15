import useHttpClient, { API_SERVICES_NAME } from "@/hooks/use-http-client";
import { useMutation } from "@tanstack/react-query";

export interface CreateSequenceInput {
  sequence_name: string;
  start_date?: string;
  end_date?: string;
  actions?: string;
  condition_id?: number;
  use_condition?: boolean;
  schedule_start_date?: string;
  schedule_after_days?: number;
  use_schedule?: boolean;
  when_reply?: boolean;
  when_appointment?: boolean;
  send_start?: string;
  send_end?: string;
  only_working_day?: boolean;
  is_draft?: boolean;
}

export const useCreateSequence = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  const { post } = useHttpClient(API_SERVICES_NAME.PUBLIC);

  return useMutation({
    mutationFn: (input: CreateSequenceInput) => {
      return post("/sequences", { body: input });
    },
    onSuccess: (data: any) => onSuccess(data?.data),
    onError: (error: any) => onError(error),
  });
};
