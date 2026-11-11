"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[studiospace] page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
          <AlertTriangle className="text-error" size={30} />
        </div>

        <h1 className="mt-5 text-2xl font-bold">
          Something Went Wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-base-content/70">
          This page could not be loaded. The API may be offline,
          or the request may have failed. Try again in a moment.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="btn btn-primary rounded-full"
          >
            Try Again
          </button>

          <Link href="/" className="btn btn-outline rounded-full">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
