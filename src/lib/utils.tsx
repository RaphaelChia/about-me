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

export const generateCSP = () => {
  const policy = process.env.NEXT_PUBLIC_BACKEND_URL?.includes("localhost")
    ? ""
    : {
        "default-src": ["https://raw.githubusercontent.com"],
        "script-src": [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net",
          "https://unpkg.com",
          "https://*.googletagmanager.com",
        ], // nonce to be implemented
        "style-src": ["'self'", "'unsafe-inline'"], // nonce to be implemented
        "img-src": ["'self'", "data:", "https:"],
        "font-src": ["'self'"],
        "frame-src": ["blob: data:", "'self'"],
        "connect-src": [
          "'self'",
          "https://*.google-analytics.com",
          "https://raw.githubusercontent.com",
          process.env.NEXT_PUBLIC_API_URL,
          "http://3.1.35.240",
        ],
        "worker-src": ["'self'", "blob:"],
        "media-src": ["'self'", "blob: data:"],
        "object-src": ["'self'"],
        "child-src": ["'none'"],
        "form-action": ["'self'"],
        "base-uri": ["'self'"],
        "manifest-src": ["'self'"],
        "block-all-mixed-content": [],
      };

  return Object.entries(policy)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ");
};
