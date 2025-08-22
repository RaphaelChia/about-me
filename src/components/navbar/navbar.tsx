import { default as Logo } from '@/components/logo';
import Dot from '@/components/navbar/dot';
import MobileNavbar from '@/components/navbar/mobile-navbar';
import { cn } from '@/lib/utils';
import { IconArrowsDiagonal2, IconMinus, IconX } from '@tabler/icons-react';
import Link from 'next/link';

export type NAVBAR_ITEM = {
  label: string;
  labelSecondary: string;
  href: string;
  disabled?: boolean;
  disabledMessage?: string;
};

export const NAVBAR_ITEMS: NAVBAR_ITEM[] = [
  {
    label: 'projects',
    labelSecondary: 'projects',
    href: '/projects',
    disabled: false,
  },
  {
    label: 'contact',
    labelSecondary: 'contact',
    href: '/contact',
    disabled: false,
  },
  {
    label: 'lab',
    labelSecondary: 'lab',
    href: '/lab/2048',
    disabled: false,
  },
];

const NavbarItem = ({
  label,
  href,
}: React.ComponentProps<'button'> & NAVBAR_ITEM) => {
  return (
    <Link
      href={href}
      className="flex min-w-[120px] bg-foreground text-background"
    >
      <div className="flex size-full cursor-pointer items-center justify-center border border-transparent bg-background px-3 text-foreground transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:border-foreground">
        {label}
      </div>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div
      className={cn(
        'pad-x-page sticky top-0 z-10 flex h-[44px] shrink-0 items-center gap-8 border-[2px] border-foreground bg-background font-sans transition-all duration-300',
      )}
    >
      <Logo />

      <div className="hidden h-full flex-1 items-center justify-between lowercase md:flex">
        <div className="flex h-full divide-x-[2px] divide-foreground border-r-[2px] border-l-[2px]">
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
            ),
          )}
        </div>
        <div className="group/dot flex gap-2">
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
