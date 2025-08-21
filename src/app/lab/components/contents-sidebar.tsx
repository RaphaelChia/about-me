import Link from 'next/link';

type ContentItem = {
  title: string;
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
    title: 'Lab',
  },
  {
    type: 'link',
    title: '2048',
    href: '/lab/2048',
  },
  {
    type: 'link',
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

const ContentsSidebar = () => {
  return (
    <div className="pad-y-page pad-x-page flex h-[calc(100dvh-66px)] w-[200px] shrink-0 flex-col gap-2">
      <div className="sticky top-0 flex flex-col gap-2">
        {contentItems.map((item) => (
          <Content key={`lab-${item.title}`} content={item} />
        ))}
      </div>
    </div>
  );
};

export default ContentsSidebar;
