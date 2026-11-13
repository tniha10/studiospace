import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

import { StudioCard } from "@/components/studios/studio-card";
import { getFeaturedStudios } from "@/lib/server-api";
import type { Studio } from "@/lib/types";

export function FeaturedStudiosSkeleton() {
  return (
    <section className="bg-base-200 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton mt-4 h-10 w-80 max-w-full" />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-base-300 bg-base-100 p-4"
            >
              <div className="skeleton h-32 rounded-lg" />
              <div className="skeleton mt-4 h-4 w-3/4" />
              <div className="skeleton mt-3 h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function FeaturedStudios() {
  let studios: Studio[] = [];
  let errorMessage = "";

  try {
    studios = await getFeaturedStudios();
  } catch {
    errorMessage =
      "Featured studios are unavailable right now. Explore the full catalog to see what is listed.";
  }

  return (
    <section className="bg-base-200 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Featured Studios
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Spaces Creators Are Booking
            </h2>

            <p className="mt-4 max-w-2xl text-base-content/70">
              These are real listings from the StudioSpace database.
              Open one to see the space, host, and available times.
            </p>
          </div>

          <Link
            href="/studios"
            className="btn btn-outline shrink-0 rounded-full px-8"
          >
            View All Studios
            <ArrowRight size={18} />
          </Link>
        </div>

        {errorMessage ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
            <Building2 size={30} className="text-primary" />

            <p className="mt-4 max-w-md text-sm leading-6 text-base-content/70">
              {errorMessage}
            </p>

            <Link
              href="/studios"
              className="btn btn-outline mt-6 rounded-full"
            >
              Explore All Studios
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : studios.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
            <Building2 size={30} className="text-primary" />

            <h3 className="mt-4 text-xl font-semibold">
              No Studios Listed Yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-base-content/70">
              Be the first host on StudioSpace. Add your space and
              it will appear here.
            </p>

            <Link
              href="/add-studio"
              className="btn btn-primary mt-6 rounded-full"
            >
              List Your Studio
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
