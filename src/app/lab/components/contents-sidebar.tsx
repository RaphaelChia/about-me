'use client';

import Badge from '@/components/general/badge';
import { Button } from '@/components/general/button';
import { TooltipText } from '@/components/hovers/tooltip';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useLastPathname from '@/hooks/navigation/use-last-pathname';
import { cn } from '@/lib/utils';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ContentItem = {
  title: string;
  id: string;
  type: 'title' | 'link';
  underConstruction?: boolean;
  tooltip?: string;
} & (
  | {
      type: 'title';
    }
  | {
      type: 'link';
      href: string;
    }
);
const contentItems: ContentItem[] = [
  {
    type: 'title',
    id: 'lab',
    title: 'Lab',
  },
  {
    type: 'link',
    id: '2048',
    title: '2048',
    href: '/lab/2048',
  },
  {
    type: 'link',
    id: 'checks',
    title: '100,000 checks',
    href: '/lab/checks',
    underConstruction: false,
  },
  {
    type: 'link',
    id: 'chat',
    title: 'Wrong answers only',
    href: '/lab/chat',
    underConstruction: true,
  },
];

const LabContent = ({
  content,
  selected,
}: {
  content: ContentItem;
  selected: boolean;
}) => {
  if (content.type === 'title') {
    return <div className={cn('text-sm font-semibold')}>{content.title}</div>;
  }
  return (
    <div
      key={content.href}
      className={cn('text-sm', content.underConstruction && 'opacity-50')}
    >
      <TooltipText
        side="right"
        hoverContents={content.underConstruction ? 'Under construction' : null}
      >
        {content.underConstruction ? (
          <span className="select-none">{content.title}</span>
        ) : (
          <Link href={content.href} className={cn(selected && 'font-semibold')}>
            {selected && '>'} {content.title}
          </Link>
        )}
      </TooltipText>
    </div>
  );
};

const LabContentsSidebarMobile = () => {
  const [open, setOpen] = useState(false);
  const pathname = useLastPathname();
  const router = useRouter();
  return (
    <div
      className="pad-x-page pad-y-page flex items-center pb-0 lg:hidden"
      style={{ paddingBottom: '0px' }}
    >
      <Label htmlFor="lab-ex" className="text-sm">
        Lab Ex.&nbsp;
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="border"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between rounded-md bg-background"
          >
            {pathname
              ? (contentItems.find((content) => content.id === pathname)
                  ?.title ?? 'Select exercise...')
              : 'Select exercise...'}
            <IconChevronDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] border-border p-0">
          <Command>
            <CommandInput placeholder="Search exercise" className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {contentItems.map((content) => {
                  if (content.type === 'link')
                    return (
                      <CommandItem
                        disabled={content.underConstruction}
                        key={content.id}
                        value={content.id}
                        className="hover:bg-foreground-neutral hover:text-background"
                        onSelect={() => {
                          setOpen(false);
                          router.push(content.href);
                        }}
                      >
                        {content.title}{' '}
                        {content.underConstruction && (
                          <Badge className="absolute top-[50%] right-0 -translate-y-1/2">
                            U/C
                          </Badge>
                        )}
                        <IconCheck
                          className={cn(
                            'ml-auto',
                            pathname === content.title
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    );
                  return null;
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const LabContentsSidebar = () => {
  const pathname = useLastPathname();
  return (
    <>
      <div className="pad-y-page pad-x-page flex min-h-(--content-height) w-[200px] shrink-0 flex-col gap-2 max-lg:hidden">
        <div className="text-sm leading-4">
          My playground where I try to implement fun and whacky ideas.
        </div>
        <div className="pad-y-page sticky top-0 flex flex-col gap-2">
          {contentItems.map((item) => (
            <LabContent
              selected={pathname === item.id}
              key={`lab-${item.title}`}
              content={item}
            />
          ))}
        </div>
      </div>
      <LabContentsSidebarMobile />
    </>
  );
};

export default LabContentsSidebar;
