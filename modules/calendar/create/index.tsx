import React, { useMemo } from "react";
import { useCalendarStore } from "@/store/use-calendar";
import { Form, TabsProps } from "antd";
import CeeqTabs from "@/components/tabs";
import { PageWrapper } from "@/components/page-wrapper";
import { ISeoMetadata } from "@/types/seo-metadata.type";
import Overview from "./components/overview";
import ActionBar from "./components/action-bar";
import SettingSchedule from "./components/setting-schedule";

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
  const items: TabsProps["items"] = useMemo(
    () => [
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
        children: <div>3</div>,
      },
    ],
    []
  );
  const [form] = Form.useForm();

  const handleNext = () => {
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
      <ActionBar onNext={handleNext} onCancel={() => {}} />
    </PageWrapper>
  );
}
