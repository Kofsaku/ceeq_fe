"use client";

import { ECookieKeys } from "@/const/cookie-keys.const";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Dropdown, Layout, Menu, theme } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./styles.module.scss";

const { Header, Content, Sider } = Layout;

const menuItems: MenuProps["items"] = [
  {
    key: "1",
    icon: <Image src="/admin/users.svg" alt="" width={20} height={20} />,
    label: "顧客管理",
  },
  {
    key: "2",
    icon: (
      <Image
        src="/admin/manage_accounts.svg"
        alt=""
        className="light:invert"
        width={20}
        height={20}
      />
    ),
    label: "運営アカウント",
  },
  {
    key: "3",
    icon: <Image src="/admin/receipt_long.svg" alt="" width={20} height={20} />,
    label: "請求管理",
  },
  {
    key: "4",
    icon: <Image src="/admin/download.svg" alt="" width={20} height={20} />,
    label: "CSVダウンロード",
  },
];

const AdminLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get(ECookieKeys.TOKEN_ADMIN);
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const signOut = () => {
    Cookies.remove(ECookieKeys.TOKEN_ADMIN);
    router.push("/admin/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          type="link"
          className="!text-[#666666] !font-bold"
          onClick={signOut}
        >
          ログアウト
        </Button>
      ),
    },
  ];

  return (
    <Layout className={styles.adminLayout}>
      <Header className="flex items-center justify-between">
        <Image
          src="/logo-admin.svg"
          alt="Vercel logomark"
          width={150}
          height={60}
        />
        <div className="flex gap-x-3 px-4">
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Image
              src="/admin/account_circle.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </Dropdown>
          <Image src="/admin/settings.svg" alt="" width={20} height={20} />
          <Image src="/admin/notifications.svg" alt="" width={16} height={20} />
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          collapsed={collapsed}
        >
          <div
            className={twMerge(
              "flex w-full",
              collapsed ? "justify-center" : "justify-end"
            )}
          >
            <Button
              type="text"
              // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              icon={
                <Image
                  src="/admin/icon-collapse.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              }
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={menuItems}
            className="!bg-[#2290F1]"
          />
        </Sider>
        <Layout className="px-8">
          <Breadcrumb
            items={[
              { title: "Home" },
              { title: "List" },
              { title: "AdminLayout" },
            ]}
            className="!my-4"
          />
          <Content className="py-8 h-[calc(100vh-118px)]">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
