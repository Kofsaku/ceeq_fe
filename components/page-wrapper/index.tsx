import React from "react";
import SEOMetadata from "../seo-metadata";
import { ISeoMetadata } from "@/types/seo-metadata.type";
import { IPage } from "@/types/page.type";
import { twMerge } from "tailwind-merge";

interface PageWrapperProps {
  pageContext?: IPage;
  metadata?: ISeoMetadata;
  children:
    | React.ReactElement
    | React.ReactNode
    | React.ReactPortal
    | null
    | undefined;
  isActionBar?: boolean;
}

export function PageWrapper(props: PageWrapperProps) {
  const { isActionBar = false } = props;
  return (
    <>
      <SEOMetadata metadata={props.metadata} />
      <div
        className={twMerge("main-container", !isActionBar && "px-4 lg:px-8")}
      >
        {props.children}
      </div>
    </>
  );
}
