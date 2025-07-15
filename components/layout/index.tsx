"use client";

import AdminLayout from "./admin-layout";
import WebLayout from "./web-layout";
import { AuthLayout } from "./auth-layout";
import { usePathname } from "next/navigation";
import { AuthAdminLayout } from "./auth-admin-layout";
import BlankLayout from "./blank-layout";

export enum CeeqLayout {
  ADMIN = 1,
  WEB = 2,
  AUTH = 3,
  ADMIN_AUTH = 4,
  BLANK = 5,
}

const availableLayout = {
  [CeeqLayout.ADMIN]: AdminLayout,
  [CeeqLayout.ADMIN_AUTH]: AuthAdminLayout,
  [CeeqLayout.WEB]: WebLayout,
  [CeeqLayout.AUTH]: AuthLayout,
  [CeeqLayout.BLANK]: BlankLayout,
};

export function useGetLayout(layout?: CeeqLayout) {
  const pathName = usePathname();
  const layoutDefault = pathName?.includes("admin")
    ? CeeqLayout.ADMIN
    : CeeqLayout.WEB;
  return availableLayout[layout || layoutDefault];
}
