"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import React, { useState } from "react";

export const CopyButton = ({
  content,
  copiedChildren = <IconCheck />,
  copyChildren = <IconCopy />,
  onClick,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  content: string;
  children?: React.ReactNode;
  copiedChildren?: React.ReactNode;
  copyChildren?: React.ReactNode;
}) => {
  const [showCopied, setShowCopied] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (onClick) onClick(e);
    if (currentTimeout) clearTimeout(currentTimeout);
    navigator.clipboard.writeText(content);
    setShowCopied(true);
    setCurrentTimeout(setTimeout(() => setShowCopied(false), 1000));
  }
  return (
    // Disable tabbing to prevent focus from being trapped in the button
    // since we want focus to continue to the next input in, e.g. pool deposit form
    <div
      className="decoration-none"
      onClick={handleClick}
      tabIndex={-1}
      {...props}
    >
      {children} {showCopied ? copiedChildren : copyChildren}
    </div>
  );
};
