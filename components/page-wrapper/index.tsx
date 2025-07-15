import React from "react";
import SEOMetadata from "../seo-metadata";
import { ISeoMetadata } from "@/types/seo-metadata.type";
import { IPage } from "@/types/page.type";

interface PageWrapperProps {
  pageContext?: IPage;
  metadata?: ISeoMetadata;
  children:
    | React.ReactElement
    | React.ReactNode
    | React.ReactPortal
    | null
    | undefined;
}

export function PageWrapper(props: PageWrapperProps) {
  return (
    <>
      <SEOMetadata metadata={props.metadata} />

      <div className="main-container">{props.children}</div>
    </>
  );
}
