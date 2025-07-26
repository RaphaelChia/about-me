import { TooltipText } from "@/components/hovers/tooltip";
import { cn } from "@/lib/utils";
import { IconExternalLink, IconLink } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
interface LinkButtonProps extends React.ComponentProps<"div"> {
  href: string;
  external?: boolean;
  underline?: boolean;
  hideIconMobile?: boolean;
}
const LinkButton = ({
  href,
  children,
  className,
  underline = true,
  external = false,
  hideIconMobile = false,
}: LinkButtonProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 items-center cursor-pointer",
        underline && "border-b",
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
        <IconExternalLink
          className={cn("inline", hideIconMobile && "max-md:hidden")}
          size={16}
        />
      ) : (
        <IconLink
          className={cn("inline", hideIconMobile && "max-md:hidden")}
          size={16}
        />
      )}
    </div>
  );
};

export default LinkButton;
