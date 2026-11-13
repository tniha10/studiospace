"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CalendarX2,
  Clock,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { apiFetch, getErrorMessage } from "@/lib/api";
import type { Booking, BookingStatus } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/utils";

const STATUS_CLASS: Record<BookingStatus, string> = {
  Pending: "badge-warning",
  Confirmed: "badge-success",
  Completed: "badge-info",
  Cancelled: "badge-error",
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadBookings() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const result = await apiFetch<{ bookings: Booking[] }>(
          "/api/bookings/mine"
        );

        if (active) {
          setBookings(result.bookings);
        }
      } catch (caught) {
        if (active) {
          setErrorMessage(getErrorMessage(caught));
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadBookings();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  async function handleCancel() {
    if (!bookingToCancel) {
      return;
    }

    setIsCancelling(true);

    try {
      const result = await apiFetch<{ booking: Booking | null }>(
        `/api/bookings/${bookingToCancel.id}/cancel`,
        { method: "PATCH", mutation: true }
      );

      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingToCancel.id
            ? (result.booking ?? { ...booking, status: "Cancelled" })
            : booking
        )
      );
      toast.success("Booking cancelled.");
      setBookingToCancel(null);
    } catch (caught) {
      toast.error(getErrorMessage(caught));
    } finally {
      setIsCancelling(false);
    }
  }

  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            My Bookings
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Manage Your{" "}
            <span className="text-primary">Bookings</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-base-content/70">
            View your studio reservations, check booking
            statuses, and keep track of your upcoming
            creative projects in one place.
          </p>
        </div>

        {/* Bookings Section */}
        <section className="rounded-2xl border border-base-300 bg-base-100 p-7 md:p-10">

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-base-300 p-5"
                >
                  <div className="skeleton h-4 w-1/3" />
                  <div className="skeleton mt-3 h-3 w-1/2" />
                  <div className="skeleton mt-3 h-3 w-1/4" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!isLoading && errorMessage && (
            <div role="alert" className="py-8 text-center">
              <p className="text-sm text-error">{errorMessage}</p>

              <button
                type="button"
                onClick={() => setReloadKey((key) => key + 1)}
                className="btn btn-outline mt-5 rounded-full"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !errorMessage && bookings.length === 0 && (
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <CalendarDays className="text-primary" size={28} />
                </div>

                <h2 className="mb-3 text-2xl font-bold">
                  No Bookings Yet
                </h2>

                <p className="max-w-xl text-sm leading-6 text-base-content/70">
                  You have no studio bookings to display right
                  now. Find a studio, pick a time, and send your
                  first booking request.
                </p>
              </div>

              <Link href="/studios" className="btn btn-primary rounded-full">
                Browse Studios
                <ArrowRight size={18} />
              </Link>
            </div>
          )}

          {/* Booking Cards */}
          {!isLoading && !errorMessage && bookings.length > 0 && (
            <>
              <p className="mb-5 text-sm text-base-content/60">
                {bookings.length}{" "}
                {bookings.length === 1 ? "booking" : "bookings"}
              </p>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <article
                    key={booking.id}
                    className="rounded-xl border border-base-300 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold">
                          {booking.studioTitle}
                        </h2>

                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-base-content/65">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={15} />
                            {formatDate(booking.date)}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Clock size={15} />
                            {booking.startTime} - {booking.endTime} (
                            {booking.hours}h)
                          </span>
                        </div>
                      </div>

                      <span
                        className={`badge ${STATUS_CLASS[booking.status]}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-base-300 pt-4">
                      <p className="text-sm text-base-content/70">
                        Total:{" "}
                        <span className="font-semibold text-base-content">
                          {formatPrice(booking.totalPrice)}
                        </span>{" "}
                        <span className="text-xs text-base-content/50">
                          ({formatPrice(booking.hourlyRate)}/hr)
                        </span>
                      </p>

                      <div className="flex gap-2">
                        <Link
                          href={`/studios/${booking.studioId}`}
                          className="btn btn-ghost btn-sm rounded-full"
                        >
                          <MapPin size={15} />
                          View Studio
                        </Link>

                        {booking.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => setBookingToCancel(booking)}
                            className="btn btn-outline btn-error btn-sm rounded-full"
                          >
                            <CalendarX2 size={15} />
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-6 text-xs leading-5 text-base-content/50">
                Only Pending bookings can be cancelled. Confirmed,
                Completed, and Cancelled bookings keep their status.
              </p>
            </>
          )}

        </section>

      </div>

      <ConfirmDialog
        open={bookingToCancel !== null}
        title="Cancel this booking?"
        description={
          bookingToCancel
            ? `Your ${formatDate(bookingToCancel.date)} booking for "${bookingToCancel.studioTitle}" will be marked Cancelled. This cannot be undone.`
            : ""
        }
        confirmLabel="Cancel Booking"
        cancelLabel="Keep Booking"
        isConfirming={isCancelling}
        onConfirm={handleCancel}
        onCancel={() => {
          if (!isCancelling) {
            setBookingToCancel(null);
          }
        }}
      />
    </main>
  );
}
