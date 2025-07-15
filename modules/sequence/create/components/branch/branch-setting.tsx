import React from "react";
import { Form, Select } from "antd";
import CeeqDatePicker from "@/components/datepicker";
import SvgIcon from "@/components/svg-icon";

function BranchSetting() {
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
        <div className="flex items-center justify-between">
          <Form.Item
            label={<span className="text-xs">分岐2</span>}
            name="title"
            className="!mb-4 w-4/5"
          >
            <Select defaultValue="" options={[]} />
          </Form.Item>
          <div className="mt-2">
            <SvgIcon path="/delete.svg" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Form.Item
            label={<span className="text-xs">分岐2</span>}
            name="title"
            className="!mb-4 w-4/5"
          >
            <Select defaultValue="" options={[]} />
          </Form.Item>
          <div className="mt-2">
            <SvgIcon path="/delete.svg" />
          </div>
        </div>
        <Form.Item
          label={<span className="text-xs">開始日</span>}
          name="title"
          className="!mb-4"
        >
          <CeeqDatePicker className="!w-full" />
        </Form.Item>
        <Form.Item
          label={<span className="text-xs">終了日</span>}
          name="title"
          className="!mb-4"
        >
          <CeeqDatePicker className="!w-full" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default BranchSetting;
