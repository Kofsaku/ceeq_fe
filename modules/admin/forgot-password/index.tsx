"use client";

import { CeeqLayout } from "@/components/layout";
import { Button, Form, FormProps, Input } from "antd";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForgotPassword } from "./use-forgot-password";
import { useEffect, useState } from "react";

type FieldType = {
  email?: string;
};

export function AdminForgotPassword() {
  const [isSentEmail, setIsSentEmail] = useState(false);
  const [form] = Form.useForm();
  const [emailShow, setEmailShow] = useState("");
  const email = Form.useWatch("email", form);

  useEffect(() => {
    if (email) {
      setEmailShow(email);
    }
  }, [email]);
  const { mutate: onSubmit, isPending } = useForgotPassword(
    (res) => {
      console.log("🚀 ~ AdminForgotPassword ~ res:", res);
      setIsSentEmail(true);
    },
    (err) => {
      const message = err?.data?.message;
      toast.error(message);
    }
  );
  const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {
    onSubmit(values);
  };

  return (
    <div>
      {!isSentEmail ? (
        <>
          <h1 className="text-center text-2xl">パスワードをリセット</h1>
          <p className="text-center mt-6 mb-2">
            パスワードリセット情報を受信するEメールアドレスを入力してください。
          </p>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item<FieldType>
              label="メールアドレス"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="メールアドレス" className="w-full" />
            </Form.Item>

            <Form.Item label={null} className="flex justify-center !mb-2">
              <Button
                htmlType="submit"
                color="default"
                variant="solid"
                className="!py-4 !bg-[#1A1A1A] mt-4 w-[300px]"
                loading={isPending}
              >
                ログイン
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className="text-center max-w-[380px] mx-auto">
          <h1 className="text-center text-2xl">すぐに調査いたします。</h1>
          <p className="text-center mt-6 mb-2">
            {emailShow}のceeqアカウントについて、 ただいま記録を確認しています。
          </p>
          <p>
            一致するアカウントが見つかり次第、
            手順が記載されたEメールを送信します。
            今から15分以内に連絡がなければ、
            入力されたEメールアドレスが正しいことを
            もう一度確認して、迷惑メールフォルダをご確認ください。
          </p>
        </div>
      )}
      <div className="flex justify-center mt-3">
        <Link href="/admin/login">ceeq.io/loginに戻る</Link>
      </div>
    </div>
  );
}

AdminForgotPassword.layout = CeeqLayout.ADMIN_AUTH;
