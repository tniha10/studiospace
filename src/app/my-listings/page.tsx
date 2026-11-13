"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ListVideo, MapPin, Pencil, Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { apiFetch, getErrorMessage } from "@/lib/api";
import { getCategoryBySlug } from "@/lib/constants";
import type { Studio } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function MyListingsPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const [studioToDelete, setStudioToDelete] = useState<Studio | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadStudios() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const result = await apiFetch<{ studios: Studio[] }>(
          "/api/studios/mine"
        );

        if (active) {
          setStudios(result.studios);
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

    loadStudios();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  async function handleDelete() {
    if (!studioToDelete) {
      return;
    }

    setIsDeleting(true);

    try {
      await apiFetch<{ ok: boolean }>(
        `/api/studios/${studioToDelete.id}`,
        { method: "DELETE", mutation: true }
      );

      setStudios((current) =>
        current.filter((studio) => studio.id !== studioToDelete.id)
      );
      toast.success("Studio deleted.");
      setStudioToDelete(null);
    } catch (caught) {
      toast.error(getErrorMessage(caught));
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              My Studio Listings
            </p>

            <h1 className="text-4xl font-bold md:text-5xl">
              Manage Your{" "}
              <span className="text-primary">Studios</span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-base-content/70">
              View and manage the creative studios you have
              listed on StudioSpace. Update details or remove
              a listing you no longer offer.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="btn btn-primary shrink-0 rounded-full"
          >
            <Plus size={18} />
            Add New Studio
          </Link>
        </div>

        {/* Listings */}
        <section className="rounded-2xl border border-base-300 bg-base-100 p-7 md:p-10">

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex gap-4">
                  <div className="skeleton h-24 w-36 rounded-xl" />
                  <div className="flex-1 space-y-3 py-2">
                    <div className="skeleton h-4 w-1/2" />
                    <div className="skeleton h-3 w-1/3" />
                    <div className="skeleton h-3 w-1/4" />
                  </div>
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
          {!isLoading && !errorMessage && studios.length === 0 && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ListVideo className="text-primary" size={30} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">
                No Studio Listings Yet
              </h2>

              <p className="max-w-xl text-sm leading-6 text-base-content/70">
                Your studio listings will appear here after you
                add your first space. You can edit or delete
                your own listings at any time.
              </p>

              <Link
                href="/add-studio"
                className="btn btn-primary mt-8 rounded-full"
              >
                <Plus size={18} />
                Add New Studio
              </Link>
            </div>
          )}

          {/* Studio Rows */}
          {!isLoading && !errorMessage && studios.length > 0 && (
            <>
              <p className="mb-5 text-sm text-base-content/60">
                {studios.length}{" "}
                {studios.length === 1 ? "listing" : "listings"}
              </p>

              <div className="divide-y divide-base-300">
                {studios.map((studio) => (
                  <div
                    key={studio.id}
                    className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                  >
                    <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-base-300 sm:w-36">
                      <Image
                        src={studio.imageUrl}
                        alt={studio.title}
                        fill
                        unoptimized
                        sizes="144px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="badge badge-outline badge-sm">
                        {getCategoryBySlug(studio.category)?.shortLabel ??
                          "Studio"}
                      </span>

                      <h2 className="mt-2 truncate text-lg font-semibold">
                        {studio.title}
                      </h2>

                      <div className="mt-1 flex flex-wrap gap-4 text-xs text-base-content/60">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} />
                          {studio.location}
                        </span>

                        <span className="flex items-center gap-1">
                          <Users size={13} />
                          Up to {studio.capacity}
                        </span>

                        <span className="font-semibold text-base-content/80">
                          {formatPrice(studio.hourlyRate)}/hr
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <Link
                        href={`/studios/${studio.id}`}
                        className="btn btn-ghost btn-sm rounded-full"
                      >
                        View
                      </Link>

                      <Link
                        href={`/studios/edit/${studio.id}`}
                        className="btn btn-outline btn-sm rounded-full"
                      >
                        <Pencil size={15} />
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => setStudioToDelete(studio)}
                        className="btn btn-outline btn-error btn-sm rounded-full"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </section>

      </div>

      <ConfirmDialog
        open={studioToDelete !== null}
        title="Delete this studio?"
        description={
          studioToDelete
            ? `"${studioToDelete.title}" will be removed from Explore Studios. Existing bookings keep their saved studio details. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete Studio"
        isConfirming={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!isDeleting) {
            setStudioToDelete(null);
          }
        }}
      />
    </main>
  );
}
