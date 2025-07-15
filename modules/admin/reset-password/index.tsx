"use client";

import { CeeqLayout } from "@/components/layout";
import { Button, Form, FormProps, Input } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useResetPassword } from "./use-reset-password";
import { useSearchParams } from "next/navigation";

type FieldType = {
  password?: string;
  password_confirmation?: string;
};

export function AdminResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const { mutate: onSubmit, isPending } = useResetPassword(
    (res) => {
      if (res?.success) {
        router.push("/admin/login");
      }
    },
    (err) => {
      const message = err?.data?.message;
      toast.error(message);
    }
  );
  const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {
    onSubmit({
      email,
      token,
      ...values,
    });
  };

  return (
    <Form
      name="basic"
      initialValues={{}}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="パスワード"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="パスワード" className="w-full" />
      </Form.Item>

      <Form.Item<FieldType>
        label="パスワード再確認"
        name="password_confirmation"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="パスワード再確認" className="w-full" />
      </Form.Item>
      <Form.Item label={null} className="flex justify-center !mb-2">
        <Button
          htmlType="submit"
          color="default"
          variant="solid"
          className="!py-4 !bg-[#1A1A1A] mt-4 w-[300px]"
          loading={isPending}
        >
          登録
        </Button>
      </Form.Item>
    </Form>
  );
}

AdminResetPassword.layout = CeeqLayout.ADMIN_AUTH;
