'use client';

import { Button } from '@/components/general/button';
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
import { cn } from '@/lib/utils';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    id: 'chat',
    title: 'Wrong answers only',
    href: '/lab/chat',
    underConstruction: true,
  },
];

const Content = ({ content }: { content: ContentItem }) => {
  if (content.type === 'title') {
    return (
      <div className="text-sm font-semibold text-foreground-secondary">
        {content.title}
      </div>
    );
  }
  return (
    <div key={content.href} className="text-sm font-semibold">
      <Link href={content.href}>{content.title}</Link>
    </div>
  );
};

const ContentsSidebarMobile = () => {
  const pn = usePathname();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(pn.split('/').pop());
  useEffect(() => {
    setValue(pn.split('/').pop());
  }, [pn]);
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
            {value
              ? (contentItems.find((content) => content.title === value)
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
                        key={content.id}
                        value={content.id}
                        className="hover:bg-foreground-neutral hover:text-background"
                        onSelect={() => {
                          setOpen(false);
                          router.push(content.href);
                        }}
                      >
                        {content.title}
                        <IconCheck
                          className={cn(
                            'ml-auto',
                            value === content.title
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

const ContentsSidebar = () => {
  return (
    <>
      <div className="pad-y-page pad-x-page flex h-[calc(100dvh-66px)] w-[200px] shrink-0 flex-col gap-2 max-lg:hidden">
        <div className="sticky top-0 flex flex-col gap-2">
          {contentItems.map((item) => (
            <Content key={`lab-${item.title}`} content={item} />
          ))}
        </div>
      </div>
      <ContentsSidebarMobile />
    </>
  );
};

export default ContentsSidebar;
