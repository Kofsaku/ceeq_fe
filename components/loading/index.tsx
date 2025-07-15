import React from "react";
import { Spin } from "antd";

function Loading({
  size = "default",
}: {
  size?: "small" | "default" | "large";
}) {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spin size={size} />
    </div>
  );
}

export default Loading;
