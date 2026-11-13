import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import { BookingForm } from "@/components/studios/booking-form";
import { getCategoryBySlug } from "@/lib/constants";
import { getStudio, ServerApiError } from "@/lib/server-api";
import type { Studio } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export const instant = false;

type StudioDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function StudioDetailsPage({
  params,
}: StudioDetailsProps) {
  // Get the studio ID from the URL
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
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          href="/studios"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Explore Studios
        </Link>

        {errorMessage || !studio ? (
          <section className="rounded-2xl border border-base-300 bg-base-100 p-8 text-center">
            <h1 className="text-2xl font-bold">Studio Unavailable</h1>

            <p role="alert" className="mt-3 text-sm text-error">
              {errorMessage || "This studio does not exist."}
            </p>

            <Link href="/studios" className="btn btn-primary mt-6 rounded-full">
              Explore Studios
            </Link>
          </section>
        ) : (
          <>
            {/* Page Heading */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="badge badge-outline">
                  {getCategoryBySlug(studio.category)?.label ?? "Studio"}
                </span>

                {studio.reviewCount > 0 ? (
                  <span className="flex items-center gap-1 text-sm text-base-content/70">
                    <Star size={16} className="fill-warning text-warning" />
                    {studio.rating.toFixed(1)} ({studio.reviewCount} reviews)
                  </span>
                ) : (
                  <span className="text-sm text-base-content/60">
                    No reviews yet
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                {studio.title}
              </h1>

              <div className="mt-4 flex flex-wrap gap-5 text-sm text-base-content/70">
                <span className="flex items-center gap-1.5">
                  <MapPin size={17} />
                  {studio.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <Users size={17} />
                  Up to {studio.capacity} people
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays size={17} />
                  {studio.openTime} - {studio.closeTime}
                </span>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

              {/* Left Column */}
              <div className="space-y-8">

                {/* Studio Image */}
                <div className="relative h-72 overflow-hidden rounded-2xl bg-base-300 md:h-[420px]">
                  <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    fill
                    unoptimized
                    priority
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover"
                  />
                </div>

                {/* Overview */}
                <section className="rounded-2xl border border-base-300 bg-base-100 p-7">
                  <h2 className="text-2xl font-bold">Overview</h2>

                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-base-content/70">
                    {studio.description}
                  </p>
                </section>

                {/* Amenities */}
                <section className="rounded-2xl border border-base-300 bg-base-100 p-7">
                  <h2 className="text-2xl font-bold">Amenities</h2>

                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {studio.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="flex items-center gap-2 text-sm text-base-content/75"
                      >
                        <Check size={17} className="shrink-0 text-primary" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Host */}
                <section className="rounded-2xl border border-base-300 bg-base-100 p-7">
                  <h2 className="text-2xl font-bold">Hosted By</h2>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                      {studio.hostName.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold">{studio.hostName}</p>
                      <p className="text-sm text-base-content/60">
                        StudioSpace host
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-xl bg-base-200 p-4">
                    <ShieldCheck
                      size={20}
                      className="mt-0.5 shrink-0 text-primary"
                    />

                    <p className="text-xs leading-6 text-base-content/65">
                      Covered by the StudioSpace Host Guarantee.
                      Listings are reviewed, and every booking request
                      is stored with a fixed server-calculated price.
                    </p>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                <BookingForm studio={studio} />

                <div className="rounded-2xl border border-base-300 bg-base-100 p-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Hourly rate</span>
                    <span className="font-semibold">
                      {formatPrice(studio.hourlyRate)}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between">
                    <span className="text-base-content/70">
                      Security deposit
                    </span>
                    <span>{formatPrice(studio.securityDeposit)}</span>
                  </div>

                  <p className="mt-4 border-t border-base-300 pt-3 text-xs leading-5 text-base-content/55">
                    The deposit is shown for transparency and is not
                    charged by this demo.
                  </p>
                </div>
              </aside>
            </div>
          </>
        )}

      </div>
    </main>
  );
}
