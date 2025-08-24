import { cn } from '@/lib/utils';
import React from 'react';

interface CodeInlineProps {
  inline?: boolean;
  children: React.ReactNode;
  className?: string;
}

const CodeInline = ({
  children,
  className,
  inline = true,
}: CodeInlineProps) => {
  return (
    <div
      className={cn(
        'w-fit rounded-sm border border-border bg-card px-2 py-0.5 text-start font-mono text-xs font-semibold whitespace-pre-wrap',
        inline && 'inline-block',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CodeInline;
