import React from "react";
import { Spin } from "antd";
import { Card } from "antd";
import { Avatar } from "antd";
import { Button } from "antd";
import { Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ECookieKeys } from "@/const/cookie-keys.const";
import { useUserStore } from "@/store/use-user-store";
import Link from "next/link";

const actionSetting = [
  {
    label: "プロフィール変更",
    url: "/setting/profile",
  },
  {
    label: "カレンダー連携",
    url: "/setting/calendar-connect",
  },
  {
    label: "外部ツール連携",
    url: "/setting/link-sns",
  },
  {
    label: "ログアウト",
    url: "/auth/login",
  },
];

const { Title } = Typography;

function SettingLayout({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  const router = useRouter();
  const signOut = () => {
    Cookies.remove(ECookieKeys.TOKEN);
    useUserStore.getState().clearUserInfo();
    router.push("/auth/login");
  };

  return (
    <Spin tip="Loading" size="small" spinning={false}>
      <div className="p-6">
        <Title level={2} className="mb-6 text-gray-800">
          アカウント
        </Title>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="shadow-sm h-[calc(100vh-15rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  className="mr-4 !bg-gray-300"
                />
                <Button
                  type="text"
                  icon={<LeftOutlined />}
                  className="!text-gray-600 !hover:text-gray-800"
                />
              </div>

              <Space direction="vertical" className="w-full" size="middle">
                {actionSetting.map((action, idx) => (
                  <Link
                    key={idx}
                    href={action?.url}
                    className="!w-full p-3 flex items-center text-left justify-center border !border-gray-900 !hover:border-gray-400 rounded-[4px] !text-[#1A1A1A] font-bold"
                    onClick={() => {
                      if (action.label === "ログアウト") {
                        signOut();
                      }
                    }}
                  >
                    {action.label}
                  </Link>
                ))}
              </Space>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="shadow-sm h-[calc(100vh-15rem)] overflow-y-auto">
              {children}
            </Card>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default SettingLayout;
