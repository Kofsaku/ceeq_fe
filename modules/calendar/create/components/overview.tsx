import React, { useEffect, useState } from "react";
import { useCalendarStore } from "@/store/use-calendar";
import { useMemo } from "react";
import { MeetType } from "@/store/use-calendar";
import { Form, FormInstance, Input, Select } from "antd";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import style from "./style.module.scss";
import { useGetListHostUser } from "../../hooks/use-get-host-user";

const PreviewComponent = ({
  meetType,
  address,
  mailTemplate,
  userName,
}: {
  meetType: MeetType;
  address: string;
  mailTemplate: string;
  userName: string;
}) => {
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
            <span className="text-gray-500 text-xs truncate max-w-[110px]">
              {userName}
            </span>
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
        <div className="text-gray-800 text-sm truncate max-w-[150px]">
          {address}
        </div>
      </div>

      {/* Email Content Row */}
      <div className="flex items-center gap-3">
        <Image src="/icons/dehaze.svg" alt="dehaze" width={18} height={20} />
        <div className="text-gray-800 text-sm truncate max-w-[150px]">
          {mailTemplate}
        </div>
      </div>
      <span className={style.arrow}></span>
    </div>
  );
};

function Overview({ form }: { form: FormInstance }) {
  const { meetType, enumOptions } = useCalendarStore();
  const [hostUsers, setHostUsers] = useState<any[]>([]);
  const titleType = useMemo(() => {
    if (meetType === MeetType.ONE_TO_ONE) {
      return "1対1";
    }
    return "グループ";
  }, [meetType]);
  const { data: dataHostUser } = useGetListHostUser({});

  useEffect(() => {
    if (dataHostUser) {
      const hostUsersFormat = [];
      Object.entries(dataHostUser).forEach(([key, value]) => {
        hostUsersFormat.push({
          id: value,
          label: key,
          value: value,
        });
      });
      setHostUsers(hostUsersFormat);
    }
  }, [dataHostUser]);

  const watchAddress = Form.useWatch("address", form);
  const mailTemplate = Form.useWatch("email_template", form);
  const userId = Form.useWatch("user_id", form);

  const userName = useMemo(() => {
    const user = hostUsers.find((item) => item.value === userId);
    return user?.label;
  }, [hostUsers, userId]);

  return (
    <div>
      <div className="text-xs">ミーティングタイプ</div>
      <div className="text-base">{titleType}</div>
      <div className="lg:flex lg:gap-x-2">
        <div className="w-full lg:w-1/2">
          <Form.Item
            name="name"
            label={<span className="text-xs">内部名</span>}
            className="!mb-4"
          >
            <Input placeholder="内部名" />
          </Form.Item>
          <Form.Item
            name="user_id"
            label={<span className="text-xs">主催者名</span>}
            className="!mb-4"
          >
            <Select options={hostUsers} placeholder="主催者名" />
          </Form.Item>
          <Form.Item
            name="title"
            label={<span className="text-xs">イベントタイトル</span>}
            className="!mb-4"
          >
            <Input.TextArea placeholder="イベントタイトル" />
          </Form.Item>
          <div className="flex justify-end text-[#2290F1] cursor-pointer">
            パーソナライズ
          </div>
          <Form.Item
            name="address"
            label={<span className="text-xs">場所</span>}
            className="!mb-1"
          >
            <Input placeholder="場所" />
          </Form.Item>
          <Form.Item name="meeting_type" className="!mb-4 w-full lg:w-1/2">
            <Select
              options={enumOptions?.meeting_types}
              placeholder="ビデオ会議リンクを追加"
            />
          </Form.Item>
          <Form.Item
            name="email_template"
            label={<span className="text-xs">メール</span>}
            className="!mb-4"
          >
            <Input.TextArea placeholder="メール" />
          </Form.Item>
          <div className="flex justify-end text-[#2290F1] cursor-pointer">
            パーソナライズ
          </div>
        </div>
        <div
          className={twMerge(
            "w-full lg:w-1/2 relative flex justify-center items-center mt-4 lg:mt-0",
            style.calendarLinkStep1
          )}
        >
          <PreviewComponent
            meetType={meetType}
            address={watchAddress}
            mailTemplate={mailTemplate}
            userName={userName}
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;
