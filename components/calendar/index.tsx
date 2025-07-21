import React from "react";
import dayjs from "dayjs";
import jaJP from "antd/es/locale/ja_JP";
import { Calendar, ConfigProvider, Flex } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
dayjs.locale("ja");
dayjs.extend(dayLocaleData);
import styles from "./style.module.scss";

const CeeqCalendar = ({
  className,
  onChange,
}: {
  className?: string;
  onChange?: (value: Dayjs) => void;
}) => {
  const headerRender = ({ value, onChange }) => {
    const handlePrevious = () => {
      const newValue = value.subtract(1, "month");
      onChange(newValue);
    };

    const handleNext = () => {
      const newValue = value.add(1, "month");
      onChange(newValue);
    };

    return (
      <div className="p-4 bg-[#f2f2f2]">
        <Flex justify="space-between" align="center">
          <Button
            type="default"
            size="small"
            icon={<LeftOutlined />}
            onClick={handlePrevious}
          />

          <div className="font-bold">{value.format("MM月 YYYY年")}</div>

          <Button
            type="default"
            size="small"
            icon={<RightOutlined />}
            onClick={handleNext}
          />
        </Flex>
      </div>
    );
  };

  return (
    <div className={twMerge("w-full px-4", className)}>
      <ConfigProvider locale={jaJP}>
        <Calendar
          fullscreen={false}
          className={styles.calendar}
          headerRender={headerRender}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
};

export default CeeqCalendar;
