"use client";

import { ECookieKeys } from "@/const/cookie-keys.const";
import {
  LeftOutlined,
  LinkOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Space, Spin, Tabs, Typography } from "antd";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { ProviderName, Service, ServiceName } from "./type";
import { useServiceModals } from "./hooks/use-service-modals";
import { ServiceModal } from "./components/service-modal";
import { useExternalAccounts } from "./hooks/use-external-accounts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/use-user-store";

const { Title, Text } = Typography;

const servicesAccount: Service[] = [
  {
    name: ServiceName.LINE,
    icon: "/icons/IconLine.svg",
    color: "bg-green-500",
    connected: false,
    provider: ProviderName.LINE,
  },
  {
    name: ServiceName.GMAIL,
    icon: "/icons/IconGmail.svg",
    color: "bg-red-500",
    connected: false,
    provider: ProviderName.GMAIL,
  },
  {
    name: ServiceName.OUTLOOK,
    icon: "/icons/IconOutlook.svg",
    color: "bg-blue-600",
    connected: false,
    provider: ProviderName.OUTLOOK,
  },
];

const servicesCompany: Service[] = [
  {
    name: ServiceName.LINE,
    icon: "/icons/IconLine.svg",
    color: "bg-green-500",
    connected: false,
    provider: ProviderName.LINE_OA,
  },
  {
    name: ServiceName.GMAIL,
    icon: "/icons/IconGmail.svg",
    color: "bg-red-500",
    connected: false,
    provider: ProviderName.GMAIL_OA,
  },
  {
    name: ServiceName.OUTLOOK,
    icon: "/icons/IconOutlook.svg",
    color: "bg-blue-600",
    connected: false,
    provider: ProviderName.OUTLOOK_OA,
  },
  {
    name: ServiceName.SMS,
    icon: "/icons/IconSMS.svg",
    color: "bg-green-400",
    connected: false,
    provider: ProviderName.SMS,
  },
  {
    name: ServiceName.MESSENGER,
    icon: "/icons/IconMessenger.svg",
    color: "bg-blue-500",
    connected: false,
    provider: ProviderName.MESSENGER,
  },
  {
    name: ServiceName.INSTAGRAM,
    icon: "/icons/IconInstagram.svg",
    color: "bg-pink-500",
    connected: false,
    provider: ProviderName.INSTAGRAM,
  },
  {
    name: ServiceName.X,
    icon: "/icons/IconX.svg",
    color: "bg-black",
    connected: false,
    provider: ProviderName.X,
  },
  {
    name: ServiceName.GOOGLE_MEET,
    icon: "/icons/IconGoogleMeet.svg",
    color: "bg-green-600",
    connected: false,
    provider: ProviderName.GOOGLE_MEET,
  },
  {
    name: ServiceName.ZOOM,
    icon: "/icons/IconZoom.svg",
    color: "bg-blue-400",
    connected: false,
    provider: ProviderName.ZOOM,
  },
];

const ServiceList: React.FC<{
  services: Service[];
  onConnect: (serverSelected: Service | null) => void;
  onDisconnect: (serverSelected: Service | null) => void;
}> = ({ services, onConnect, onDisconnect }) => {
  return (
    <Space direction="vertical" className="w-full" size="middle">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-gray-200 !hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center">
            <span className="text-xl mr-3">
              <img
                src={service.icon}
                alt={service.name}
                className="w-6 h-6 object-contain"
                loading="lazy"
              />
            </span>
            <Text className="font-medium !text-gray-800">{service.name}</Text>
          </div>

          <div className="flex items-center space-x-3">
            {service.connected ? (
              <Button
                icon={<UnlockOutlined />}
                type="primary"
                size="small"
                className="!border-[#F15A22] !bg-[#FEF7F4] !text-gray-600 !hover:border-gray-400 !hover:text-gray-800"
                onClick={() => onDisconnect(service)}
              >
                解除
              </Button>
            ) : (
              <Button
                icon={<LinkOutlined />}
                type="primary"
                size="small"
                className="!bg-orange-500 !hover:bg-orange-600 !border-orange-500 !hover:border-orange-600 px-4"
                onClick={() => onConnect(service)}
              >
                連携
              </Button>
            )}
          </div>
        </div>
      ))}
    </Space>
  );
};

export const Setting: React.FC = () => {
  const {
    open,
    actionType,
    selectedService,
    showConnectConfirm,
    showDisconnectConfirm,
    handleCancel,
  } = useServiceModals();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: dataExternal, isLoading } = useExternalAccounts();
  const [dataServicesAccount, setDataServicesAccount] =
    useState<Service[]>(servicesAccount);
  const [dataServicesCompany, setDataServicesCompany] =
    useState<Service[]>(servicesCompany);

  useEffect(() => {
    const error = searchParams.get("error");
    const sns = searchParams.get("sns");
    const storedService = sessionStorage.getItem("connecting_service");
    const service = storedService ? JSON.parse(storedService) : null;

    if (error && service) {
      toast.error(`${service.name.toUpperCase()}との連携に失敗しました。`);
      sessionStorage.removeItem("connecting_service");
    } else if (service && sns && sns === service.provider) {
      toast.success(`${service.name.toUpperCase()}との連携が完了しました。`);
      sessionStorage.removeItem("connecting_service");
    }
  }, [searchParams]);

  useEffect(() => {
    if (dataExternal) {
      const allExternalAccounts = Object.values(dataExternal).flat();
      const updateServices = (services: Service[]) =>
        services.map((service) => {
          const matchedAccount = allExternalAccounts.find(
            (account) => account.provider === service.provider
          );
          return {
            ...service,
            connected: matchedAccount?.is_active === true,
            id: matchedAccount?.id,
          };
        });

      setDataServicesAccount(updateServices(servicesAccount));
      setDataServicesCompany(updateServices(servicesCompany));
    }
  }, [dataExternal]);

  const signOut = () => {
    Cookies.remove(ECookieKeys.TOKEN);
    useUserStore.getState().clearUserInfo();
    router.push("/auth/login");
  };

  const tabItems = [
    {
      key: "1",
      label: "個人アカウント",
      children: (
        <div className="max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
          <ServiceList
            services={dataServicesAccount}
            onConnect={showConnectConfirm}
            onDisconnect={showDisconnectConfirm}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "会社アカウント",
      children: (
        <div className="max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
          <ServiceList
            services={dataServicesCompany}
            onConnect={showConnectConfirm}
            onDisconnect={showDisconnectConfirm}
          />
        </div>
      ),
    },
  ];

  return (
    <Spin tip="Loading" size="small" spinning={isLoading}>
      <div className="p-6">
        <Title level={2} className="mb-6 text-gray-800">
          アカウント
        </Title>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="shadow-sm">
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
                {[
                  "プロフィール変更",
                  "カレンダー連携",
                  "外部ツール連携",
                  "ログアウト",
                ].map((label, idx) => (
                  <Button
                    key={idx}
                    onClick={label === "ログアウト" ? signOut : undefined}
                    className="w-full text-left justify-start !border-gray-300 !hover:border-gray-400"
                  >
                    {label}
                  </Button>
                ))}
              </Space>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <Title level={4} className="mb-4 text-gray-800">
                外部ツール連携
              </Title>
              <Tabs defaultActiveKey="1" items={tabItems} className="mb-6" />
            </Card>
          </div>
        </div>

        <ServiceModal
          open={open}
          actionType={actionType}
          selectedService={selectedService}
          onCancel={handleCancel}
        />
      </div>
    </Spin>
  );
};
