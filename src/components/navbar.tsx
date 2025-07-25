"use client";
import Logo from "@/components/logo";
import useIsScrolled from "@/hooks/use-is-scrolled";
import { cn } from "@/lib/utils";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type NAVBAR_ITEM = {
  label: string;
  href: string;
  disabled?: boolean;
  disabledMessage?: string;
};

export const NAVBAR_ITEMS: NAVBAR_ITEM[] = [
  {
    label: "lab",
    href: "/lab",
    disabled: false,
  },
  { label: "links", href: "/links", disabled: false },
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
          <Link
            href="/"
            className="font-black text-2xl uppercase font-sans h-[60px] pad-x-page flex items-center"
          >
            <Logo />
          </Link>
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

const Navbar = () => {
  const isScrolled = useIsScrolled();
  return (
    <div
      className={cn(
        "h-[60px] flex items-center pad-x-page gap-8 font-sans sticky top-0 bg-background z-10 transition-all duration-300 border-b-[2px] border-transparent",
        isScrolled && "bg-background/80 backdrop-blur-sm"
      )}
    >
      <Link href="/" className="font-semibold text-2xl uppercase font-sans">
        <Logo />
      </Link>
      <div className="flex-1 hidden md:flex justify-end uppercase font-semibold">
        {NAVBAR_ITEMS.map((item) =>
          item.disabled ? null : (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          )
        )}
      </div>
      <MobileNavbar />
    </div>
  );
};

export default Navbar;
