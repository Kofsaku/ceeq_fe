import React from "react";
import { Tabs, TabsProps } from "antd";
import styles from "./style.module.scss";

interface CeeqTabsProps extends TabsProps {
  items: TabsProps["items"];
  onChange?: TabsProps["onChange"];
  defaultActiveKey?: TabsProps["defaultActiveKey"];
}

function CeeqTabs(props: CeeqTabsProps) {
  return (
    <Tabs
      defaultActiveKey={props.defaultActiveKey ?? "1"}
      items={props.items}
      onChange={props.onChange}
      className={styles.tabs}
      {...props}
    />
  );
}

export default CeeqTabs;
