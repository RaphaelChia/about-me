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
  src: imageSrc[];
  alt: string;
};

const ShowcaseImage = (props: { src: imageSrc[]; alt: string }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  return (
    <div className="relative ">
      <div className="relative font-mono overflow-hidden rounded-xl cursor-pointer text-background">
        {props.src.length > 1 && (
          <>
            <div
              className={cn(
                "opacity-0 hover:opacity-100 absolute left-0 top-0 w-3/12 h-full bg-foreground/60 flex items-center justify-center",
                currentImageIdx == 0 && "hidden"
              )}
              onClick={() =>
                setCurrentImageIdx((prev) => (prev > 0 ? prev - 1 : prev))
              }
            >
              &lt;
            </div>
            <div
              className={cn(
                "opacity-0 hover:opacity-100 absolute right-0 top-0 w-3/12 h-full bg-foreground/60 flex items-center justify-center",
                currentImageIdx == props.src.length - 1 && "hidden"
              )}
              onClick={() =>
                setCurrentImageIdx((prev) =>
                  prev < props.src.length - 1 ? prev + 1 : prev
                )
              }
            >
              &gt;
            </div>
          </>
        )}
        <Image
          src={props.src[currentImageIdx]}
          alt={props.alt}
          width={1200}
          height={1200}
          className="size-full lg:max-h-[300px] object-cover object-top-left border-[1px] border-foreground rounded-xl aspect-video"
        />
      </div>
      <div className="max-lg:hidden absolute left-[-20px] top-[50%] -translate-y-1/2 flex flex-col gap-1 cursor-pointer">
        {props.src.map((s, i) => {
          return (
            <div
              key={i}
              onClick={() => setCurrentImageIdx(i)}
              className={cn(
                "size-3 rounded-full border transition-colors duration-300",
                currentImageIdx == i ? "bg-foreground" : "bg-background"
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
        " w-full lg:w-5/12 shrink-0 px-6 pb-6 flex flex-col justify-center",
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
      {showPreview && <ShowcaseImage src={props.src} alt={props.alt} />}
    </div>
  );
};

const DesktopShowcaseImage = (props: ShowcaseImage) => {
  return (
    <div className="max-lg:hidden w-full md:w-5/12 shrink-0 p-6 ">
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
      className={cn("flex flex-col  border-b font-mono lowercase ", className)}
      {...props}
    >
      <div className="flex text-base shrink-0 mt-4">
        <div className="grow pad-x-page py-1 h-[34px] truncate font-bold">
          &gt; {projectHeader}
        </div>
        <div className="w-fit shrink-0 text-base pad-x-page text-end flex items-center justify-end gap-4 h-[34px]">
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
      <div className="flex lg:flex-row flex-col">
        <div className="grow pad-x-page py-[22px] flex flex-col text-sm gap-3">
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
            <DesktopShowcaseImage
              href={url ?? ""}
              className={cn("max-md:hidden")}
              src={showcaseImage}
              alt={"preview"}
            />

            <MobileShowcaseImage
              href={url ?? ""}
              className={cn("")}
              src={showcaseImage}
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
