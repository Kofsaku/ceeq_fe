import React from "react";
import { Switch } from "antd";
import styles from "./style.module.scss";

interface CeeqSwitchProps {
  defaultChecked?: boolean;
}

function CeeqSwitch(props: CeeqSwitchProps) {
  return <Switch defaultChecked {...props} className={styles.switch} />;
}

export default CeeqSwitch;
