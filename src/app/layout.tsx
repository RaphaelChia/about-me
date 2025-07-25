import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raphael Chia - Portfolio",
  description: "Bringing Ideas to Life.",
  openGraph: {
    title: "Raphael Chia - Portfolio",
    description: "Bringing Ideas to Life.",
    images: [
      {
        url: "/portrait_og.jpeg", // Path to your OG image
        width: 1200,
        height: 630,
        alt: "Raphael Chia Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Chia - Portfolio",
    description: "Bringing Ideas to Life.",
    images: ["/portrait_og.jpeg"], // Same image for Twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex flex-col max-h-dvh min-h-dvh max-w-dvw`}
      >
        <Navbar />
        <div className="border-[2px] border-t-[0px] border-foreground grow overflow-y-scroll flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
