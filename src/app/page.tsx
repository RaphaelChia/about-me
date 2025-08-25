'use client';

import LinkButton from '@/components/general/link-button';
import { TooltipText } from '@/components/hovers/tooltip';
import { createLoadingPlaceholder } from '@/lib/image-utils';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const Sentence = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`flex items-start gap-2`, className)}>
      <span className="min-w-5 leading-4.5">&gt;</span>
      <div className="leading-4.5">{children}</div>
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
  // Create a custom loading placeholder with "Loading" text
  const loadingPlaceholder = createLoadingPlaceholder(200, 200, 16);

  return (
    <main className="pad-x-page pad-y-page mx-auto flex max-w-4xl flex-1 flex-col gap-3 font-mono">
      <div className="flex gap-4">
        <Image
          src="/portrait.jpg"
          alt="Raphael Chia"
          width={200}
          height={100}
          placeholder={loadingPlaceholder}
          className="aspect-square border-[2px] border-foreground object-cover object-bottom max-md:hidden"
        />
        <div className="flex flex-col">
          <TooltipText
            side="top"
            hoverContents={
              <div className="p-4 text-6xl tracking-widest">谢松佐</div>
            }
          >
            <div className="text-6xl font-bold">Raphael Chia</div>
          </TooltipText>
          <SentenceEmoji emoji="⏳">29 y.o </SentenceEmoji>
          <SentenceEmoji emoji="🇸🇬">singaporean</SentenceEmoji>
          <SentenceEmoji emoji="📍">singapore</SentenceEmoji>
          <SentenceEmoji emoji="💼">fullstack engineer </SentenceEmoji>
          <div className="mt-auto flex flex-wrap gap-[1px] font-bold tracking-widest">
            <LinkButton
              className="bg-foreground p-1 text-background hover:bg-background hover:text-foreground"
              href="/projects"
            >
              projects
            </LinkButton>
            <LinkButton
              className="bg-foreground p-1 text-background hover:bg-background hover:text-foreground"
              href="/lab"
            >
              lab
            </LinkButton>
            <LinkButton
              className="bg-foreground px-1 text-background hover:bg-background hover:text-foreground"
              href="/contact"
            >
              contact
            </LinkButton>
          </div>
        </div>
      </div>
      <div className="my-4"></div>
      <Sentence>Hey 👋</Sentence>
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
        what to specialize in, I decided to go into DevOps.&nbsp;
        <TooltipText
          underline
          underlinePattern="dotted"
          hoverContents={
            <div className="max-w-[220px]">
              It was not. I was half doing pre-sale, half doing solution
              architecting, and barely any devops.
            </div>
          }
        >
          <div className="inline-flex">It was fine.</div>
        </TooltipText>
      </Sentence>
      <Sentence>
        I was able to pick up a few things here and there, but something did not
        click. I thought it was the organization&apos;s comfortable pace.
      </Sentence>
      <Sentence>
        After much consideration, a major decision was made to terminate my bond
        early
        <TooltipText
          hoverContents={<div>The sum was 130% my school fees :(</div>}
        >
          <span>(💸💸)</span>
        </TooltipText>
        &nbsp; and moved to yet another DevOps role, but this time, at a
        startup.
      </Sentence>
      <Sentence>
        I loved it. I grew a lot, technically and holistically. Learnt how to
        move fast, be independent, take responsibility, and to work in a team.
      </Sentence>
      <Sentence>
        With Telepathy Labs,&nbsp;
        <em className="font-bold">
          I began making more decisions that came with consequences
        </em>
        . This is where true growth happened for me.
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
        , reskinned&nbsp;
        <LinkButton
          external
          className="inline-flex"
          href="https://stake.tensorplex.ai"
        >
          stake.tensorplex.ai
        </LinkButton>
        &nbsp;and more.
      </Sentence>
      <Sentence>
        Until today, i&apos;m still as hungry as ever for new challenges, to
        gain more experience, build more solutions, maybe even start shipping my
        own Saas. Who knows? We&apos;ll see.
      </Sentence>
      <Sentence>
        Drop me an email or a message on&nbsp;
        <LinkButton
          external
          className="inline-flex"
          href="https://www.linkedin.com/in/raphaelchia"
        >
          <div className="flex items-center gap-1">linkedin</div>
        </LinkButton>
        &nbsp;to connect!
      </Sentence>
      <div className="mt-12 text-end text-xs">last updated 27 july 2025</div>
    </main>
  );
}
