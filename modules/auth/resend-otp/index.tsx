"use client";

import { CeeqLayout } from "@/components/layout";
import { Button, Form, FormProps, Input } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useResendOtpClient } from "./use-resend-otp";

type FieldType = {
  email?: string;
};

export function ResendOtp() {
  const router = useRouter();
  const { mutate: onSubmit, isPending } = useResendOtpClient(
    (res) => {
      router.push("/otp-input");
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
      <div className="text-center mb-5">
        <h1 className="text-xl">確認Eメールが見つかりませんか？</h1>
        <p className="mt-4 text-xs">
          少し待ってからもう一度確認してみるか、迷惑メールフォルダを確認してみてください。または、次のように再送信が可能です。
        </p>
      </div>
      <Form
        name="basic"
        initialValues={{ email: "" }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="メールアドレス"
          name="email"
          className="!mb-4"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="メールアドレス" className="w-full" />
        </Form.Item>
        <Form.Item label={null} className="flex justify-center !mb-2">
          <Button
            htmlType="submit"
            color="default"
            variant="solid"
            className="!py-4 !bg-[#1A1A1A] mt-6 !text-base !font-bold w-[300px] !h-[40px]"
            loading={isPending}
          >
            Eメールを再送信
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

ResendOtp.layout = CeeqLayout.AUTH;
