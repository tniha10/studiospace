import type { Metadata } from "next";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

import { StudioForm } from "@/components/studios/studio-form";

export const metadata: Metadata = {
  title: "Add Studio",
  description: "List your creative studio on StudioSpace.",
};

export default function AddStudioPage() {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Add New Studio
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Share Your Studio With{" "}
            <span className="text-primary">Creative People.</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-base-content/70">
            Do you have a photography studio, podcast room, or
            creative workspace? List your studio on StudioSpace
            and help other creators find the perfect place
            for their projects.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">

          {/* Studio Information */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-7">

            <h2 className="mb-4 text-2xl font-bold">
              Studio Information
            </h2>

            <p className="mb-6 text-sm leading-6 text-base-content/70">
              A complete listing helps creators decide if your
              space fits their project.
            </p>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <CheckCircle className="shrink-0 text-primary" size={20} />
                <p className="text-sm">Studio name and category</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="shrink-0 text-primary" size={20} />
                <p className="text-sm">Hourly price and security deposit</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="shrink-0 text-primary" size={20} />
                <p className="text-sm">Studio location and capacity</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="shrink-0 text-primary" size={20} />
                <p className="text-sm">Studio image and available facilities</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="shrink-0 text-primary" size={20} />
                <p className="text-sm">Description of your studio</p>
              </div>

            </div>

            {/* Important Note */}
            <div className="mt-7 rounded-xl bg-base-200 p-4">
              <p className="text-sm leading-6 text-base-content/70">
                Your name and email are taken automatically from
                the account you are logged in with, so only you
                can edit or delete this listing.
              </p>
            </div>

            <Link
              href="/my-listings"
              className="btn btn-outline mt-6 w-full rounded-full"
            >
              My Studio Listings
              <ArrowRight size={18} />
            </Link>

          </div>

          {/* Listing Form */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-7 md:p-8">
            <h2 className="mb-6 text-2xl font-bold">
              Add Your Studio
            </h2>

            <StudioForm />
          </div>

        </div>

      </div>
    </main>
  );
}
