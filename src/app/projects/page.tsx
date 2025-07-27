import ShowcaseCard, { Project } from "@/app/projects/components/showcase-card";
import {
  backpropImages,
  canparkImages,
  hapigenesImages,
  stakeTplxImages,
} from "@/lib/images";
import { getMetaData } from "@/lib/utils";
import { Metadata } from "next";

const projects: Project[] = [
  {
    projectHeader: "building a trading terminal",
    projectTitle: "backprop",
    desc: "A trading terminal for the Bittensor ecosystem, to abstract the complexities of actually trading on the network",
    stack:
      "React, Nextjs, TailwindCSS, polkadotJS, viem, ethersjs nodejs, redis, prisma, recharts, pm2, docker, python, fastapi, DeepseekV3",
    builtYear: "2025",
    challenges:
      "Balancing the UX of a trading terminal with the complexity of the trading logic, ensuring money values are transported correctly, ensuring clean re-renders in a page that has  3k LOC, selective caching",
    lessons:
      "Applying the right react principles from the start can save a lot of debugging time",

    projectRole:
      "frontend engineer, trading interface, charts, wallet connection and authentication, transaction signing and watchlists",
    url: "https://backprop.finance",
    highlights: "~USD$3-19m daily trading volume, ~1m+ monthly page views",
    showcaseImage: backpropImages,
  },
  {
    projectHeader: "reskinning a staking dApp.",
    projectTitle: "Tensorplex Stake",
    desc: "Web interface to interact with Bittensor and Ethereum network, to stake, bridge, and accrue rewards",
    stack: "React, Nextjs, html, css, mapbox",
    builtYear: "2024",
    challenges:
      "Custom wallet and authentication setup, integration with multiple chains, good UX on an api intensive input-based interface",
    lessons:
      "don't attempt to build a storybook if your application team consist of 1 person",
    github: "https://github.com/raphaelchia/canpark",
    url: "stake.tensorplex.ai",
    projectRole:
      "frontend engineer, reskin, bridging interface, points program and leaderboard feature",
    highlights: "1100+ unique wallet users took part in referral program",
    showcaseImage: stakeTplxImages,
  },
  {
    projectHeader: "'IT Helpdesk' for my family",
    projectTitle: "HapiGenes",
    desc: "Web integration with whitelabelled API to serve a fuss free DNA Kit testing service to users",
    stack:
      "React, Nextjs, next Server Actions, supabase, nextAuth, tailwindcss, React-hook-form",
    builtYear: "2025",
    projectRole: "Sole developer",
    challenges:
      "Integrating with third party APIs and handling the complexity of a 50+ question survey with 200+ different options and conditional form",
    lessons: "Just start coding, you'll figure it out",
    highlights: "my mom loved it <3",
    url: "https://kit.hapigenes.com",
    github: "https://github.com/raphaelchia/hapigenes",
    showcaseImage: hapigenesImages,
  },
  {
    projectHeader: "My Hello World.",
    projectTitle: "canpark",
    desc: "Search for parking lots, anywhere in singapore",
    stack: "React, Nextjs, html, css, mapbox",
    builtYear: "2021",
    challenges: "Creating a responsive UI, integrating 3rd party apis",
    lessons: "Just start coding, you'll figure it out",
    url: "https://canpark.vercel.com",
    github: "https://github.com/raphaelchia/canpark",
    projectRole: "Sole Developer",
    highlights: "carpark search by map area",
    showcaseImage: canparkImages,
  },
];

const Page = () => {
  return (
    <div className="flex flex-col">
      {projects.map((p, index) => {
        return <ShowcaseCard key={"project_showcase_" + index} {...p} />;
      })}
    </div>
  );
};

export const metadata: Metadata = getMetaData(
  "Projects",
  "Everything I've build."
);

export default Page;
