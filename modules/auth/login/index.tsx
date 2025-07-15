"use client";

import { CeeqLayout } from "@/components/layout";
import { Button, Form, FormProps, Input } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLoginClient } from "./use-login-client";
import Cookies from "js-cookie";
import { ECookieKeys } from "@/const/cookie-keys.const";
import { toast } from "react-toastify";
import { CALLBACK_URL, CALLBACK_URL_BE } from "@/const/env.const";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export function Login() {
  const router = useRouter();
  const { mutate: onSubmit, isPending } = useLoginClient(
    (res) => {
      Cookies.set(ECookieKeys.TOKEN, res?.access_token);
      router.push("/");
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
    router.push("/auth/forgot-password");
  };

  const handleLoginByGoogle = () => {
    const urlRedirect = `${CALLBACK_URL_BE}/auth/sns/google/redirect?callbackUrl=${CALLBACK_URL}/auth/callback&callbackUrlErr=${CALLBACK_URL}/auth/login`;
    window.location.href = urlRedirect;
  };

  const handleLoginByMicrosoft = () => {
    const urlRedirect = `${CALLBACK_URL_BE}/auth/sns/microsoft/redirect?callbackUrl=${CALLBACK_URL}/auth/callback&callbackUrlErr=${CALLBACK_URL}/auth/login`;
    window.location.href = urlRedirect;
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row text-center lg:text-left justify-center mb-2">
        <h1>アカウントをお持ちではありませんか？</h1>
        <Link className="!text-[#00A3BF] !font-bold" href="/auth/register">
          無料機能から始める
        </Link>
      </div>
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
          className="!mb-4"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="メールアドレス" className="w-full" />
        </Form.Item>

        <Form.Item<FieldType>
          label="パスワード"
          name="password"
          className="!mb-4"
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
            className="!py-4 !bg-[#1A1A1A] mt-6 !text-base !font-bold w-[300px] !h-[40px]"
            loading={isPending}
          >
            ログイン
          </Button>
        </Form.Item>
      </Form>
      <div className="border-t border-[#E6E6E6] pt-4 mt-4">
        <div className="flex flex-col gap-y-2 justify-center mx-auto w-[300px]">
          <Button
            className="!bg-[#4285FA] w-full !px-0 !h-[40px] relative"
            onClick={handleLoginByGoogle}
          >
            <Image
              src="/google.svg"
              alt=""
              width={38}
              height={38}
              className="absolute left-0 top-1/2 -translate-y-1/2"
            />
            <span className="text-white font-bold text-base !ml-8">
              Googleを使用してサインイン
            </span>
          </Button>
          <Button
            className="!bg-[#1A1A1A] w-full !px-0 !h-[40px] relative"
            onClick={handleLoginByMicrosoft}
          >
            <Image
              src="/microsoft.svg"
              alt=""
              width={38}
              height={38}
              className="absolute left-0 top-1/2 -translate-y-1/2"
            />
            <span className="text-white font-bold text-base !ml-8">
              Microsoftを使用してサインイン
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

Login.layout = CeeqLayout.AUTH;
