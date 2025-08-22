import { Button } from '@/components/general/button';
import { cn } from '@/lib/utils';
import {
  IconArrowBigDownFilled,
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
  IconArrowBigUpFilled,
} from '@tabler/icons-react';
import React from 'react';

interface Props extends React.ComponentProps<'div'> {
  showControls: boolean;
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const TouchSquares = ({
  label,
  onClick,
}: {
  label?: React.ReactNode;
  onClick?: () => void;
}) => {
  if (onClick) {
    return (
      <Button className="col-span-1 h-12" onClick={onClick}>
        {label}
      </Button>
    );
  }
  return <div className={'col-span-1 h-12'}></div>;
};

const TouchControls = ({ showControls, onMove, ...props }: Props) => {
  return (
    <div
      className={cn(
        'mx-auto grid w-full max-w-[250px] grid-cols-3 gap-0 overflow-hidden rounded-lg border border-border md:hidden',
        showControls ? 'opacity-100' : 'pointer-events-none opacity-50',
      )}
      {...props}
    >
      <TouchSquares />
      <TouchSquares
        label={<IconArrowBigUpFilled />}
        onClick={() => onMove('up')}
      />
      <TouchSquares />
      <TouchSquares
        label={<IconArrowBigLeftFilled />}
        onClick={() => onMove('left')}
      />
      <TouchSquares />
      <TouchSquares
        label={<IconArrowBigRightFilled />}
        onClick={() => onMove('right')}
      />
      <TouchSquares />
      <TouchSquares
        label={<IconArrowBigDownFilled />}
        onClick={() => onMove('down')}
      />
      <TouchSquares />
    </div>
  );
};

export default TouchControls;
