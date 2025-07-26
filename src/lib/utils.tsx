import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getAbbreviatedDate = (date: Date) => {
  let retValue = 0;
  const d1 = moment(new Date());
  let suffix = "sec";
  retValue = d1.diff(date, "seconds");
  if (retValue < 60) return `${retValue} ${suffix}`;

  if (Math.abs(d1.diff(date, "minutes")) > 0) {
    retValue = Math.abs(d1.diff(date, "minutes"));
    suffix = `min${retValue > 1 ? "s" : ""}`;
  }
  if (Math.abs(d1.diff(date, "hours")) > 0) {
    retValue = Math.abs(d1.diff(date, "hours"));
    suffix = `hour${retValue > 1 ? "s" : ""}`;
  }
  if (Math.abs(d1.diff(date, "days")) > 0) {
    retValue = Math.abs(d1.diff(date, "days"));
    suffix = `day${retValue > 1 ? "s" : ""}`;
  }
  if (Math.abs(d1.diff(date, "months")) > 0) {
    retValue = Math.abs(d1.diff(date, "months"));
    suffix = `month${retValue > 1 ? "s" : ""}`;
  }
  return `${retValue} ${suffix}`;
};

export const getMetaData = (title: string, description: string) => {
  return {
    title: `Raphael | ${title}`,
    description,
  };
};
