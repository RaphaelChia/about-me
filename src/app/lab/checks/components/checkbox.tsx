'use client';

import CheckboxStorageStats from '@/app/lab/checks/components/checkbox-stats';
import ChecksDebugCard from '@/app/lab/checks/components/checks-debug-card';
import {
  packCheckboxesBase64,
  unpackCheckboxesBase64,
} from '@/app/lab/checks/utils';
import { Button } from '@/components/general/button';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Configuration
const BOX_DIMENSION = 24; // Size of each checkbox box
const CONTAINER_HEIGHT = 300; // Height of the scrollable container
const TOTAL_ITEMS = 1000000; // You can adjust this number

const checkBoxStateAtom = atom<boolean[]>(Array(TOTAL_ITEMS).fill(false));

const string1 = 'httpsphelldotdev';
const string2 = 'FindMeAtRaphaelismeAtGmailDotCom';
const string3 = 'YouCanDownloadMyResumeAtTheContactPage';

export const CheckboxWindow = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerWidth, setContainerWidth] = useState(600); // Default width
  const containerRef = useRef<HTMLDivElement>(null);
  const [checkBoxStateBoolean, setCheckBoxStateBoolean] =
    useAtom(checkBoxStateAtom);

  // Calculate items per row based on container width
  const itemsPerRow = Math.floor(containerWidth / BOX_DIMENSION);
  const totalRows = Math.ceil(TOTAL_ITEMS / itemsPerRow);

  // Virtualization calculations
  const visibleStart = Math.floor(scrollTop / BOX_DIMENSION);
  const visibleCount = Math.ceil(CONTAINER_HEIGHT / BOX_DIMENSION) + 1;
  const visibleEnd = Math.min(visibleStart + visibleCount - 1, totalRows);

  // ResizeObserver to track container width changes
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setContainerWidth(Math.min(width, 600));
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Reset scroll when width changes to prevent issues
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      setScrollTop(0);
    }
  }, [itemsPerRow]);

  const base64StorageString = useMemo(() => {
    return packCheckboxesBase64(checkBoxStateBoolean);
  }, [checkBoxStateBoolean]);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const stringClickHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const string = e.currentTarget.dataset.string;
      if (!string) return;
      const res = unpackCheckboxesBase64(string, TOTAL_ITEMS);
      setCheckBoxStateBoolean(res);
    },
    [setCheckBoxStateBoolean],
  );
  return (
    <>
      <div className="flex w-[450px] flex-col gap-4 max-sm:w-[100%]">
        <ChecksDebugCard title="Storage Efficiency" className="w-full">
          <CheckboxStorageStats />
        </ChecksDebugCard>
        <ChecksDebugCard className="w-full" title="Virtualization Debug">
          <div className="grid grid-cols-3 gap-1 max-sm:grid-cols-2">
            <div>scrollTop:{Math.floor(scrollTop)}</div>
            <div>visibleStart:{visibleStart}</div>
            <div>visibleEnd:{visibleEnd}</div>
            <div>visibleRows:{visibleCount}</div>
            <div>totalRows:{totalRows}</div>
            <div>itemsPerRow:{itemsPerRow}</div>
            <div>totalBoxes:{TOTAL_ITEMS.toLocaleString()}</div>
          </div>
        </ChecksDebugCard>

        <ChecksDebugCard
          footer={
            <div className="flex flex-col gap-1">
              <span className="font-semibold">try it</span>
              <div className="mb-1 flex flex-wrap gap-1">
                <Button
                  onClick={stringClickHandler}
                  data-string={string1}
                  variant={'border'}
                  className="h-fit w-fit rounded-full px-2 py-0.5 text-xs"
                >
                  string1
                </Button>
                <Button
                  onClick={stringClickHandler}
                  data-string={string2}
                  variant={'border'}
                  className="h-fit w-fit rounded-full px-2 py-0.5 text-xs"
                >
                  string2
                </Button>
                <Button
                  onClick={stringClickHandler}
                  data-string={string3}
                  variant={'border'}
                  className="h-fit w-fit rounded-full px-2 py-0.5 text-xs"
                >
                  string3
                </Button>
              </div>
            </div>
          }
          title="Base64 Storage String"
          className="w-full"
        >
          <div className="no-scrollbar max-h-[100px] w-full overflow-y-auto font-mono text-xs wrap-break-word">
            {base64StorageString}
          </div>
        </ChecksDebugCard>
      </div>
      <div>
        <span className="font-mono max-sm:text-xs">
          Check some (or all) boxes below. It&apos;s free.
        </span>
        <div
          ref={containerRef}
          className="flex h-[300px] max-w-[600px] gap-0 overflow-y-scroll border"
          onScroll={handleScroll}
          style={{
            height: CONTAINER_HEIGHT,
            minWidth: BOX_DIMENSION * 2, // Minimum 2 items
          }}
        >
          <div
            className="relative flex flex-col gap-0"
            style={{
              height: totalRows * BOX_DIMENSION,
              width: itemsPerRow * BOX_DIMENSION,
            }}
          >
            {Array.from({ length: visibleEnd - visibleStart }).map((_, idx) => {
              const actualRowIndex = visibleStart + idx;
              return (
                <CheckboxRow
                  key={actualRowIndex}
                  rowIndex={actualRowIndex}
                  boxStartIndex={actualRowIndex * itemsPerRow}
                  boxPerRow={itemsPerRow}
                  totalBoxes={TOTAL_ITEMS}
                  style={{
                    position: 'absolute',
                    top: actualRowIndex * BOX_DIMENSION,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

interface CheckboxRowProps extends React.ComponentProps<'div'> {
  rowIndex: number;
  boxStartIndex: number;
  boxPerRow: number;
  totalBoxes: number;
}

const CheckboxRow = ({
  boxStartIndex,
  boxPerRow,
  totalBoxes,
  style,
}: CheckboxRowProps) => {
  const boxEndIndex = Math.min(boxStartIndex + boxPerRow, totalBoxes);
  const [checkBoxStateBoolean, setCheckBoxStateBoolean] =
    useAtom(checkBoxStateAtom);
  return (
    <div style={style} className="flex gap-0">
      {Array.from({ length: boxEndIndex - boxStartIndex }).map((_, idx) => {
        const actualBoxIndex = boxStartIndex + idx;
        return (
          <CheckboxSingle
            key={actualBoxIndex}
            checked={checkBoxStateBoolean[actualBoxIndex]}
            onChange={(checkState) =>
              setCheckBoxStateBoolean((prev) => {
                const newState = [...prev];
                newState[actualBoxIndex] = checkState;
                return newState;
              })
            }
          />
        );
      })}
    </div>
  );
};

export const CheckboxSingle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <input
      type="checkbox"
      className="size-6"
      checked={checked}
      onChange={() => onChange(!checked)}
    ></input>
  );
};
