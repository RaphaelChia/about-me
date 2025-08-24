'use client';

import CodeInline from '@/components/code/code-inline';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

const Two048Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Implementation </DialogTitle>
        <div className="text-justify max-sm:text-xs">
          2048 core concept is simple: <strong>Array Manipulation.</strong>
          <br />
          In my implementation, there&apos;s only 1 function to move rows to the
          left. So shifting up, down, left, right, all reuses the same function.
          <br />
          To determine if the game is over, i just check for 3 things:
          <div className="flex flex-wrap gap-0.5">
            <CodeInline>!hasHorizontalMerges</CodeInline>
            <CodeInline>!hasVerticalMerges</CodeInline>
            <CodeInline>!hasEmptyCells</CodeInline>
          </div>
          If <strong>all</strong> of these are true, the game is over.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Two048Context;
