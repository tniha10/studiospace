import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";

import { StudioCard } from "@/components/studios/studio-card";
import { STUDIO_CATEGORIES, getCategoryBySlug } from "@/lib/constants";
import { getStudios, ServerApiError } from "@/lib/server-api";
import type { Studio } from "@/lib/types";

type StudiosResultsProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
};

export function StudiosResultsSkeleton() {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-7 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-base-300 bg-base-200 p-4"
          >
            <div className="skeleton h-32 rounded-lg" />
            <div className="skeleton mt-4 h-4 w-3/4" />
            <div className="skeleton mt-3 h-3 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}

export async function StudiosResults({ searchParams }: StudiosResultsProps) {
  const params = await searchParams;
  const selectedCategory = getCategoryBySlug(params.category);

  const query = new URLSearchParams();

  if (params.q?.trim()) {
    query.set("q", params.q.trim());
  }

  if (selectedCategory) {
    query.set("category", selectedCategory.slug);
  }

  if (params.minPrice) {
    query.set("minPrice", params.minPrice);
  }

  if (params.maxPrice) {
    query.set("maxPrice", params.maxPrice);
  }

  if (params.sort) {
    query.set("sort", params.sort);
  }

  let studios: Studio[] = [];
  let count = 0;
  let errorMessage = "";

  try {
    const result = await getStudios(`?${query.toString()}`);
    studios = result.studios;
    count = result.count;
  } catch (error) {
    errorMessage =
      error instanceof ServerApiError
        ? error.message
        : "Studios could not be loaded right now.";
  }

  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-7 md:p-10">

      {/* Search and Filters */}
      <form
        action="/studios"
        method="get"
        className="mb-8 grid gap-3 border-b border-base-300 pb-8 md:grid-cols-2 lg:grid-cols-5"
      >
        <div className="flex items-center gap-2 rounded-lg border border-base-300 px-4 lg:col-span-2">
          <Search size={18} className="text-base-content/50" />

          <input
            type="search"
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Search by studio or location"
            aria-label="Search studios"
            className="w-full bg-transparent py-3 outline-none"
          />
        </div>

        <select
          name="category"
          defaultValue={selectedCategory?.slug ?? ""}
          aria-label="Filter by category"
          className="select select-bordered w-full"
        >
          <option value="">All categories</option>
          {STUDIO_CATEGORIES.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            name="minPrice"
            min={0}
            defaultValue={params.minPrice ?? ""}
            placeholder="Min $/hr"
            aria-label="Minimum hourly price"
            className="input input-bordered w-full"
          />

          <input
            type="number"
            name="maxPrice"
            min={0}
            defaultValue={params.maxPrice ?? ""}
            placeholder="Max $/hr"
            aria-label="Maximum hourly price"
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            name="sort"
            defaultValue={params.sort ?? "newest"}
            aria-label="Sort studios"
            className="select select-bordered w-full"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>

          <button type="submit" className="btn btn-primary">
            <SlidersHorizontal size={18} />
            Apply
          </button>
        </div>
      </form>

      {/* Result Heading */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">
          {selectedCategory
            ? selectedCategory.label
            : params.q
              ? `Results for "${params.q}"`
              : "Explore Available Studios"}
        </h2>

        {!errorMessage && (
          <p className="text-sm text-base-content/60">
            {count} {count === 1 ? "studio" : "studios"} found
          </p>
        )}
      </div>

      {/* Error State */}
      {errorMessage && (
        <div role="alert" className="rounded-xl bg-error/10 p-6 text-center">
          <p className="text-sm text-error">{errorMessage}</p>

          <p className="mt-2 text-xs text-base-content/60">
            Make sure the API server is running, then reload this page.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!errorMessage && studios.length === 0 && (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Search className="text-primary" size={28} />
          </div>

          <h3 className="text-xl font-bold">No Studios Found</h3>

          <p className="mt-3 max-w-md text-sm leading-6 text-base-content/70">
            No studios match these filters yet. Try a different
            category, price range, or search term.
          </p>

          <Link href="/studios" className="btn btn-outline mt-6 rounded-full">
            Clear Filters
          </Link>
        </div>
      )}

      {/* Studio Grid */}
      {!errorMessage && studios.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      )}

    </section>
  );
}
