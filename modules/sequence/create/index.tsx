import { PageWrapper } from "@/components/page-wrapper";
import React, { useMemo } from "react";
import { ISeoMetadata } from "@/types/seo-metadata.type";
import CeeqButton from "@/components/button";
import CeeqTabs from "@/components/tabs";
import { TabsProps } from "antd";
import Settings from "./components/settings";
import CeeqStepSequence from "./components/ceeq-step-sequence";
import { EditOutlined } from "@ant-design/icons";
import { useSequenceStore } from "@/store/use-sequence-store";

export function SequenceCreate() {
  const { isDisabledTab, activeKey } = useSequenceStore();
  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: "ステップ",
        children: <CeeqStepSequence />,
        disabled: isDisabledTab.step,
      },
      {
        key: "2",
        label: "設定",
        children: <Settings />,
        disabled: isDisabledTab.setting,
      },
    ],
    [isDisabledTab]
  );

  const metadata: ISeoMetadata = {
    title: "シーケンス作成",
    description: "シーケンス作成",
    image: "",
    url: "",
    siteName: "シーケンス作成",
    type: "website",
    canonical: "",
    disableCrawling: false,
  };
  return (
    <PageWrapper metadata={metadata}>
      <div className="flex items-center justify-between">
        <h1 className="text-[24px]">シーケンス作成</h1>
        <CeeqButton title="下書き保存" icon={<EditOutlined />} />
      </div>
      <div className="w-full">
        <CeeqTabs items={items} defaultActiveKey="2" activeKey={activeKey} />
      </div>
    </PageWrapper>
  );
}
