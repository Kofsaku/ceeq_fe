import React, { useState } from "react";
import { Select } from "antd";
import "antd/dist/reset.css";
import SvgIcon from "@/components/svg-icon";

const { Option } = Select;

const DMYSelect = () => {
  const [selectedDate, setSelectedDate] = useState({
    day: null,
    month: null,
    year: null,
  });

  // Tạo mảng cho ngày (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Tạo mảng cho tháng (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Tạo mảng cho năm (từ 1900 đến năm hiện tại + 10)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 10 },
    (_, i) => 1900 + i
  );

  const handleChange = (value, type) => {
    setSelectedDate((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="flex gap-x-4">
      <Select
        className="w-24"
        placeholder="年"
        value={selectedDate.day}
        onChange={(value) => handleChange(value, "day")}
      >
        {days.map((day) => (
          <Option key={day} value={day}>
            {day}
          </Option>
        ))}
      </Select>

      <Select
        className="w-24"
        placeholder="月"
        value={selectedDate.month}
        onChange={(value) => handleChange(value, "month")}
      >
        {months.map((month) => (
          <Option key={month} value={month}>
            {month}
          </Option>
        ))}
      </Select>

      <Select
        className="w-32"
        placeholder="日"
        value={selectedDate.year}
        onChange={(value) => handleChange(value, "year")}
      >
        {years.map((year) => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </Select>
      <SvgIcon path="/calendar_month.svg" />
    </div>
  );
};

export default DMYSelect;
