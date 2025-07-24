import React, { useEffect, useMemo } from "react";
import { MeetType, useCalendarStore } from "@/store/use-calendar";
import { Form, TabsProps } from "antd";
import CeeqTabs from "@/components/tabs";
import { PageWrapper } from "@/components/page-wrapper";
import { ISeoMetadata } from "@/types/seo-metadata.type";
import Overview from "./components/overview";
import ActionBar from "./components/action-bar";
import SettingSchedule from "./components/setting-schedule";
import Automation from "./components/automation";
import Members from "./components/members";
import {
  CreateCalendarInput,
  useCreateCalendar,
} from "../hooks/use-create-calendar";
import { toast } from "react-toastify";
import { useGetEnumOptions } from "../hooks/use-get-enum-options";

const metadata: ISeoMetadata = {
  title: "概要",
  description: "概要",
  image: "",
  url: "",
  siteName: "概要",
  type: "website",
  canonical: "",
  disableCrawling: false,
};
export function CreateCalendar() {
  const { meetType, activeKey, setEnumOptions } = useCalendarStore();
  const [form] = Form.useForm();
  const { data: enumOptionsResponse } = useGetEnumOptions();

  useEffect(() => {
    if (enumOptionsResponse) {
      setEnumOptions(enumOptionsResponse);
    }
  }, [enumOptionsResponse]);

  const items: TabsProps["items"] = useMemo(() => {
    if (meetType === MeetType.ONE_TO_ONE) {
      return [
        {
          key: "1",
          label: "概要",
          children: <Overview form={form} />,
        },
        {
          key: "2",
          label: "スケジュール設定",
          children: <SettingSchedule form={form} />,
        },
        {
          key: "3",
          label: "自動化",
          children: <Automation />,
        },
      ];
    }
    return [
      {
        key: "1",
        label: "概要",
        children: <Overview form={form} />,
      },
      {
        key: "2",
        label: "チームメンバー",
        children: <Members />,
      },
      {
        key: "3",
        label: "スケジュール設定",
        children: <SettingSchedule form={form} />,
      },
      {
        key: "4",
        label: "自動化",
        children: <Automation />,
      },
    ];
  }, [meetType]);

  const { mutate: onCreateCalendar } = useCreateCalendar(
    (response) => {
      if (response.status === 200) {
        toast.success("スケジュール作成成功");
      }
    },
    (error) => {
      toast.error("スケジュール作成失敗");
    }
  );

  const handleSubmit = () => {
    const formValues = form.getFieldsValue();
    const params: CreateCalendarInput = {
      user_id: formValues.user_id,
      title: formValues.title,
      name: formValues.name,
      slug: formValues.slug ?? null,
      schedule_type: meetType,
      meeting_type: formValues?.meeting_type,
      email_template: formValues.email_template,
      color: formValues.color ?? null,
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
        email_reminders: formValues?.email_reminders,
        mail_template_subject: formValues?.mail_template_subject,
        mail_template_body: formValues?.mail_template_body,
      },
    };
    onCreateCalendar(params);
  };

  return (
    <PageWrapper metadata={metadata} isActionBar>
      <div className="px-4 lg:px-8 mb-[60px]">
        <h1 className="text-[24px]">概要</h1>
        <Form
          layout="vertical"
          className="mt-6"
          form={form}
          initialValues={{
            working_hours: [
              {
                day_of_week: "",
                start_time: "",
                end_time: "",
              },
            ],
            notifications: [
              {
                reminder_value: "",
                reminder_unit: "",
              },
            ],
            use_working_hours: false,
            enable_reminder: false,
          }}
        >
          <div className="bg-white mt-4 lg: mt-[35px] p-4 lg:p-[40px]">
            <CeeqTabs
              items={items}
              defaultActiveKey="1"
              activeKey={activeKey}
            />
          </div>
        </Form>
      </div>
      <ActionBar onSubmit={handleSubmit} onCancel={() => {}} />
    </PageWrapper>
  );
}
