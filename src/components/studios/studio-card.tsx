import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";

import { getCategoryBySlug } from "@/lib/constants";
import type { Studio } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type StudioCardProps = {
  studio: Studio;
};

export function StudioCard({ studio }: StudioCardProps) {
  const category = getCategoryBySlug(studio.category);

  return (
    <Link
      href={`/studios/${studio.id}`}
      className="group overflow-hidden rounded-xl border border-base-300 bg-base-100 transition hover:border-primary hover:shadow-md"
    >
      <div className="relative h-44 overflow-hidden bg-base-300">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="badge badge-outline badge-sm">
            {category?.shortLabel ?? "Studio"}
          </span>

          <p className="text-sm font-semibold">
            {formatPrice(studio.hourlyRate)}
            <span className="text-xs font-normal text-base-content/60">
              /hr
            </span>
          </p>
        </div>

        <h3 className="mt-3 truncate text-lg font-semibold">
          {studio.title}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-base-content/70">
          <MapPin size={15} className="shrink-0" />
          <span className="truncate">{studio.location}</span>
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-base-content/60">
          <span className="flex items-center gap-1.5">
            <Users size={14} />
            Up to {studio.capacity}
          </span>

          <span>
            {studio.reviewCount > 0
              ? `${studio.rating.toFixed(1)} (${studio.reviewCount})`
              : "New listing"}
          </span>
        </div>
      </div>
    </Link>
  );
}
