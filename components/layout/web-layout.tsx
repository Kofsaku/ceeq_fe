"use client";

import type { MenuProps } from "antd";
import { Button, Dropdown, Layout, Menu, Drawer } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./styles.module.scss";
import { ECookieKeys } from "@/const/cookie-keys.const";
import Cookies from "js-cookie";
import SvgIcon from "../svg-icon";
import { useRouter } from "next/navigation";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useUserStore } from "@/store/use-user-store";
import { InitUser } from "../init-user";

const { Header, Content, Sider } = Layout;

const menuItems: MenuProps["items"] = [
  {
    key: "1",
    icon: <SvgIcon path="/admin/users.svg" className={styles.icon} />,
    label: "顧客管理",
    children: [{ key: "/sequence/list", label: "シーケンス" }],
  },
  {
    key: "/sequence",
    icon: <SvgIcon path="/account_tree.svg" className={styles.icon} />,
    label: "シーケンス",
  },
  {
    key: "3",
    icon: <SvgIcon path="/admin/receipt_long.svg" className={styles.icon} />,
    label: "請求管理",
  },
  {
    key: "/setting",
    icon: <SvgIcon path="/admin/settings.svg" className={styles.icon} />,
    label: "設定",
  },
];

const WebLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const token = Cookies.get(ECookieKeys.TOKEN);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token]);

  const signOut = () => {
    Cookies.remove(ECookieKeys.TOKEN);
    useUserStore.getState().clearUserInfo();
    router.push("/auth/login");
  };

  const dropdownItems: MenuProps["items"] = [
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

  const handleMenuClick = (e: any) => {
    router.push(e?.key);
    // Close mobile drawer after navigation
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const renderSidebarContent = () => (
    <div className="h-full flex flex-col">
      {!isMobile && (
        <div
          className={twMerge(
            "flex w-full p-2",
            collapsed ? "justify-center" : "justify-end"
          )}
        >
          <Button
            type="text"
            className="!bg-white !w-[25px] !h-[25px] !rounded-[2px]"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      )}
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        items={menuItems}
        className="!bg-[#333333] flex-1 !border-r-0"
        onSelect={handleMenuClick}
      />
    </div>
  );

  return (
    <Layout className={twMerge(styles.webLayout, "min-h-screen")}>
      <Header className="flex items-center justify-between px-4 !h-16">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button
              type="text"
              icon={
                <div className="flex flex-col gap-1">
                  <div className="w-5 h-0.5 bg-white"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                </div>
              }
              onClick={toggleMobileDrawer}
              className="!text-white hover:!bg-gray-700"
            />
          )}
          <Image
            src="/logo-admin.svg"
            alt="Vercel logomark"
            width={150}
            height={60}
          />
        </div>
        <div className="flex gap-x-3 px-4">
          <Dropdown menu={{ items: dropdownItems }} placement="bottomLeft">
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

      <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Sider
            width={200}
            style={{ background: "#333333" }}
            collapsed={collapsed}
            className="!bg-[#333333]"
          >
            {renderSidebarContent()}
          </Sider>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            title={null}
            placement="left"
            onClose={() => setMobileDrawerOpen(false)}
            open={mobileDrawerOpen}
            width={250}
            className="!p-0"
            bodyStyle={{ padding: 0, background: "#333333" }}
            headerStyle={{ display: "none" }}
          >
            {renderSidebarContent()}
          </Drawer>
        )}

        <Layout className={twMerge("px-8", isMobile && "!px-4")}>
          <Content
            className={twMerge("py-8 overflow-auto", isMobile && "!py-4")}
            style={{ minHeight: "calc(100vh - 64px)" }}
          >
            <InitUser />
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default WebLayout;
