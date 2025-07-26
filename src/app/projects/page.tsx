import { getMetaData } from "@/lib/utils";
import { Metadata } from "next";

const Page = () => {
  return <div>Lets go</div>;
};

export const metadata: Metadata = getMetaData(
  "Projects",
  "Everything I've build."
);

export default Page;
