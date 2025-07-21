import React, { useMemo } from "react";
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
  const { meetType, activeKey, setActiveKey } = useCalendarStore();
  const items: TabsProps["items"] = useMemo(() => {
    if (meetType === MeetType.ONE_TO_ONE) {
      return [
        {
          key: "1",
          label: "概要",
          children: <Overview />,
        },
        {
          key: "2",
          label: "スケジュール設定",
          children: <SettingSchedule />,
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
        children: <Overview />,
      },
      {
        key: "2",
        label: "参加者",
        children: <Members />,
      },
      {
        key: "3",
        label: "スケジュール設定",
        children: <SettingSchedule />,
      },
      {
        key: "4",
        label: "自動化",
        children: <Automation />,
      },
    ];
  }, [meetType]);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const keys = ["1", "2", "3"];
    const nextKey = keys[(keys.indexOf(activeKey) + 1) % keys.length] || "1";
    setActiveKey(nextKey);
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
            fields: [""],
            reminders: [""],
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
