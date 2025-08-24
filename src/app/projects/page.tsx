import ShowcaseCard, { Project } from '@/app/projects/components/showcase-card';
import {
  backpropImages,
  canparkImages,
  dojoImages,
  hapigenesImages,
  stakeTplxImages,
} from '@/lib/images';
import { getMetaData } from '@/lib/utils';
import { Metadata } from 'next';

const projects: Project[] = [
  {
    projectHeader: 'building a trading terminal',
    projectTitle: 'backprop',
    desc: 'A trading terminal for the Bittensor ecosystem, to abstract the complexities of actually trading on the network',
    stack:
      'React, Nextjs, TailwindCSS, PolkadotJS, Viem, Wagmi, Ethersjs, Nodejs, Redis, Prisma, Recharts, PM2, Docker, Python, FastAPI, DeepseekV3',
    builtYear: '2025',
    challenges:
      'Balancing the UX of a trading terminal with the complexity of the trading logic, ensuring money values are transported correctly, ensuring clean re-renders in a page that has  3k LOC, selective caching',
    lessons:
      'Applying the right react principles from the start can save a lot of debugging time',

    projectRole:
      'frontend engineer, trading interface, charts, wallet connection and authentication, transaction signing and watchlists',
    url: 'https://backprop.finance',
    highlights: '~USD$3-19m daily trading volume, ~1m+ monthly page views',
    showcaseImage: backpropImages,
  },
  {
    projectHeader: 'reskinning a staking dApp.',
    projectTitle: 'Tensorplex Stake',
    desc: 'Web interface to interact with Bittensor and Ethereum network, to stake, bridge, and accrue rewards',
    stack:
      'React, Nextjs, Html, Css, Ethersjs, Viem, PolkadotJS, Wagmi, Tailwindcss',
    builtYear: '2024',
    challenges:
      'Custom wallet and authentication setup, integration with multiple chains, good UX on an api intensive input-based interface',
    lessons:
      "Don't attempt to build a storybook if your application team consist of 1 person",
    url: 'stake.tensorplex.ai',
    projectRole:
      'Frontend engineer, reskin, bridging interface, points program and leaderboard feature',
    highlights: '1100+ unique wallet users took part in referral program',
    showcaseImage: stakeTplxImages,
  },
  {
    projectHeader: "'IT Helpdesk' for my family",
    projectTitle: 'HapiGenes',
    desc: "A project done for my mum's DNA whitelabelling business. This is a web application that integrates with whitelabelled API to serve a fuss free DNA Kit testing service to users",
    stack:
      'React, Nextjs, Server Actions, Supabase, NextAuth, Tailwindcss, React-hook-form',
    builtYear: '2025',
    projectRole: 'Sole developer',
    challenges:
      'Integrating with third party APIs and handling the complexity of a 50+ question survey with 200+ different options and conditional form',
    lessons:
      "Sometimes at the mercy of 3rd party apis, your code is forced to look ugly, and that's ok.",
    highlights: 'my mom loved it <3',
    url: 'https://kit.hapigenes.com',
    showcaseImage: hapigenesImages,
  },
  {
    projectHeader: 'Internal AI Labelling Platform',
    projectTitle: 'Dojo',
    desc: 'A platform to label data for training AI models',
    stack: 'React, Nextjs, TailwindCSS',
    builtYear: '2025',
    challenges: 'Figuring out the best user experience for labelling data',
    lessons: 'Simple but bespoke UI beats fancy UI with bad UX',
    highlights: 'Completed in 3 working days from scratch',
    projectRole: 'Sole Developer',
    showcaseImage: dojoImages,
  },
  {
    projectHeader: 'My Hello World.',
    projectTitle: 'canpark',
    desc: 'Search for parking lots, anywhere in singapore',
    stack: 'React, Nextjs, Html, Css, Mapbox',
    builtYear: '2021',
    challenges: 'Creating a responsive UI, integrating 3rd party apis',
    lessons: "Just start coding, you'll figure it out",
    url: 'https://canpark.vercel.com',
    github: 'https://github.com/raphaelchia/canpark',
    projectRole: 'Sole Developer',
    highlights: 'carpark search by map area',
    showcaseImage: canparkImages,
  },
];

const Page = () => {
  return (
    <div className="flex flex-col">
      {projects.map((p, index) => {
        return <ShowcaseCard key={'project_showcase_' + index} {...p} />;
      })}
    </div>
  );
};

export const metadata: Metadata = getMetaData(
  'Projects',
  "Everything I've build.",
);

export default Page;
