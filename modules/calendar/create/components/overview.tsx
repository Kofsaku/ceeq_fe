import React from "react";
import { useCalendarStore } from "@/store/use-calendar";
import { useMemo } from "react";
import { MeetType } from "@/store/use-calendar";
import { Form, Input, Select } from "antd";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import style from "./style.module.scss";

const PreviewComponent = ({ meetType }: { meetType: MeetType }) => {
  const iconMeet = useMemo(() => {
    if (meetType === MeetType.ONE_TO_ONE) {
      return "/icons/icon1vs1.svg";
    }
    return "/icons/icon_group.svg";
  }, [meetType]);

  return (
    <div
      className={twMerge(
        "bg-white w-[210px] rounded-lg shadow-md border border-gray-200 p-4 font-sans absolute top-[45%] right-[42%] lg:right-[48%]",
        style.previewBox
      )}
    >
      {/* Company Name Row */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-[20px] h-[20px] bg-gray-600 rounded-sm flex-shrink-0"></div>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-blue-500 text-sm bg-[#F4F9FE] p-1">会社名</span>
          <span className="text-orange-500 text-sm bg-[#FEF7F4] p-1">姓</span>
          <span className="text-gray-800 text-sm font-medium">様MTG</span>
        </div>
      </div>

      {/* Name Row */}
      <div className="flex items-center gap-3 mb-2">
        <Image src="/icons/group.svg" alt="dehaze" width={20} height={20} />
        <div className="flex items-center gap-2">
          <Image src={iconMeet} alt={iconMeet} width={23} height={23} />
          <div className="flex flex-col">
            <span className="text-gray-800 text-sm font-medium">名前</span>
            <span className="text-gray-500 text-xs">主催者</span>
          </div>
        </div>
      </div>

      {/* Video Meeting Link Row */}
      <div className="flex items-center gap-3 mb-2">
        <Image
          src="/icons/location_on.svg"
          alt="dehaze"
          width={16}
          height={20}
        />
        <span className="text-gray-800 text-sm">ビデオ会議リンク</span>
      </div>

      {/* Email Content Row */}
      <div className="flex items-center gap-3">
        <Image src="/icons/dehaze.svg" alt="dehaze" width={18} height={20} />
        <span className="text-gray-800 text-sm">メール内容を記載</span>
      </div>
      <span className={style.arrow}></span>
    </div>
  );
};

function Overview() {
  const { meetType } = useCalendarStore();

  const titleType = useMemo(() => {
    if (meetType === MeetType.ONE_TO_ONE) {
      return "1対1";
    }
    return "グループ";
  }, [meetType]);
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  const meetingOptions = useMemo(() => {
    return [
      {
        id: 1,
        label: " Google Meet",
        value: "",
      },
      {
        id: 2,
        label: "Zoom",
        value: "",
      },
    ];
  }, []);
  const [form] = Form.useForm();

  return (
    <div>
      <div className="text-xs">ミーティングタイプ</div>
      <div className="text-base">{titleType}</div>
      <div className="lg:flex lg:gap-x-2">
        <div className="w-full lg:w-1/2">
          <Form.Item
            name="internal_name"
            label={<span className="text-xs">内部名</span>}
            className="!mb-4"
          >
            <Input placeholder="内部名" />
          </Form.Item>
          <Form.Item
            name="host_name"
            label={<span className="text-xs">主催者名</span>}
            className="!mb-4"
          >
            <Select options={[]} placeholder="主催者名" />
          </Form.Item>
          <Form.Item
            name="event_title"
            label={<span className="text-xs">イベントタイトル</span>}
            className="!mb-4"
          >
            <Input.TextArea placeholder="イベントタイトル" />
          </Form.Item>
          <div className="flex justify-end text-[#2290F1] cursor-pointer">
            パーソナライズ
          </div>
          <Form.Item
            name="place"
            label={<span className="text-xs">場所</span>}
            className="!mb-1"
          >
            <Input placeholder="場所" />
          </Form.Item>
          <Form.Item name="host_name" className="!mb-4 w-full lg:w-1/2">
            <Select
              options={meetingOptions}
              placeholder="ビデオ会議リンクを追加"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={<span className="text-xs">メール</span>}
            className="!mb-4"
          >
            <Input.TextArea placeholder="メール" />
          </Form.Item>
          <div className="flex justify-end text-[#2290F1] cursor-pointer">
            パーソナライズ
          </div>
        </div>
        <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-4 lg:mt-0">
          <img
            src="/images/calendar-preview.png"
            alt="meeting"
            style={{ objectFit: "none" }}
          />
          <PreviewComponent meetType={meetType} />
        </div>
      </div>
    </div>
  );
}

export default Overview;
