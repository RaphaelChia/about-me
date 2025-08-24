'use client';

import Logo from '@/components/logo';
import Hamburger from '@/components/navbar/hamburger';
import { NAVBAR_ITEMS } from '@/components/navbar/navbar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      !e.target.closest('.mobile-navbar')
    ) {
      setIsOpen(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleOpenClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <Hamburger
        className="mobile-navbar z-10 ml-auto hidden cursor-pointer max-md:flex"
        open={isOpen}
        onClick={handleOpenClick}
      />

      {
        <div
          className={cn(
            'fixed top-0 left-0 hidden w-full flex-col border-b-[2px] border-foreground bg-background transition-all duration-500 max-md:flex',
            isOpen ? 'translate-y-0' : '-translate-y-full',
          )}
        >
          <div className="pad-x-page flex h-[44px] items-center">
            <Logo />
          </div>
          {NAVBAR_ITEMS.map((item) => (
            <div
              key={item.label}
              className="pad-x-page relative flex h-[70px] items-center justify-center overflow-hidden font-sans text-3xl font-black uppercase"
            >
              <Link
                className={cn(
                  'peer z-10 flex h-full w-full items-center justify-center text-center text-background mix-blend-difference',
                  item.disabled && 'pointer-events-none opacity-50',
                )}
                href={item.href}
              >
                {item.label}&nbsp;
                <span className="ml-3 text-sm">
                  {item.disabled ? (item.disabledMessage ?? 'coming soon') : ''}
                </span>
              </Link>
              <div className="absolute top-0 left-0 h-full w-full -translate-x-full bg-foreground transition-all duration-500 ease-out peer-hover:translate-x-0">
                &nbsp;
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
};

export default MobileNavbar;
