"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pad-x-page flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="space-y-6">
        <h1 className="text-8xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-foreground text-background font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-foreground font-medium rounded-md hover:bg-foreground hover:text-background transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
