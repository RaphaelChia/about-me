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
          <SentenceEmoji emoji="⏳">30 y.o </SentenceEmoji>
          <SentenceEmoji emoji="🇸🇬">singaporean</SentenceEmoji>
          <SentenceEmoji emoji="📍">singapore</SentenceEmoji>
          <SentenceEmoji emoji="💼">Solutions engineer </SentenceEmoji>
          <div className="mt-auto flex flex-wrap gap-[1px] font-bold tracking-widest">
            <LinkButton
              className="bg-foreground p-1 text-background hover:bg-background hover:text-foreground"
              href="/projects"
            >
              projects
            </LinkButton>
            <LinkButton
              className="bg-foreground p-1 text-background hover:bg-background hover:text-foreground"
              href="/lab/2048"
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
      <Sentence>
        Five years across NCS, Telepathy Labs, and Tensorplex Labs — internal
        office management apps, stripping out process inefficiencies one at a
        time, and a spot trading dApp that eventually found a buyer.
      </Sentence>
      <Sentence>
        Now I&apos;m a customer-facing solutions engineer at Mysten Labs,
        representing Sui across APAC — working closest to partners on POCs,
        smart contracts, and full stack architecture.
      </Sentence>
      <Sentence>
        Talks, hackathons, supply chain finance, mobile integrations — putting
        our stack in front of builders and institutions that weren&apos;t
        looking for us yet.
      </Sentence>
      <Sentence>
        Still hungry for new challenges, maybe even shipping my own SaaS one
        day. Who knows? We&apos;ll see.
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
      <div className="mt-12 text-end text-xs">last updated 18 june 2026</div>
    </main>
  );
}
