
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Construction } from "lucide-react";

type ScaffoldPageProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  phase?: string;
  backHref?: string;
  backLabel?: string;
  children?: ReactNode;
};

export function ScaffoldPage({
  eyebrow,
  title,
  description,
  phase = "Phase 1 - Page Preview",
  backHref = "/",
  backLabel = "Back to Home",
  children,
}: ScaffoldPageProps) {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">

      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="max-w-3xl">

          {/* Phase Information */}
          <span className="badge badge-outline mb-6 p-4 text-xs">
            {phase}
          </span>

          {/* Small Heading */}
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            {title}
          </h1>

          {/* Page Description */}
          <p className="mt-5 max-w-2xl text-base leading-7 text-base-content/70">
            {description}
          </p>

        </div>

        {/* Additional Page Content */}
        {children}

        {/* Development Notice */}
        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-start">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Construction size={22} className="text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              This Page Is Under Development
            </h2>

            <p className="mt-2 text-sm leading-7 text-base-content/70">
              This page is currently part of the StudioSpace
              frontend preview. The layout and navigation are
              ready, but some features will become available
              after the backend and database are connected.
            </p>
          </div>

        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href={backHref}
            className="btn btn-outline rounded-full px-6"
          >
            <ArrowLeft size={18} />
            {backLabel}
          </Link>
        </div>

      </div>
    </main>
  );
}
