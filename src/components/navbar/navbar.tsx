import { default as Logo } from "@/components/logo";
import MobileNavbar from "@/components/mobile-navbar";
import Dot from "@/components/navbar/dot";
import { cn } from "@/lib/utils";
import { IconArrowsDiagonal2, IconMinus, IconX } from "@tabler/icons-react";
import Link from "next/link";

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
          <Dot
            hoverElement={<IconArrowsDiagonal2 size={10} />}
            color="#29C73F"
          />
          <Dot hoverElement={<IconMinus size={12} />} color="#FEBC2C" />
          <Dot hoverElement={<IconX size={12} />} color="#FF5F57" />
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
};

export default Navbar;
