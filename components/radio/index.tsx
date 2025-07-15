import React from "react";
import { RadioProps, Radio } from "antd";
import styles from "./style.module.scss";

interface CeeqRadioProps extends RadioProps {
  title?: string;
  options?: Array<{
    label: string;
    value: string | number;
    disabled?: boolean;
  }>;
  className?: string;
  value?: string | number;
  onChange?: (e: any) => void;
  layout?: "horizontal" | "vertical";
}

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

function CeeqRadio(props: CeeqRadioProps) {
  const { title, options, className, value, onChange, layout, ...rest } = props;

  if (options) {
    return (
      <Radio.Group
        className={className}
        value={value}
        onChange={onChange}
        {...rest}
        style={layout === "vertical" ? style : undefined}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={styles.radio}
          >
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    );
  }

  return (
    <Radio {...rest} onChange={onChange} className={styles.radio}>
      {title}
    </Radio>
  );
}

export default CeeqRadio;
