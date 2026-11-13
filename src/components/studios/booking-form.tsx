"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarDays, Clock, X } from "lucide-react";
import { toast } from "sonner";

import { apiFetch, getErrorMessage } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import type { Booking, Studio } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type BookingFormProps = {
  studio: Studio;
};

function todayLocal() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);

  return local.toISOString().slice(0, 10);
}

function toMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null;
  }

  return hours * 60 + minutes;
}

export function BookingForm({ studio }: BookingFormProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const dateInputRef = useRef<HTMLInputElement>(null);

  const defaultEndMinutes = Math.min(
    (toMinutes(studio.openTime) ?? 9 * 60) + 60,
    toMinutes(studio.closeTime) ?? 22 * 60
  );

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(todayLocal());
  const [startTime, setStartTime] = useState(studio.openTime);
  const [endTime, setEndTime] = useState(
    `${String(Math.floor(defaultEndMinutes / 60)).padStart(2, "0")}:${String(
      defaultEndMinutes % 60
    ).padStart(2, "0")}`
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startMinutes = toMinutes(startTime);
  const endMinutes = toMinutes(endTime);
  const durationMinutes =
    startMinutes !== null && endMinutes !== null && endMinutes > startMinutes
      ? endMinutes - startMinutes
      : 0;
  const hours = durationMinutes / 60;
  const previewTotal = hours * studio.hourlyRate;

  // Modal behaviour: Escape closes it, the page behind stops scrolling, and
  // focus moves into the form when it opens.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    dateInputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isSubmitting) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, isSubmitting]);

  function openBooking() {
    if (!session?.user) {
      toast.info("Please log in to book this studio.");
      router.push(`/login?next=${encodeURIComponent(`/studios/${studio.id}`)}`);
      return;
    }

    setError("");
    setIsOpen(true);
  }

  function closeBooking() {
    if (!isSubmitting) {
      setIsOpen(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!session?.user) {
      router.push(`/login?next=${encodeURIComponent(`/studios/${studio.id}`)}`);
      return;
    }

    if (durationMinutes <= 0) {
      setError("The end time must be after the start time.");
      return;
    }

    if (startMinutes === null || endMinutes === null) {
      setError("Please choose a valid start and end time.");
      return;
    }

    if (startMinutes % 30 !== 0 || endMinutes % 30 !== 0) {
      setError("Booking times must use 30-minute steps.");
      return;
    }

    const openMinutes = toMinutes(studio.openTime);
    const closeMinutes = toMinutes(studio.closeTime);

    if (
      openMinutes !== null &&
      closeMinutes !== null &&
      (startMinutes < openMinutes || endMinutes > closeMinutes)
    ) {
      setError(
        `Bookings are available between ${studio.openTime} and ${studio.closeTime}.`
      );
      return;
    }

    if (durationMinutes > 12 * 60) {
      setError("A single booking cannot be longer than 12 hours.");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiFetch<{ booking: Booking }>("/api/bookings", {
        method: "POST",
        mutation: true,
        body: JSON.stringify({
          studioId: studio.id,
          date,
          startTime,
          endTime,
        }),
      });

      toast.success("Booking request sent. It is waiting for host confirmation.");
      setIsOpen(false);
      router.push("/my-bookings");
      router.refresh();
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* Booking card with the "Book Workspace Now" button */}
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Book This Studio
        </p>

        <p className="mt-2 text-2xl font-bold">
          {formatPrice(studio.hourlyRate)}
          <span className="text-sm font-normal text-base-content/60">/hour</span>
        </p>

        <p className="mt-3 text-sm leading-6 text-base-content/70">
          Pick a date and time. Your booking starts as Pending until the host
          confirms it.
        </p>

        <button
          type="button"
          onClick={openBooking}
          disabled={isPending}
          className="btn btn-primary mt-5 w-full rounded-full"
        >
          {isPending && <span className="loading loading-spinner loading-sm" />}
          Book Workspace Now
        </button>

        {!isPending && !session?.user && (
          <p className="mt-3 text-center text-xs text-base-content/55">
            You will be asked to log in first.
          </p>
        )}
      </div>

      {/* Booking modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeBooking();
            }
          }}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            onSubmit={handleSubmit}
            className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Book This Studio
                </p>

                <h2 id="booking-modal-title" className="mt-1 text-xl font-bold">
                  {studio.title}
                </h2>

                <p className="mt-1 text-sm text-base-content/60">
                  {formatPrice(studio.hourlyRate)}/hour
                </p>
              </div>

              <button
                type="button"
                onClick={closeBooking}
                disabled={isSubmitting}
                aria-label="Close booking window"
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="booking-date"
                  className="mb-2 block text-sm font-medium"
                >
                  Date
                </label>

                <div className="flex items-center gap-3 rounded-lg border border-base-300 px-4">
                  <CalendarDays size={18} className="text-base-content/50" />

                  <input
                    ref={dateInputRef}
                    id="booking-date"
                    type="date"
                    min={todayLocal()}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    className="w-full bg-transparent py-3 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="start-time"
                    className="mb-2 block text-sm font-medium"
                  >
                    Start
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-base-300 px-3">
                    <Clock size={16} className="text-base-content/50" />

                    <input
                      id="start-time"
                      type="time"
                      step={1800}
                      min={studio.openTime}
                      max={studio.closeTime}
                      value={startTime}
                      onChange={(event) => setStartTime(event.target.value)}
                      required
                      className="w-full bg-transparent py-3 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="end-time"
                    className="mb-2 block text-sm font-medium"
                  >
                    End
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-base-300 px-3">
                    <Clock size={16} className="text-base-content/50" />

                    <input
                      id="end-time"
                      type="time"
                      step={1800}
                      min={studio.openTime}
                      max={studio.closeTime}
                      value={endTime}
                      onChange={(event) => setEndTime(event.target.value)}
                      required
                      className="w-full bg-transparent py-3 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Price preview. The server calculates the real total again. */}
            <div className="mt-5 space-y-2 rounded-xl bg-base-200 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-base-content/70">
                  {hours > 0
                    ? `${hours} hour${hours === 1 ? "" : "s"}`
                    : "Duration"}
                </span>
                <span>{formatPrice(previewTotal)}</span>
              </div>

              <div className="flex justify-between text-xs text-base-content/60">
                <span>Security deposit (refundable)</span>
                <span>{formatPrice(studio.securityDeposit)}</span>
              </div>

              <p className="border-t border-base-300 pt-2 text-xs text-base-content/55">
                The final price is calculated on the server using the current
                hourly rate.
              </p>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-error">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeBooking}
                disabled={isSubmitting}
                className="btn btn-ghost rounded-full"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary rounded-full px-8"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner loading-sm" />
                )}
                {isSubmitting ? "Sending request..." : "Request Booking"}
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-base-content/55">
              Bookings start as Pending. You can cancel a Pending request from
              My Bookings.
            </p>
          </form>
        </div>
      )}
    </>
  );
}