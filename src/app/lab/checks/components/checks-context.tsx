'use client';

import CodeInline from '@/components/code/code-inline';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useKeybindListener from '@/hooks/keyboard/use-keybind-listener';
import React, { useState } from 'react';

const BIT_PACKING_EXAMPLE = `//Example
24 checkboxes: 1000011 01101101 10110100 //24 bytes
raw bytes: [131, 109, 180] //3 bytes
b64 encoding chunks: 10000 110110 110110 110100
b64 representation: http //4 bytes
`;

const ChecksContext = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  useKeybindListener({
    targetKey: 'i',
    callback: () => {
      setIsOpen((prev) => !prev);
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Implementation </DialogTitle>
        <DialogDescription>
          A million checkbox is a simplistic display of large datasets and
          efficient rendering and storage.
        </DialogDescription>
        <div className="relative [--bottom-padding:32px]">
          <div className="absolute bottom-0 z-10 h-(--bottom-padding) w-full bg-gradient-to-b from-background/0 to-background" />
          <div className="no-scrollbar relative max-h-[350px] overflow-y-auto pb-(--bottom-padding) text-justify max-sm:max-h-[330px] max-sm:text-xs">
            Checkboxes can be represented as raw binary.&nbsp;
            <CodeInline>1 for true</CodeInline> and{' '}
            <CodeInline>0 for false</CodeInline>. We are using base64 to encode,
            so every 6 bits are packed into a b64 char. This method of storage
            outperforms (less space needed for b64 string) storing the state of
            each checkbox as a boolean in the DB. When we retrieve the string
            from the db, we decode the b64 string back into raw bytes, and then
            into a boolean array that represents the state of the checkboxes.
            <br />
            <br />
            <CodeInline inline={false}>{BIT_PACKING_EXAMPLE}</CodeInline>
            <br />
            <p>
              <strong>Virtualization</strong>
            </p>
            Only render the checkboxes that are visible in the viewport. This is
            done by calculating the visible start and end indices of the
            checkboxes and then rendering only the checkboxes in that range.
            <br />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChecksContext;
