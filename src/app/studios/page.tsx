import { Suspense } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

import {
  StudiosResults,
  StudiosResultsSkeleton,
} from "@/components/studios/studios-results";
import { STUDIO_CATEGORIES, getCategoryBySlug } from "@/lib/constants";

type StudiosSearchParams = Promise<{ category?: string }>;

type StudiosPageProps = {
  searchParams: StudiosSearchParams;
};

export default function StudiosPage({ searchParams }: StudiosPageProps) {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Explore Studios
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Find Your Perfect{" "}
            <span className="text-primary">Creative Space</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-base-content/70">
            Explore photography studios, podcast rooms,
            music studios, filming spaces, and other creative
            workspaces. Find a studio that matches your
            project and budget.
          </p>
        </div>

        <Suspense
          fallback={
            <div>
              <div className="mb-10 flex flex-wrap gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton h-8 w-28 rounded-full"
                  />
                ))}
              </div>

              <StudiosResultsSkeleton />
            </div>
          }
        >
          <StudiosContent searchParams={searchParams} />
        </Suspense>

      </div>
    </main>
  );
}

async function StudiosContent({
  searchParams,
}: {
  searchParams: StudiosSearchParams;
}) {
  // Get the selected category from the URL
  const { category } = await searchParams;

  // Find the selected category
  const selectedCategory = getCategoryBySlug(category);

  return (
    <>
      {/* Category Filters */}
      <section className="mb-10">
        <div className="mb-5 flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-primary" />

          <h2 className="text-lg font-semibold">
            Filter by Category
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">

          {/* All Studios Filter */}
          <Link
            href="/studios"
            className={`btn btn-sm rounded-full ${
              !selectedCategory
                ? "btn-primary"
                : "btn-outline"
            }`}
          >
            All Studios
          </Link>

          {/* Category Buttons */}
          {STUDIO_CATEGORIES.map((item) => (
            <Link
              key={item.slug}
              href={`/studios?category=${item.slug}`}
              className={`btn btn-sm rounded-full ${
                selectedCategory?.slug === item.slug
                  ? "btn-primary"
                  : "btn-outline"
              }`}
            >
              {item.label}
            </Link>
          ))}

        </div>
      </section>

      {/* Studio Listings */}
      <StudiosResults searchParams={searchParams} />
    </>
  );
}
