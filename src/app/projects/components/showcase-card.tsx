import LinkButton from "@/components/general/link-button";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconWorld } from "@tabler/icons-react";
import React from "react";
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
}
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
  ...props
}: Project) => {
  return (
    <div
      className={cn("flex divide-x font-mono lowercase", className)}
      {...props}
    >
      <div className="flex flex-col border-b w-8/12  text-base shrink-0 divide-y">
        <div className="pad-x-page py-1 h-[34px]">&gt; {projectHeader}</div>
        <div className="pad-x-page py-[22px] flex flex-col text-sm">
          <div className="flex">
            <div className="w-[140px] shrink-0">title:</div>
            <div className="grow">{projectTitle}</div>
          </div>
          <div className="flex">
            <div className="w-[140px] shrink-0">description:</div>
            <div className="grow">{desc}</div>
          </div>
          <div className="flex">
            <div className="w-[140px] shrink-0">stack:</div>
            <div className="grow">{stack}</div>
          </div>
          <div className="flex">
            <div className="w-[140px] shrink-0">built: year</div>
            <div className="grow">{builtYear}</div>
          </div>
          <div className="flex">
            <div className="w-[140px] shrink-0">challenges:</div>
            <div className="grow">{challenges}</div>
          </div>
          <div className="flex">
            <div className="w-[140px] shrink-0">lessons:</div>
            <div className="grow">{lessons}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-4/12">
        <div className="text-base shrink-0 border-b pad-x-page text-end flex items-center justify-end gap-4 h-[34px]">
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
        <div></div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
