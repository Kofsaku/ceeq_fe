import React, { useMemo, useState, useRef, useEffect } from "react";
import { Popover } from "antd";
import { twMerge } from "tailwind-merge";

interface CeeqPopoverProps {
  title?: string;
  content: React.ReactNode;
  arrow?: "Show" | "Hide" | "Center";
  children: React.ReactNode;
  className?: string;
}

function CeeqPopover(props: CeeqPopoverProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  // Lắng nghe sự thay đổi kích thước của div cha
  useEffect(() => {
    const updateWidth = () => {
      if (triggerRef.current) {
        setWidth(triggerRef.current.offsetWidth);
      }
    };

    // Cập nhật chiều rộng ban đầu
    updateWidth();

    // Sử dụng ResizeObserver để theo dõi thay đổi kích thước
    const resizeObserver = new ResizeObserver(updateWidth);
    if (triggerRef.current) {
      resizeObserver.observe(triggerRef.current);
    }

    // Cleanup khi component unmount
    return () => {
      if (triggerRef.current) {
        resizeObserver.unobserve(triggerRef.current);
      }
    };
  }, []);

  return (
    <div ref={triggerRef} className={twMerge("", props.className ?? "")}>
      <Popover
        placement="bottomLeft"
        title={props.title}
        arrow={props.arrow === "Show"}
        content={props.content}
        trigger={"click"}
        destroyOnHidden
        getPopupContainer={() => triggerRef.current || document.body}
        overlayStyle={{ width: width ? `${width}px` : "auto" }}
      >
        {props.children}
      </Popover>
    </div>
  );
}

export default CeeqPopover;
