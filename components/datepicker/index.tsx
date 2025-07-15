import React from "react";
import { ConfigProvider, DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ja";
// import "antd/dist/antd.css";
import jaJP from "antd/es/locale/ja_JP";
import styles from "./style.module.scss";
import { twMerge } from "tailwind-merge";
// Cấu hình locale cho dayjs
dayjs.locale("ja");

interface CeeqDatePickerProps extends DatePickerProps {
  className?: string;
}

function CeeqDatePicker(props: CeeqDatePickerProps) {
  return (
    <ConfigProvider locale={jaJP}>
      <DatePicker
        defaultValue={dayjs("2024-12-06")}
        className={twMerge(styles.datePicker, props.className)}
        {...props}
      />
    </ConfigProvider>
  );
}

export default CeeqDatePicker;
