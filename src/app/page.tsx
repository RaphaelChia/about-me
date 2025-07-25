import LinkButton from "@/components/general/link-button";
import { TooltipText } from "@/components/hovers/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Sentence = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`flex  gap-2 items-start`, className)}>
      <span className="leading-4.5  min-w-5">&gt;</span>
      <div className="leading-4.5 ">{children}</div>
    </div>
  );
};

const SentenceEmoji = ({
  emoji,
  children,
  className,
}: {
  emoji: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`flex items-center gap-2`, className)}>
      <div className="min-w-5">{emoji}</div> <div>{children}</div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="pad-x-page pad-y-page flex-1 max-w-4xl mx-auto font-mono flex flex-col gap-3">
      <div className="flex gap-4">
        <Image
          src="/portrait.jpg"
          alt="Raphael Chia"
          width={200}
          height={100}
          className="aspect-square object-cover object-bottom  max-md:hidden border-[2px] border-foreground"
        />
        <div className="flex flex-col">
          <TooltipText
            side="top"
            hoverContents={
              <div className="text-6xl tracking-widest p-4">谢松佐</div>
            }
          >
            <span className="font-bold text-6xl ">Raphael Chia</span>
          </TooltipText>
          <SentenceEmoji emoji="⏳">29 y.o </SentenceEmoji>
          <SentenceEmoji emoji="🇸🇬">singaporean</SentenceEmoji>
          <SentenceEmoji emoji="📍">singapore</SentenceEmoji>
          <SentenceEmoji emoji="💼">fullstack engineer </SentenceEmoji>
          <div className="flex gap-4 mt-auto">
            <LinkButton href="/projects">projects</LinkButton>
            <LinkButton href="/links">contact</LinkButton>
          </div>
        </div>
      </div>
      <div className="my-4"></div>
      <Sentence>Welcome to a tldr of my technical journey.</Sentence>
      <Sentence>
        It was 2018 when I enrolled into Singapore Institute of Technology to
        pursue a degree in Software Engineering. I was fortunate enough to
        qualify for a company sponsored scholarship and was able to study for
        free.
      </Sentence>
      <Sentence>
        The degree was extremely hands-on and I learnt a lot about the entire
        software development lifecycle.
      </Sentence>
      <Sentence>
        When I graduated, I served my scholarship&apos;s 3 year bond. Unsure
        what to specialize in, I decided to go into DevOps role.{" "}
        <TooltipText
          hoverContents={
            <div className="max-w-[220px]">
              It was not. I was half doing pre-sale, half doing solution
              architecting, and barely any devops.
            </div>
          }
        >
          <span className="border-b">It was fine.</span>
        </TooltipText>
      </Sentence>
      <Sentence>
        I was able to pick up a few things here and there, but something did not
        click. I thought it was the organization&apos;s comfortable pace.
      </Sentence>
      <Sentence>
        After much consideration, a major decision was made to break my bond
        (💸💸) and moved to yet another DevOps role, but this time, at a
        startup.
      </Sentence>
      <Sentence>
        I loved it. I grew a lot, technically and holistically. Learnt how to
        move fast, be independent, take responsibility, and to work in a team.
      </Sentence>
      <Sentence>
        With Telepathy Labs,{" "}
        <em className="font-bold">
          I started to make more decisions that has consequences
        </em>
        , and here is where I believe I truly grew.
      </Sentence>
      <Sentence>
        It was great, except something still did not click. I started to
        question my passion. I restarted fullstack development on the side.
      </Sentence>
      <Sentence>It finally clicked.</Sentence>
      <Sentence>
        Realised that my passion lies in coding and bringing ideas to life.
      </Sentence>
      <Sentence>
        Everything else was history. I moved on to a fullstack (frontend heavy)
        role with Tensorplex Labs. I owned my products, designed and built&nbsp;
        <LinkButton
          external
          className="inline-flex"
          href="https://backprop.finance"
        >
          backprop.finance
        </LinkButton>
        , reskinned{" "}
        <LinkButton
          external
          className="inline-flex"
          href="https://stake.tensorplex.ai"
        >
          stake.tensorplex.ai
        </LinkButton>{" "}
        and more.
      </Sentence>
      <Sentence>
        Until today, i&apos;m still as hungry as ever for new challenges, to
        gain more experience, build more solutions, maybe even start shipping my
        own Saas. Who knows?
      </Sentence>
      <Sentence>We&apos;ll see.</Sentence>
      <div className="text-xs text-end mt-12">last updated 27 july 2025</div>
    </main>
  );
}
