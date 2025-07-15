'use client';

import { CeeqLayout } from '@/components/layout';
import { Button, Form, FormProps, Input } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRegisterClient } from './use-register';
import { toast } from 'react-toastify';
import { API_CLIENT, CALLBACK_URL, CALLBACK_URL_BE } from '@/const/env.const';

type FieldType = {
  email?: string;
  password?: string;
  password_confirmation?: string;
};

export function Register() {
  const router = useRouter();
  const { mutate: onSubmit, isPending } = useRegisterClient(
    (res) => {
      if (res?.success) {
        router.push(`/auth/otp-input?email=${res?.data?.email}`);
      }
    },
    (err) => {
      const message = err?.data?.message;
      toast.error(message);
    }
  );
  const onFinish: FormProps<FieldType>['onFinish'] = (values: any) => {
    onSubmit(values);
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
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
      <div className="text-center">
        <h1 className="text-xl">無料アカウントを作成</h1>
        <p className="text-sm">
          料金はかかりません。クレジットカードなどの決済情報も不要です。
        </p>
      </div>
      <div className="flex flex-col gap-y-2 justify-center mx-auto w-[300px] mt-6 mb-3">
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
      <div className="flex items-center justify-center gap-4 py-3">
        <div className="h-px flex-1 bg-[#E6E6E6]"></div>
        <span className="text-base font-medium text-black">または</span>
        <div className="h-px flex-1 bg-[#E6E6E6]"></div>
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
          className="!mb-2"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="メールアドレス" className="w-full" />
        </Form.Item>

        <Form.Item<FieldType>
          label="パスワード"
          name="password"
          className="!mb-2"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="パスワード" className="w-full" />
        </Form.Item>
        <Form.Item<FieldType>
          label="パスワード再確認 "
          name="password_confirmation"
          className="!mb-2"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="パスワード再確認" className="w-full" />
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
    </div>
  );
}

Register.layout = CeeqLayout.AUTH;
