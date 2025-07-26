import ShowcaseCard, { Project } from "@/app/projects/components/showcase-card";
import { getMetaData } from "@/lib/utils";
import { Metadata } from "next";

const projects: Project[] = [
  {
    projectHeader: "My Hello World.",
    projectTitle: "canpark",
    desc: "A parking lot booking system",
    stack: "React, Next.js, html, css, mapbox",
    builtYear: "2021",
    challenges: "Creating a responsive UI, integrating 3rd party apis",
    lessons: "Lorem Ipsum Dolor Sit Amet",
    url: "https://canpark.vercel.com",
    github: "https://github.com/raphaelchia/canpark",
  },
];

const Page = () => {
  return (
    <div className="flex flex-col">
      {projects.map((p, index) => {
        return (
          <ShowcaseCard
            url={p.url}
            github={p.github}
            projectHeader={p.projectHeader}
            key={"project_showcase_" + index}
            projectTitle={p.projectTitle}
            desc={p.desc}
            stack={p.stack}
            builtYear={p.builtYear}
            challenges={p.challenges}
            lessons={p.lessons}
          />
        );
      })}
    </div>
  );
};

export const metadata: Metadata = getMetaData(
  "Projects",
  "Everything I've build."
);

export default Page;
