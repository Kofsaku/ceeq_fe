"use client";

import React, { useRef } from "react";
import { Button, Form, Input } from "antd";
import { CeeqLayout } from "@/components/layout";
import { useVerifyOtpClient } from "./use-verify-otp";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function OtpInput() {
  const inputRefs = useRef<any>([]);
  const router = useRouter();
  const queries = useSearchParams();
  const [form] = Form.useForm();
  const email = queries.get("email");
  const { mutate: onSubmit, isPending } = useVerifyOtpClient(
    (res) => {
      if (res?.success) {
        toast.success(res?.message);
        router.push("/auth/login");
      }
    },
    (err) => {
      const message = err?.data?.message;
      toast.error(message);
    }
  );
  const handleInput = (index: number, e: any) => {
    const value = e.target.value;
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onFinish = (values: any) => {
    const otp = Object.values(values).join("");
    onSubmit({ email, verification_code: otp });
  };

  const formRef = useRef(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit(); // Gọi hàm submit
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-xl">Eメールを確認してください</h1>
        <p>確認リンクを次のメールアドレス宛に送信しました。</p>
        <p className="font-bold">{email}</p>
        <div className="flex justify-end mt-3">確認コード</div>
      </div>
      <div className="mx-auto max-w-md px-4">
        <Form
          name="otp_form"
          onFinish={onFinish}
          className="flex items-center justify-center gap-2"
          form={form}
          ref={formRef}
        >
          {[...Array(6)].map((_, index) => (
            <Form.Item
              key={index}
              name={`otp-${index}`}
              rules={[{ required: true, message: "" }]}
              className="mb-0"
            >
              <Input
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                maxLength={1}
                className="w-12 h-8 text-center text-lg font-medium !border-0 !border-b-1 !border-[#B3B3B3] !rounded-none focus:!shadow-none focus:!border-b-blue-500"
                onChange={(e) => handleInput(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputMode="numeric"
              />
            </Form.Item>
          ))}
        </Form>
      </div>
      <div className="font-bold">
        <Link href="/auth/resend-otp" className="!text-[#00A3BF]">
          認証コードが取得できない場合
        </Link>
      </div>
      <Form.Item label={null} className="flex justify-center !mb-2">
        <Button
          color="default"
          variant="solid"
          className="!py-4 !bg-[#1A1A1A] mt-6 !text-base !font-bold w-[300px] !h-[40px]"
          loading={isPending}
          onClick={handleSubmit}
        >
          次へ
        </Button>
      </Form.Item>
    </div>
  );
}

OtpInput.layout = CeeqLayout.AUTH;
