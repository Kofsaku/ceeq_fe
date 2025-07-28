import CeeqButton from "@/components/button";
import { PageWrapper } from "@/components/page-wrapper";
import { ISeoMetadata } from "@/types/seo-metadata.type";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useGetFilterOptions } from "../hooks/use-get-filter-options";
import ActionBar from "../components/action-bar";
import { useRouter } from "next/navigation";
import { useCreateAccount } from "../hooks/use-create-account";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useGetDetailAccount } from "../hooks/use-get-detail";
import { useUpdateAccount } from "../hooks/use-update-account";

export const CreateAccount = () => {
  const { data: dataOptions } = useGetFilterOptions();
  const [roleOptions, setRoleOptions] = useState<any>([]);
  const metadata: ISeoMetadata = {
    title: "アカウント",
    description: "アカウント",
    image: "",
    url: "",
    siteName: "アカウント",
    type: "website",
    canonical: "",
    disableCrawling: false,
  };
  const [form] = Form.useForm();
  const router = useRouter();

  const { mutate: onCreateAccount } = useCreateAccount(
    () => {
      toast.success("アカウント作成成功");
      router.push(`/setting/accounts`);
    },
    () => {
      toast.error("アカウント作成失敗");
    }
  );

  const { mutate: onUpdateAccount } = useUpdateAccount(
    () => {
      toast.success("アカウント更新成功");
      router.push(`/setting/accounts`);
    },
    () => {
      toast.error("アカウント更新失敗");
    }
  );

  const onFinish = (values: any) => {
    const params = { ...values };
    delete params.password_confirmation;
    if (id) {
      onUpdateAccount({ ...params, id: Number(id) });
    } else {
      onCreateAccount(params);
    }
  };

  useEffect(() => {
    if (!dataOptions) {
      return;
    }
    const roleOptions = dataOptions.roles.map((item: any) => ({
      label: item.display_name,
      value: item.id,
    }));
    setRoleOptions(roleOptions);
  }, [dataOptions]);

  const handleSubmit = () => {
    form.submit();
  };

  const searchParams = useSearchParams();

  const id = searchParams.get("user_id");
  const { data: dataDetail } = useGetDetailAccount(Number(id));

  useEffect(() => {
    if (dataDetail) {
      const { updated_at, user_create_id, role, id, created_at, ...rest } =
        dataDetail;
      form.setFieldsValue({
        ...rest,
        role_id: role.id,
      });
    }
  }, [dataDetail]);

  return (
    <PageWrapper metadata={metadata}>
      <h1 className="text-[24px]">アカウント</h1>
      <div className="mt-4 lg:mt-[35px]">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="bg-white p-4 lg:p-[40px] w-full lg:w-1/2 rounded-[20px]">
              <h2 className="text-lg text-gray-900 mb-4">アカウント編集</h2>
              <div className="flex gap-x-4">
                <Form.Item
                  name="first_name"
                  label="名前"
                  className="w-1/2"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input className="w-full" />
                </Form.Item>
                <Form.Item name="last_name" label=" " className="w-1/2">
                  <Input className="w-full" />
                </Form.Item>
              </div>
              <div className="flex gap-x-4">
                <Form.Item
                  name="first_name_kana"
                  label="フリガナ"
                  className="w-1/2"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name kana!",
                    },
                  ]}
                >
                  <Input className="w-full" />
                </Form.Item>
                <Form.Item name="last_name_kana" label=" " className="w-1/2">
                  <Input className="w-full" />
                </Form.Item>
              </div>
              <Form.Item
                name="email"
                label="メールアドレス"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input type="email" className="w-full" />
              </Form.Item>
              <Form.Item
                label="パスワード"
                name="password"
                className="!mb-2"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="パスワード" className="w-full" />
              </Form.Item>
              <Form.Item
                label="パスワード(確認用)"
                name="password_confirmation"
                className="!mb-2"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="パスワード(確認用)"
                  className="w-full"
                />
              </Form.Item>
            </div>
            <div className="bg-white p-4 lg:p-[40px] w-full lg:w-1/2 rounded-[20px]">
              <div className="flex justify-between">
                <h2 className="text-lg text-gray-900 mb-4">権限</h2>
                <CeeqButton icon={<PlusSquareOutlined />} title="シート追加" />
              </div>
              <Form.Item
                name="role_id"
                label="権限"
                rules={[
                  { required: true, message: "Please select your role!" },
                ]}
              >
                <Select
                  options={roleOptions}
                  placeholder="権限"
                  className="w-full"
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <ActionBar
        onSubmit={handleSubmit}
        onCancel={() => {
          router.push("/setting/accounts");
        }}
      />
    </PageWrapper>
  );
};
