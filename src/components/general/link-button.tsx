import { TooltipText } from "@/components/hovers/tooltip";
import { cn } from "@/lib/utils";
import { IconExternalLink, IconLink } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
interface LinkButtonProps extends React.ComponentProps<"div"> {
  href: string;
  external?: boolean;
}
const LinkButton = ({
  href,
  children,
  className,
  external = false,
}: LinkButtonProps) => {
  return (
    <div
      className={cn(
        "border-b flex gap-2 items-center cursor-pointer",
        className
      )}
    >
      <Link
        className=""
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {external ? (
          <TooltipText hoverContents={"This takes you to an external site"}>
            <div>{children}</div>
          </TooltipText>
        ) : (
          children
        )}
      </Link>{" "}
      {external ? (
        <IconExternalLink className="inline" size={16} />
      ) : (
        <IconLink className="inline" size={16} />
      )}
    </div>
  );
};

export default LinkButton;
