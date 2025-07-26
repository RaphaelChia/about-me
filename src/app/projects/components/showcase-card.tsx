"use client";
import { Button } from "@/components/general/button";
import LinkButton from "@/components/general/link-button";
import useScreenWidth from "@/hooks/useScreenWidth";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconChevronDown,
  IconChevronUp,
  IconWorld,
} from "@tabler/icons-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useState } from "react";

type imageSrc = string | StaticImport;

export interface Project extends React.ComponentProps<"div"> {
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
  src: imageSrc;
  alt: string;
};
const MobileShowcaseImage = (props: ShowcaseImage) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { isMobile } = useScreenWidth();
  if (!isMobile) return null;
  return (
    <div
      className={cn(
        "md:hidden w-full md:w-4/12 shrink-0 px-6 pb-6 flex flex-col justify-center",
        props.className
      )}
    >
      <Button variant={"link"} onClick={() => setShowPreview((prev) => !prev)}>
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
      {showPreview && (
        <Image
          src={props.src}
          alt={props.alt}
          width={1200}
          height={200}
          className="size-full object-cover object-left border-[1px] border-foreground rounded-xl"
        />
      )}
    </div>
  );
};

const ShowcaseImage = (props: ShowcaseImage) => {
  return (
    <div className="max-md:hidden w-full md:w-4/12 shrink-0 p-6 ">
      <Image
        src={props.src}
        alt={props.alt}
        width={1200}
        height={200}
        className="size-full object-cover object-left border-[1px] border-foreground rounded-xl"
      />
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
      className={cn(
        "flex flex-col divide-y border-b font-mono lowercase",
        className
      )}
      {...props}
    >
      <div className="flex text-base shrink-0 divide-x">
        <div className="grow pad-x-page py-1 h-[34px] ">
          &gt; {projectHeader}
        </div>
        <div className="w-4/12 shrink-0 text-base  pad-x-page text-end flex items-center justify-end gap-4 h-[34px]">
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
      <div className="flex md:flex-row flex-col">
        <div className="grow pad-x-page py-[22px] flex flex-col text-sm">
          <div className="flex">
            <div className="w-[120px] shrink-0">title:</div>
            <div className="grow">{projectTitle}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">description:</div>
            <div className="grow">{desc}</div>
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
            <div className="w-[120px] shrink-0">highlights:</div>
            <div className="grow">{highlights}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">built year:</div>
            <div className="grow">{builtYear}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">challenges:</div>
            <div className="grow">{challenges}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">lessons:</div>
            <div className="grow">{lessons}</div>
          </div>
          <div className="flex">
            <div className="w-[120px] shrink-0">Status:</div>
            <div className="grow">
              {url ? (
                <div className="flex items-center gap-2">
                  deployed{" "}
                  <div className="translate-y-0.5 size-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              ) : (
                "preview only"
              )}
            </div>
          </div>
        </div>
        {showcaseImage ? (
          <>
            <ShowcaseImage
              href={url ?? ""}
              className={cn("max-md:hidden")}
              src={showcaseImage[0]}
              alt={"preview"}
            />

            <MobileShowcaseImage
              href={url ?? ""}
              className={cn("")}
              src={showcaseImage[0]}
              alt={"preview"}
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
