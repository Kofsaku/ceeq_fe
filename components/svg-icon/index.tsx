"use client";

import React from "react";

function SvgIcon({ path, className }: { path: string; className?: string }) {
  return (
    <object type="image/svg+xml" data={path} className={className}>
      Your browser does not support SVG
    </object>
  );
}

export default SvgIcon;
