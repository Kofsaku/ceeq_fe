"use client";

import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Card } from "antd";

export function AuthAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={twMerge(
        styles.formLogin,
        "w-screen h-screen bg-[#2290F1] lg:flex items-center justify-center"
      )}
    >
      <div className="w-3/7 flex items-center justify-end">
        <Image
          src="/logo-admin.svg"
          alt="Vercel logomark"
          width={459}
          height={144}
        />
      </div>
      <div className="w-4/7">
        <Card variant="borderless" className="w-[555px]">
          {children}
        </Card>
      </div>
    </div>
  );
}
