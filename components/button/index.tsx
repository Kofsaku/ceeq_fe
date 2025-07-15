import { Button } from 'antd';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CeeqButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  htmlType?: HTMLFormElement['type'];
  isOutlined?: boolean;
  isNotBoldTitle?: boolean;
}

function CeeqButton(props: CeeqButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      className={twMerge(
        'flex gap-x-2 items-center !px-4 !py-2 !bg-[#F15A22] !text-white !rounded-[4px] !hover:border-[#F15A22]',
        props.isOutlined && '!bg-transparent !border-[#1A1A1A] !text-[#1A1A1A]',
        props.className
      )}
      loading={props.loading}
      htmlType={props.htmlType ?? 'button'}
    >
      {props.icon}
      <span
        className={twMerge('font-bold', props.isNotBoldTitle && '!font-normal')}
      >
        {props.title}
      </span>
    </Button>
  );
}

export default CeeqButton;
