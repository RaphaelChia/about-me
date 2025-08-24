import ChecksContext from '@/app/lab/checks/components/checks-context';
import { Button } from '@/components/general/button';
import { IconBook } from '@tabler/icons-react';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <div className="pad-x-page pt-8">
        <span className="font-mono text-3xl font-bold">
          virtualization, compression, checkboxes.
        </span>
        <p className="font-mono text-sm text-foreground-neutral max-md:text-xs">
          Interactive demo of a <strong>million</strong> checkboxes showcasing
          smooth scrolling through massive datasets while monitoring real-time
          performance metrics and storage efficiency. Made possible with
          bit-packing compression (75% memory reduction), viewport
          virtualization, and state management.
        </p>
        <ChecksContext>
          <Button
            className="mt-4 h-[33px] w-fit flex-1 rounded-lg text-sm"
            variant={'inverted'}
          >
            <IconBook />
            Impl
          </Button>
        </ChecksContext>
      </div>
      {children}
    </div>
  );
};

export default Layout;
