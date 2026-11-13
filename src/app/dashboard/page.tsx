"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  LayoutDashboard,
  ListVideo,
  Plus,
  ArrowUpRight,
} from "lucide-react";

import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import type { Booking, Studio } from "@/lib/types";

type Counts = {
  listings: number;
  bookings: number;
  pendingBookings: number;
};

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  const [counts, setCounts] = useState<Counts | null>(null);
  const [countsUnavailable, setCountsUnavailable] = useState(false);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    let active = true;

    async function loadCounts() {
      try {
        const [studioResult, bookingResult] = await Promise.all([
          apiFetch<{ studios: Studio[] }>("/api/studios/mine"),
          apiFetch<{ bookings: Booking[] }>("/api/bookings/mine"),
        ]);

        if (!active) {
          return;
        }

        setCounts({
          listings: studioResult.studios.length,
          bookings: bookingResult.bookings.length,
          pendingBookings: bookingResult.bookings.filter(
            (booking) => booking.status === "Pending"
          ).length,
        });
      } catch {
        if (active) {
          setCountsUnavailable(true);
        }
      }
    }

    loadCounts();

    return () => {
      active = false;
    };
  }, [userId]);

  const firstName = session?.user?.name?.trim().split(/\s+/)[0];

  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Dashboard Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Dashboard
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            {isPending ? (
              <span className="skeleton inline-block h-12 w-80 align-middle" />
            ) : (
              <>
                Welcome{firstName ? `, ${firstName}` : ""} to Your{" "}
                <span className="text-primary">Dashboard</span>
              </>
            )}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-base-content/70">
            Manage your studio listings, check your bookings,
            and add new creative spaces from one place.
          </p>
        </div>

        {/* Account Summary */}
        <div className="flex items-start gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
          <LayoutDashboard
            className="mt-1 shrink-0 text-primary"
            size={22}
          />

          <div className="text-sm leading-6 text-base-content/70">
            {!isPending && !session?.user ? (
              <p>
                Your session has expired.{" "}
                <Link
                  href="/login?next=%2Fdashboard"
                  className="font-semibold text-primary hover:underline"
                >
                  Log in again
                </Link>{" "}
                to manage your studios and bookings.
              </p>
            ) : countsUnavailable ? (
              <p>
                Your account is ready. Studio and booking totals
                could not be loaded right now — the pages below
                will retry when you open them.
              </p>
            ) : counts ? (
              <p>
                You have <strong>{counts.listings}</strong>{" "}
                {counts.listings === 1 ? "studio" : "studios"} listed and{" "}
                <strong>{counts.bookings}</strong>{" "}
                {counts.bookings === 1 ? "booking" : "bookings"} (
                {counts.pendingBookings} pending).
              </p>
            ) : (
              <p className="flex items-center gap-2">
                <span className="loading loading-spinner loading-xs" />
                Loading your account summary...
              </p>
            )}
          </div>
        </div>

        {/* Dashboard Cards */}
        <section className="mt-10">
          <h2 className="mb-6 text-2xl font-bold">
            Manage Your StudioSpace
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            {/* My Studio Listings */}
            <Link
              href="/my-listings"
              className="group rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-200 hover:border-primary hover:shadow-md"
            >
              <div className="mb-5 flex items-center justify-between">
                <ListVideo className="text-primary" size={28} />
                <ArrowUpRight
                  className="text-base-content/50 group-hover:text-primary"
                  size={20}
                />
              </div>

              <h3 className="mb-3 text-lg font-semibold">
                My Studio Listings
              </h3>

              <p className="text-sm leading-6 text-base-content/70">
                View and manage the studios you have listed.
                Update studio information and keep track of
                your available spaces.
              </p>
            </Link>

            {/* My Bookings */}
            <Link
              href="/my-bookings"
              className="group rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-200 hover:border-primary hover:shadow-md"
            >
              <div className="mb-5 flex items-center justify-between">
                <CalendarDays className="text-primary" size={28} />
                <ArrowUpRight
                  className="text-base-content/50 group-hover:text-primary"
                  size={20}
                />
              </div>

              <h3 className="mb-3 text-lg font-semibold">
                My Bookings
              </h3>

              <p className="text-sm leading-6 text-base-content/70">
                Check your studio bookings and view their
                current status. Keep track of your upcoming
                reservations in one place.
              </p>
            </Link>

            {/* Add New Studio */}
            <Link
              href="/add-studio"
              className="group rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-200 hover:border-primary hover:shadow-md"
            >
              <div className="mb-5 flex items-center justify-between">
                <Plus className="text-primary" size={28} />
                <ArrowUpRight
                  className="text-base-content/50 group-hover:text-primary"
                  size={20}
                />
              </div>

              <h3 className="mb-3 text-lg font-semibold">
                Add New Studio
              </h3>

              <p className="text-sm leading-6 text-base-content/70">
                Have a creative workspace to share?
                Add your studio details and make it
                available for other creators to discover.
              </p>
            </Link>

          </div>
        </section>

      </div>
    </main>
  );
}
