import { CopyButton } from "@/components/general/copy-button";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL, SHARE_URL } from "@/lib/states";
import { getMetaData } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconCopy,
  IconDownload,
  IconFileCv,
  IconShare3,
} from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex-1 flex items-center justify-center pad-x-page netv1">
      <div className="border-[2px] rounded-xl px-6 py-5 bg-card font-mono flex flex-col gap-1">
        <div className="text-sm max-w-[320px] mb-4">
          If you have any questions or you think we could make something happen,
          feel free to reach out!
        </div>
        <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          <CopyButton
            content={LINKEDIN_URL}
            copyChildren={
              <IconCopy
                className="md:group-hover/linkedin:opacity-100 transition-all duration-300 md:opacity-0"
                size={16}
              />
            }
            copiedChildren={
              <IconCheck
                className="md:group-hover/linkedin:opacity-100 transition-all duration-300 md:opacity-0"
                size={16}
              />
            }
            className="text-sm flex gap-1 items-center group/linkedin cursor-pointer"
          >
            <>
              <IconBrandLinkedin size={18} strokeWidth={1.5} />
              LinkedIn{" "}
            </>
          </CopyButton>
        </Link>
        <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <CopyButton
            content={GITHUB_URL}
            copyChildren={
              <IconCopy
                className="md:group-hover/linkedin:opacity-100 transition-all duration-300 md:opacity-0"
                size={16}
              />
            }
            copiedChildren={
              <IconCheck
                className="md:group-hover/linkedin:opacity-100 transition-all duration-300 md:opacity-0"
                size={16}
              />
            }
            className="text-sm flex gap-1 items-center group/linkedin cursor-pointer"
          >
            <>
              <IconBrandGithub size={18} strokeWidth={1.5} />
              GitHub{" "}
            </>
          </CopyButton>
        </Link>
        <a
          download
          href={RESUME_URL}
          className="text-sm flex gap-1 items-center group/linkedin cursor-pointer"
        >
          <IconFileCv size={18} strokeWidth={1.5} />
          Resume{" "}
          <IconDownload
            className="md:group-hover/linkedin:opacity-100 transition-all duration-300 md:opacity-0"
            size={16}
          />
        </a>
        <CopyButton
          content={SHARE_URL}
          copyChildren={
            <IconCopy
              className="md:group-hover/linkedin:opacity-100 transition-all duration-300 md:opacity-0"
              size={16}
            />
          }
          copiedChildren={
            <IconCheck
              className="md:group-hover/linkedin:opacity-100 transition-all duration-300 md:opacity-0"
              size={16}
            />
          }
          className="text-sm flex gap-1 items-center group/linkedin cursor-pointer"
        >
          <>
            <IconShare3 size={18} strokeWidth={1.5} />
            Share this page{" "}
          </>
        </CopyButton>
      </div>
    </div>
  );
};
export const metadata: Metadata = getMetaData(
  "Contact",
  "raphaelisme@gmail.com"
);
export default Page;
