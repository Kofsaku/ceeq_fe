"use client";

import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Card } from "antd";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={twMerge(
        styles.formLogin,
        "w-screen h-screen bg-[#F5F8FA] lg:flex items-center justify-center"
      )}
    >
      <div className="lg:w-1/2 flex items-center justify-end">
        <Image src="/logo.svg" alt="Vercel logomark" width={459} height={144} />
      </div>
      <div className="lg:w-1/2">
        <Card variant="borderless" className="lg:w-[450px]">
          {children}
        </Card>
      </div>
    </div>
  );
}
