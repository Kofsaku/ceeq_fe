import CeeqSwitch from "@/components/switch";
import { DownOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select } from "antd";
import Image from "next/image";
import React from "react";

const timeScheduleOptions = [
  {
    label: "分前",
    value: "分前",
  },
  {
    label: "時間前",
    value: "時間前",
  },
  {
    label: "日前",
    value: "日前",
  },
  {
    label: "週前",
    value: "週前",
  },
];

function Automation() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className="border border-gray-100 rounded-[4px] p-2 lg:p-5">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-base">ミーティング前のリマインダー</div>
          <div className="text-xs">
            ミーティングが開始される前に参加者にEメールリマインダーを送信します。
          </div>
        </div>
        <div>
          <Form.Item name="reminder" className="!mb-0">
            <CeeqSwitch />
          </Form.Item>
        </div>
      </div>
      <div className="w-full lg:w-1/2 mt-4">
        <Form.List name="reminders">
          {(fields, { add, remove }) => {
            return (
              <div>
                <span className="text-base">
                  リマインダーEメールのスケジュール
                </span>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className="flex gap-2 mt-2 items-center w-full"
                  >
                    <Form.Item name={"weekly"} className="!mb-0 w-1/3">
                      <InputNumber className="!w-full" />
                    </Form.Item>
                    <div className="!flex !gap-x-1 !items-center w-1/2">
                      <Form.Item name={"start"} className="!mb-0 w-full">
                        <Select
                          options={timeScheduleOptions}
                          placeholder="開始"
                        />
                      </Form.Item>
                    </div>
                    {fields.length > 1 ? (
                      <div
                        onClick={() => remove(field.name)}
                        className="cursor-pointer"
                      >
                        <Image
                          src="/delete.svg"
                          width={16}
                          height={18}
                          alt="delete"
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="default"
                    onClick={() => add()}
                    className="!border-none"
                  >
                    <PlusOutlined /> リマインダーを追加
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <div
          className="text-base flex gap-x-1 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <span>リマインダーEメールをカスタマイズ</span>
          {collapsed ? <UpOutlined /> : <DownOutlined />}
        </div>
        {collapsed && (
          <>
            <Form.Item
              name="subject"
              label={<span className="text-xs">件名</span>}
              className="!mb-4"
            >
              <Input.TextArea placeholder="件名" />
            </Form.Item>
            <div className="flex justify-end text-[#2290F1] cursor-pointer">
              パーソナライズ
            </div>
            <Form.Item
              name="body"
              label={<span className="text-xs">本文</span>}
              className="!mb-4"
            >
              <Input.TextArea placeholder="本文" rows={8} />
            </Form.Item>
            <div className="flex justify-end text-[#2290F1] cursor-pointer">
              パーソナライズ
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Automation;
