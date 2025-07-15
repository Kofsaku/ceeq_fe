import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxProps } from 'antd';
import { twMerge } from 'tailwind-merge';
import styles from './style.module.scss';

interface CeeqCheckboxProps extends CheckboxProps {
  options: { label: string; value: string }[];
  onChange?: (e: any) => void;
  className?: string;
}

const CeeqCheckbox: React.FC<CeeqCheckboxProps> = (
  props: CeeqCheckboxProps
) => {
  const { options, onChange, className = '', ...rest } = props;
  if (options) {
    return (
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={onChange}
        {...rest}
        className={twMerge(styles.checkbox, className)}
      >
        <Row gutter={[16, 16]}>
          {options.map((option) => (
            <Col span={8}>
              <Checkbox value={option.value}>{option.label}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    );
  }
  return (
    <Checkbox
      {...rest}
      onChange={onChange}
      className={twMerge(styles.checkbox, className)}
    />
  );
};

export default CeeqCheckbox;
