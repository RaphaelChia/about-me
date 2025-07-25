"use client";
import { default as Logo, default as MobileLogo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type NAVBAR_ITEM = {
  label: string;
  labelSecondary: string;
  href: string;
  disabled?: boolean;
  disabledMessage?: string;
};

export const NAVBAR_ITEMS: NAVBAR_ITEM[] = [
  {
    label: "projects",
    labelSecondary: "projects",
    href: "/projects",
    disabled: false,
  },
  {
    label: "contact",
    labelSecondary: "contact",
    href: "/contact",
    disabled: false,
  },
];

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      !e.target.closest(".mobile-navbar")
    ) {
      setIsOpen(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);
  return (
    <>
      <IconMenu2
        className="max-md:flex hidden z-10 ml-auto cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {
        <div
          className={cn(
            "hidden max-md:flex bg-background border-b-[2px] border-foreground fixed top-0 left-0 w-full flex-col transition-all duration-500",
            isOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <MobileLogo />
          {NAVBAR_ITEMS.map((item) => (
            <div
              key={item.label}
              className="h-[70px] flex items-center pad-x-page justify-center font-black text-3xl uppercase font-sans relative overflow-hidden"
            >
              <Link
                className={cn(
                  "peer w-full h-full text-center z-10 flex items-center justify-center text-background mix-blend-difference",
                  item.disabled && "opacity-50 pointer-events-none"
                )}
                href={item.href}
              >
                {item.label}{" "}
                <span className="text-sm ml-3">
                  {item.disabled ? item.disabledMessage ?? "coming soon" : ""}
                </span>
              </Link>
              <div className="-translate-x-full peer-hover:translate-x-0 w-full h-full bg-foreground absolute top-0 left-0 transition-all duration-500 ">
                {" "}
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
};

const Dot = ({ color }: { color: string }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={cn("size-3 rounded-full")}
    />
  );
};

const NavbarItem = ({
  label,
  href,
}: React.ComponentProps<"button"> & NAVBAR_ITEM) => {
  return (
    <Link
      href={href}
      className="bg-foreground text-background flex min-w-[120px]"
    >
      <div className="cursor-pointer duration-300 transition-all hover:translate-x-1 hover:translate-y-1 size-full bg-background text-foreground flex items-center justify-center px-3 border border-transparent hover:border-foreground">
        {label}
      </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div
      className={cn(
        "h-[44px] shrink-0 flex items-center pad-x-page gap-8 font-sans sticky top-0 bg-background z-10 transition-all duration-300  border-[2px] border-foreground"
      )}
    >
      <Logo />

      <div className="flex-1 hidden md:flex justify-between lowercase  h-full items-center">
        <div className="flex h-full divide-x-[2px] divide-foreground border-l-[2px] border-r-[2px]">
          {NAVBAR_ITEMS.map((item) =>
            item.disabled ? null : (
              <NavbarItem
                label={item.label}
                labelSecondary={item.labelSecondary}
                href={item.href}
                key={item.label}
                disabled={item.disabled}
                disabledMessage={item.disabledMessage}
              />
            )
          )}
        </div>
        <div className="flex gap-2">
          <Dot color="#29C73F" />
          <Dot color="#FEBC2C" />
          <Dot color="#FF5F57" />
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
};

export default Navbar;
