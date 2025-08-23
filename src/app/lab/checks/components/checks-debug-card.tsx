import { cn } from '@/lib/utils';
import React from 'react';

interface ChecksDebugCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

const ChecksDebugCard = ({
  title,
  children,
  className,
  footer,
}: ChecksDebugCardProps) => {
  return (
    <div className={cn('w-fit rounded-md border font-mono text-xs', className)}>
      <div className="px-3 py-1 font-semibold">{title}</div>
      <hr></hr>
      <div className="px-3 py-1">{children}</div>
      {footer && (
        <>
          <hr></hr>
          <div className="px-3 py-1">{footer}</div>
        </>
      )}
    </div>
  );
};

export default ChecksDebugCard;
