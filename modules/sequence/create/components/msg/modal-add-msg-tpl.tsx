import React from "react";
import { Form, Input, Modal } from "antd";
import CeeqButton from "@/components/button";
import { CheckOutlined } from "@ant-design/icons";
interface ModalAddMsgTplProps {
  open: boolean;
  onClose: () => void;
}

function ModalAddMsgTpl({ open, onClose }: ModalAddMsgTplProps) {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title="メッセージ作成"
    >
      <div className="flex justify-between my-4">
        <h2>選択したテンプレート: テンプレートタイトル</h2>
        <CeeqButton title="テンプレ変更" isOutlined onClick={onClose} />
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label={<span className="text-xs">管理用シーケンスタイトル</span>}
          name="title"
          className="!mb-4"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input placeholder="シーケンスタイトル1" className="w-full" />
        </Form.Item>
        <Form.Item
          label={<span className="text-xs">管理用シーケンスタイトル</span>}
          name="title"
          className="!mb-4"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input.TextArea
            placeholder="シーケンスタイトル1"
            className="w-full"
            rows={4}
          />
        </Form.Item>
        <div className="flex gap-x-2">
          <CeeqButton title="決定" icon={<CheckOutlined />} />
          <CeeqButton title="キャンセル" isOutlined onClick={onClose} />
        </div>
      </Form>
    </Modal>
  );
}

export default ModalAddMsgTpl;
