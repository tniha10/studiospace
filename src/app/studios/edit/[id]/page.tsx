import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { StudioForm } from "@/components/studios/studio-form";
import { getStudio, ServerApiError } from "@/lib/server-api";
import type { Studio } from "@/lib/types";

export const metadata: Metadata = {
  title: "Edit Studio",
  description: "Update a StudioSpace listing.",
};

// Dynamic studio IDs are resolved on request.
export const instant = false;

type EditStudioPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditStudioPage({ params }: EditStudioPageProps) {
  const { id } = await params;

  let studio: Studio | null = null;
  let errorMessage = "";

  try {
    const result = await getStudio(id);
    studio = result?.studio ?? null;
  } catch (error) {
    errorMessage =
      error instanceof ServerApiError
        ? error.message
        : "This studio could not be loaded right now.";
  }

  if (!studio && !errorMessage) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/my-listings"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft size={18} />
          Back to My Listings
        </Link>

        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Edit Studio
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Update{" "}
            <span className="text-primary">
              {studio ? studio.title : "Your Studio"}
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-base-content/70">
            Change the details below and save. Only the host who
            created this listing can update it.
          </p>
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-7 md:p-8">
          {errorMessage ? (
            <p role="alert" className="text-sm text-error">
              {errorMessage}
            </p>
          ) : studio ? (
            <StudioForm initialStudio={studio} />
          ) : null}
        </div>

      </div>
    </main>
  );
}
