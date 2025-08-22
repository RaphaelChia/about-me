import { cn } from '@/lib/utils';
import React from 'react';

interface BadgeProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        'rounded-full bg-foreground px-2 py-0.5 text-xs font-semibold text-background',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
