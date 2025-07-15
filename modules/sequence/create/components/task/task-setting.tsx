import React from "react";
import { Form, Input, Select } from "antd";
import CeeqDatePicker from "@/components/datepicker";
import DMYSelect from "./dmy-select";
import { generateTimeOptions } from "../settings";

function TaskSetting() {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={<span className="text-xs">タスクのタイトル</span>}
          name="title"
          className="!mb-4"
        >
          <Input placeholder="タスクのタイトル" />
        </Form.Item>
        <div className="flex gap-x-[18px]">
          <Form.Item
            label={<span className="text-xs">タスクタイプ</span>}
            name="title"
            className="!mb-4 w-2/3"
          >
            <Select defaultValue="" options={[]} />
          </Form.Item>
          <Form.Item
            label={<span className="text-xs">優先度</span>}
            name="title"
            className="!mb-4 w-1/3"
          >
            <Select defaultValue="" options={[]} />
          </Form.Item>
        </div>
        <Form.Item
          label={<span className="text-xs">管理用シーケンスタイトル</span>}
          name="title"
          className="!mb-4"
        >
          <CeeqDatePicker className="!w-full" />
        </Form.Item>
        <Form.Item
          label={<span className="text-xs">期日</span>}
          name="title"
          className="!mb-0"
        >
          <DMYSelect />
        </Form.Item>
        <Form.Item
          name="trigger"
          label={<span className="text-xs"></span>}
          className="w-2/5 !mb-4"
        >
          <Select defaultValue="" options={generateTimeOptions()} />
        </Form.Item>
        <Form.Item
          label={<span className="text-xs">リマインダー</span>}
          name="title"
          className="!mb-4 w-2/3"
        >
          <Select defaultValue="" options={[]} />
        </Form.Item>
        <Form.Item
          label={<span className="text-xs">メモ</span>}
          name="title"
          className="!mb-0"
        >
          <Input.TextArea
            placeholder="シーケンスタイトル1"
            className="w-full"
            rows={4}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default TaskSetting;
