import ShowcaseCard, { Project } from "@/app/projects/components/showcase-card";
import { backpropImages, canparkImages, stakeTplxImages } from "@/lib/images";
import { getMetaData } from "@/lib/utils";
import { Metadata } from "next";

const projects: Project[] = [
  {
    projectHeader: "My Hello World.",
    projectTitle: "canpark",
    desc: "Search for parking lots, anywhere in singapore",
    stack: "React, Next.js, html, css, mapbox",
    builtYear: "2021",
    challenges: "Creating a responsive UI, integrating 3rd party apis",
    lessons: "Just start coding, you'll figure it out",
    url: "https://canpark.vercel.com",
    github: "https://github.com/raphaelchia/canpark",
    projectRole: "Sole Developer",
    highlights: "carpark search by map area",
    showcaseImage: canparkImages,
  },
  {
    projectHeader: "reskinning a staking dApp.",
    projectTitle: "Tensorplex Stake",
    desc: "Web interface to interact with Bittensor and Ethereum network, to stake, bridge, and accrue rewards",
    stack: "React, Next.js, html, css, mapbox",
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
    projectHeader: "building a trading terminal",
    projectTitle: "backprop",
    desc: "A trading terminal for the Bittensor ecosystem, to abstract the complexities of actually trading on the network",
    stack: "React, Next.js, TailwindCSS, polkadotJS, viem, ",
    builtYear: "2025",
    challenges:
      "Balancing the UX of a trading terminal with the complexity of the trading logic, ensuring money values are transported correctly, ensuring clean re-renders in a page that has  3k LOC",
    lessons:
      "Applying the right react principles from the start can save a lot of debugging time",

    projectRole:
      "frontend engineer, trading interface, charts, wallet connection and authentication, transaction signing and watchlists",
    url: "https://backprop.finance",
    highlights: "Average USD$3-19mil daily trading volume",
    showcaseImage: backpropImages,
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
