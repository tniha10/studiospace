"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { toast } from "sonner";

import { apiFetch, getErrorMessage } from "@/lib/api";
import { STUDIO_CATEGORIES } from "@/lib/constants";
import type { Studio, StudioCategorySlug, StudioInput } from "@/lib/types";

type StudioFormProps = {
  initialStudio?: Studio;
};

type FormState = {
  title: string;
  category: StudioCategorySlug;
  hourlyRate: string;
  securityDeposit: string;
  capacity: string;
  location: string;
  imageUrl: string;
  amenities: string;
  description: string;
};

function toFormState(studio?: Studio): FormState {
  if (!studio) {
    return {
      title: "",
      category: "photo-studio",
      hourlyRate: "",
      securityDeposit: "0",
      capacity: "1",
      location: "",
      imageUrl: "",
      amenities: "",
      description: "",
    };
  }

  return {
    title: studio.title,
    category: studio.category,
    hourlyRate: String(studio.hourlyRate),
    securityDeposit: String(studio.securityDeposit),
    capacity: String(studio.capacity),
    location: studio.location,
    imageUrl: studio.imageUrl,
    amenities: studio.amenities.join(", "),
    description: studio.description,
  };
}

export function StudioForm({ initialStudio }: StudioFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialStudio);

  const [form, setForm] = useState<FormState>(() => toFormState(initialStudio));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const body = new FormData();
      body.append("image", file);

      const result = await apiFetch<{ url: string }>("/api/uploads", {
        method: "POST",
        mutation: true,
        body,
      });

      update("imageUrl", result.url);
      toast.success("Image uploaded.");
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const payload: StudioInput = {
      title: form.title.trim(),
      category: form.category,
      hourlyRate: Number(form.hourlyRate),
      securityDeposit: Number(form.securityDeposit),
      capacity: Number(form.capacity),
      location: form.location.trim(),
      imageUrl: form.imageUrl.trim(),
      amenities: form.amenities
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      description: form.description.trim(),
    };

    setIsSubmitting(true);

    try {
      if (initialStudio) {
        await apiFetch<{ studio: Studio }>(
          `/api/studios/${initialStudio.id}`,
          {
            method: "PATCH",
            mutation: true,
            body: JSON.stringify(payload),
          }
        );

        toast.success("Studio updated.");
      } else {
        await apiFetch<{ studio: Studio }>("/api/studios", {
          method: "POST",
          mutation: true,
          body: JSON.stringify(payload),
        });

        toast.success("Studio listed. It is now visible on Explore Studios.");
      }

      router.push("/my-listings");
      router.refresh();
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Title */}
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Studio Name
        </label>

        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(event) => update("title", event.target.value)}
          placeholder="e.g. Sunlit Portrait Studio"
          minLength={3}
          maxLength={100}
          required
          className="input input-bordered w-full"
        />
      </div>

      {/* Category + Capacity */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            id="category"
            value={form.category}
            onChange={(event) =>
              update("category", event.target.value as StudioCategorySlug)
            }
            className="select select-bordered w-full"
          >
            {STUDIO_CATEGORIES.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="capacity" className="mb-2 block text-sm font-medium">
            Capacity
          </label>

          <input
            id="capacity"
            type="number"
            min={1}
            value={form.capacity}
            onChange={(event) => update("capacity", event.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Prices */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="hourlyRate" className="mb-2 block text-sm font-medium">
            Hourly Rate (USD)
          </label>

          <input
            id="hourlyRate"
            type="number"
            min={1}
            step="0.01"
            value={form.hourlyRate}
            onChange={(event) => update("hourlyRate", event.target.value)}
            placeholder="75"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label
            htmlFor="securityDeposit"
            className="mb-2 block text-sm font-medium"
          >
            Security Deposit (USD)
          </label>

          <input
            id="securityDeposit"
            type="number"
            min={0}
            step="0.01"
            value={form.securityDeposit}
            onChange={(event) => update("securityDeposit", event.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="mb-2 block text-sm font-medium">
          Location
        </label>

        <input
          id="location"
          type="text"
          value={form.location}
          onChange={(event) => update("location", event.target.value)}
          placeholder="e.g. Brooklyn, New York"
          minLength={3}
          maxLength={160}
          required
          className="input input-bordered w-full"
        />
      </div>

      {/* Image URL + Upload */}
      <div>
        <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium">
          Image URL
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex w-full items-center gap-3 rounded-lg border border-base-300 px-4">
            <ImagePlus size={18} className="text-base-content/50" />

            <input
              id="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={(event) => update("imageUrl", event.target.value)}
              placeholder="https://example.com/studio.jpg"
              required
              className="w-full bg-transparent py-3 outline-none"
            />
          </div>

          <label
            className={`btn btn-outline shrink-0 rounded-lg ${
              isUploading ? "btn-disabled" : ""
            }`}
          >
            {isUploading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <Upload size={17} />
            )}
            {isUploading ? "Uploading..." : "Upload"}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>

        <p className="mt-2 text-xs text-base-content/55">
          Paste any public image URL, or upload a JPEG, PNG, or WebP
          file (max 5 MB) when the server has an ImgBB key configured.
        </p>
      </div>

      {/* Amenities */}
      <div>
        <label htmlFor="amenities" className="mb-2 block text-sm font-medium">
          Amenities
        </label>

        <input
          id="amenities"
          type="text"
          value={form.amenities}
          onChange={(event) => update("amenities", event.target.value)}
          placeholder="Backdrops, lighting kit, wifi, parking"
          required
          className="input input-bordered w-full"
        />

        <p className="mt-2 text-xs text-base-content/55">
          Separate each amenity with a comma.
        </p>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Overview
        </label>

        <textarea
          id="description"
          value={form.description}
          onChange={(event) => update("description", event.target.value)}
          placeholder="Describe the space, what is included, and what makes it useful for creators."
          rows={5}
          minLength={20}
          maxLength={2000}
          required
          className="textarea textarea-bordered w-full"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || isUploading}
        className="btn btn-primary w-full rounded-full"
      >
        {isSubmitting && (
          <span className="loading loading-spinner loading-sm" />
        )}
        {isSubmitting
          ? isEditing
            ? "Saving changes..."
            : "Publishing studio..."
          : isEditing
            ? "Save Changes"
            : "Publish Studio"}
      </button>
    </form>
  );
}
