'use client';

import { Button } from '@/components/general/button';
import LinkButton from '@/components/general/link-button';
import useScreenWidth from '@/hooks/screen/use-screen-width';
import { createLoadingPlaceholder } from '@/lib/image-utils';
import { cn } from '@/lib/utils';
import {
  IconBrandGithub,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconWorld,
} from '@tabler/icons-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

type imageSrc = string | StaticImport;

export interface Project extends React.ComponentProps<'div'> {
  projectTitle: React.ReactNode;
  projectHeader: React.ReactNode;
  desc: React.ReactNode;
  stack: React.ReactNode;
  builtYear: React.ReactNode;
  challenges: React.ReactNode;
  lessons: React.ReactNode;
  url?: string;
  github?: string;
  showcaseImage?: imageSrc[];
  projectRole: React.ReactNode;
  highlights: React.ReactNode;
}

type ShowcaseImage = {
  href: string;
  className: string;
  src: imageSrc[];
  alt: string;
};

const ShowcaseImage = (props: { src: imageSrc[]; alt: string }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [swappingImage, setSwappingImage] = useState(false);

  const swapImage = useCallback(() => {
    setSwappingImage(true);
    setTimeout(() => {
      setSwappingImage(false);
    }, 30);
  }, []);
  // Create a custom loading placeholder with "Loading" text
  const loadingPlaceholder = createLoadingPlaceholder(400, 300, 24);

  return (
    <div className="relative">
      <div className="relative cursor-pointer overflow-hidden rounded-xl font-mono text-2xl text-background">
        {props.src.length > 1 && (
          <>
            <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-foreground/20 lg:hidden">
              <IconChevronLeft strokeWidth={3} />
            </div>
            <div className="absolute top-1/2 right-2 -translate-y-1/2 bg-foreground/20 lg:hidden">
              <IconChevronRight strokeWidth={3} />
            </div>
            <div
              className={cn(
                'absolute top-0 left-0 flex h-full w-3/12 items-center justify-center bg-foreground/60 opacity-0 hover:opacity-100 max-lg:hover:opacity-0',
                currentImageIdx == 0 && 'hidden',
              )}
              onClick={() => {
                setCurrentImageIdx((prev) => (prev > 0 ? prev - 1 : prev));
                swapImage();
              }}
            >
              <IconChevronLeft />
            </div>
            <div
              className={cn(
                'absolute top-0 right-0 flex h-full w-3/12 items-center justify-center bg-foreground/60 opacity-0 hover:opacity-100 max-lg:hover:opacity-0',
                currentImageIdx == props.src.length - 1 && 'hidden',
              )}
              onClick={() => {
                setCurrentImageIdx((prev) =>
                  prev < props.src.length - 1 ? prev + 1 : prev,
                );
                swapImage();
              }}
            >
              <IconChevronRight />
            </div>
          </>
        )}
        {swappingImage ? (
          <div className="lg:max-h-300px aspect-video size-full rounded-xl border-[1px] border-foreground bg-background-secondary"></div>
        ) : (
          <Image
            src={props.src[currentImageIdx]}
            alt={props.alt}
            width={1200}
            height={1200}
            placeholder={loadingPlaceholder}
            className="aspect-video size-full rounded-xl border-[1px] border-foreground object-cover object-top-left select-none lg:max-h-[300px]"
          />
        )}
      </div>
      <div className="absolute bottom-2 left-1/2 flex size-fit -translate-x-1/2 cursor-pointer flex-row gap-1 lg:top-[50%] lg:left-[-20px] lg:-translate-y-1/2 lg:flex-col">
        {props.src.map((s, i) => {
          return (
            <div
              key={i}
              onClick={() => setCurrentImageIdx(i)}
              className={cn(
                'size-3 rounded-full border transition-colors duration-300',
                currentImageIdx == i ? 'bg-foreground' : 'bg-background',
              )}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

const MobileShowcaseImage = (props: ShowcaseImage) => {
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const { isMobile } = useScreenWidth();
  if (!isMobile) return null;
  return (
    <div
      className={cn(
        'flex w-full shrink-0 flex-col justify-center px-6 pb-6 lg:w-5/12',
        props.className,
      )}
    >
      <Button variant={'link'} onClick={() => setShowPreview((prev) => !prev)}>
        {showPreview ? (
          <div className="flex items-center gap-2">
            <span className="w-[60px] text-center">Hide</span> <IconChevronUp />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-[60px]">Preview</span> <IconChevronDown />
          </div>
        )}
      </Button>
      {showPreview && <ShowcaseImage src={props.src} alt={props.alt} />}
    </div>
  );
};

const DesktopShowcaseImage = (props: ShowcaseImage) => {
  return (
    <div className="w-full shrink-0 p-6 max-lg:hidden md:w-5/12">
      <ShowcaseImage src={props.src} alt={props.alt} />
    </div>
  );
};

const ShowcaseCard = ({
  className,
  projectTitle,
  projectHeader,
  desc,
  stack,
  builtYear,
  challenges,
  lessons,
  url,
  github,
  showcaseImage,
  projectRole,
  highlights,
  ...props
}: Project) => {
  return (
    <div
      className={cn('flex flex-col border-b font-mono lowercase', className)}
      {...props}
    >
      <div className="mt-4 flex shrink-0 text-base">
        <div className="pad-x-page h-[34px] grow truncate py-1 font-bold">
          &gt; {projectHeader}
        </div>
        <div className="pad-x-page flex h-[34px] w-fit shrink-0 items-center justify-end gap-4 text-end text-base">
          {url && (
            <LinkButton
              hideIconMobile={true}
              href={url}
              underline={false}
              className="inline-flex leading-none"
              external
            >
              <div className="max-md:hidden">link</div>
              <div className="md:hidden">
                <IconWorld className="inline" size={16} />
              </div>
            </LinkButton>
          )}
          {github && (
            <LinkButton
              hideIconMobile={true}
              href={github}
              underline={false}
              className="inline-flex leading-none"
              external
            >
              <div className="max-md:hidden">github</div>
              <div className="md:hidden">
                <IconBrandGithub className="inline" size={16} />
              </div>
            </LinkButton>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="pad-x-page flex grow flex-col gap-3 py-[22px] text-sm">
          <div className="flex">
            <div className="w-[120px] shrink-0">title:</div>
            <div className="grow">{projectTitle}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">highlights:</div>
            <div className="grow">{highlights}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">built year:</div>
            <div className="grow">{builtYear}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">Status:</div>
            <div className="grow">
              {url ? (
                <div className="flex items-center gap-2">
                  deployed&nbsp;
                  <div className="size-2 translate-y-0.5 animate-pulse rounded-full bg-green-500"></div>
                </div>
              ) : (
                'preview only'
              )}
            </div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">stack:</div>
            <div className="grow">{stack}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">role:</div>
            <div className="grow">{projectRole}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">description:</div>
            <div className="grow">{desc}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">challenges:</div>
            <div className="grow">{challenges}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">lessons:</div>
            <div className="grow">{lessons}</div>
          </div>
        </div>
        {showcaseImage ? (
          <>
            <DesktopShowcaseImage
              href={url ?? ''}
              className={cn('max-md:hidden')}
              src={showcaseImage}
              alt={'preview'}
            />

            <MobileShowcaseImage
              href={url ?? ''}
              className={cn('')}
              src={showcaseImage}
              alt={'preview'}
            />
          </>
        ) : (
          <div>Preview</div>
        )}
      </div>
    </div>
  );
};

export default ShowcaseCard;
