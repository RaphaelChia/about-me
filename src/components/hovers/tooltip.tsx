'use client';

import { cn } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        side={props.side}
        className={cn(
          'z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md bg-foreground px-3 py-1.5 text-center text-xs font-semibold text-balance text-background animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

const TooltipText = ({
  children,
  hoverContents,
  side = 'top',
  underline,
  underlinePattern,
  ...props
}: React.ComponentProps<typeof TooltipContent> & {
  hoverContents?: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  underline?: boolean;
  underlinePattern?: 'solid' | 'dashed' | 'dotted';
}) => {
  if (
    !hoverContents ||
    (typeof hoverContents === 'string' && hoverContents === '')
  )
    return <>{children}</>;
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          underline && 'md:underline',
          underlinePattern === 'dotted' && 'decoration-dotted',
          underlinePattern === 'dashed' && 'decoration-dashed',
        )}
        asChild
      >
        {children}
      </TooltipTrigger>
      <TooltipContent sideOffset={props.sideOffset} side={side}>
        {hoverContents}
      </TooltipContent>
    </Tooltip>
  );
};

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipText,
  TooltipTrigger,
};
