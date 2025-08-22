import { cn } from '@/lib/utils';
import React from 'react';

interface KeyboardHintProps extends React.ComponentProps<'div'> {
  keys: React.ReactNode[];
}

const KeyboardHint = ({ keys, className, ...props }: KeyboardHintProps) => {
  return (
    <div
      className={cn('rounded-sm border border-border p-0.5', className)}
      {...props}
    >
      {keys.map((key, idx) => (
        <div key={`keyboard-hint-${idx}`} className="text-xs">
          {key}
        </div>
      ))}
    </div>
  );
};

export default KeyboardHint;
