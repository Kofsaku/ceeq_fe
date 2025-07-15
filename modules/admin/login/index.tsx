"use client";

import { CeeqLayout } from "@/components/layout";
import { ECookieKeys } from "@/const/cookie-keys.const";
import { Button, Form, FormProps, Input } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLogin } from "./use-login";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export function AdminLogin() {
  const router = useRouter();
  const { mutate: onSubmit, isPending } = useLogin(
    (res) => {
      Cookies.set(ECookieKeys.TOKEN_ADMIN, res?.token);
      router.push("/admin");
    },
    (err) => {
      const message = err?.data?.message;
      toast.error(message);
    }
  );
  const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {
    onSubmit(values);
  };

  const handleForgotPassword = () => {
    router.push("/admin/forgot-password");
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="メールアドレス"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="メールアドレス" className="w-full" />
      </Form.Item>

      <Form.Item<FieldType>
        label="パスワード"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="パスワード" className="w-full" />
      </Form.Item>
      <Button
        type="link"
        className="!px-0 !text-[#00A3BF] !font-bold"
        onClick={handleForgotPassword}
      >
        パスワードを忘れた場合
      </Button>
      <Form.Item label={null} className="flex justify-center !mb-2">
        <Button
          htmlType="submit"
          color="default"
          variant="solid"
          className="!py-4 !bg-[#1A1A1A] mt-10 w-[300px]"
          loading={isPending}
        >
          ログイン
        </Button>
      </Form.Item>
    </Form>
  );
}

AdminLogin.layout = CeeqLayout.ADMIN_AUTH;
