import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  Camera,
  Mic,
  Music,
  Clapperboard,
  Palette,
  Search,
  SlidersHorizontal,
  CalendarCheck,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

import { HeroSlider } from "@/components/home/hero-slider";
import {
  FeaturedStudios,
  FeaturedStudiosSkeleton,
} from "@/components/home/featured-studios";

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<div className="h-[500px] animate-pulse bg-muted" />}><HeroSlider /></Suspense>

      {/* Studio Categories */}
      <section className="bg-base-200 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Explore Categories
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Find a Space That Fits Your Work
            </h2>

            <p className="mt-4 max-w-2xl text-base-content/70">
              Every creative project needs the right environment.
              Explore different types of studios available on
              StudioSpace.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/studios?category=photo-studio"
              className="rounded-2xl border border-base-300 bg-base-100 p-6 transition hover:border-primary"
            >
              <Camera size={30} className="text-primary" />
              <h3 className="mt-5 text-xl font-semibold">
                Photography Studios
              </h3>
              <p className="mt-2 text-sm leading-6 text-base-content/70">
                Spaces for portraits, product photography,
                and professional photoshoots.
              </p>
            </Link>

            <Link
              href="/studios?category=sound-stage"
              className="rounded-2xl border border-base-300 bg-base-100 p-6 transition hover:border-primary"
            >
              <Clapperboard size={30} className="text-primary" />
              <h3 className="mt-5 text-xl font-semibold">
                Sound Stages
              </h3>
              <p className="mt-2 text-sm leading-6 text-base-content/70">
                Creative spaces for filming, video production,
                and commercial projects.
              </p>
            </Link>

            <Link
              href="/studios?category=podcast-room"
              className="rounded-2xl border border-base-300 bg-base-100 p-6 transition hover:border-primary"
            >
              <Mic size={30} className="text-primary" />
              <h3 className="mt-5 text-xl font-semibold">
                Podcast Rooms
              </h3>
              <p className="mt-2 text-sm leading-6 text-base-content/70">
                Comfortable recording rooms for podcasts,
                interviews, and conversations.
              </p>
            </Link>

            <Link
              href="/studios?category=music-suite"
              className="rounded-2xl border border-base-300 bg-base-100 p-6 transition hover:border-primary"
            >
              <Music size={30} className="text-primary" />
              <h3 className="mt-5 text-xl font-semibold">
                Music Studios
              </h3>
              <p className="mt-2 text-sm leading-6 text-base-content/70">
                Recording and rehearsal spaces for musicians
                and music producers.
              </p>
            </Link>

            <Link
              href="/studios?category=art-workshop"
              className="rounded-2xl border border-base-300 bg-base-100 p-6 transition hover:border-primary"
            >
              <Palette size={30} className="text-primary" />
              <h3 className="mt-5 text-xl font-semibold">
                Art Workshops
              </h3>
              <p className="mt-2 text-sm leading-6 text-base-content/70">
                Open creative spaces for art, workshops,
                and hands-on projects.
              </p>
            </Link>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/studios"
              className="btn btn-primary rounded-full px-8"
            >
              Explore All Studios
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Studios from the database */}
      <Suspense fallback={<FeaturedStudiosSkeleton />}>
        <FeaturedStudios />
      </Suspense>

      {/* How It Works */}
      <section className="bg-base-100 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Simple and Easy
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              How StudioSpace Works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base-content/70">
              Finding a creative space should be simple.
              Here is how StudioSpace is designed to work.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-base-300 bg-base-200 p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Search size={26} className="text-primary" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                1. Explore Studios
              </h3>

              <p className="mt-3 text-sm leading-7 text-base-content/70">
                Browse studio categories and discover spaces
                that match your creative needs.
              </p>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-200 p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <SlidersHorizontal size={26} className="text-primary" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                2. Compare Details
              </h3>

              <p className="mt-3 text-sm leading-7 text-base-content/70">
                Check the location, capacity, amenities, and
                hourly price before you choose.
              </p>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-200 p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <CalendarCheck size={26} className="text-primary" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                3. Request Your Time
              </h3>

              <p className="mt-3 text-sm leading-7 text-base-content/70">
                Pick a date and time. The server checks for
                overlapping bookings and sets the price.
              </p>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-200 p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle size={26} className="text-primary" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                4. Start Creating
              </h3>

              <p className="mt-3 text-sm leading-7 text-base-content/70">
                Track your Pending request in My Bookings, then
                show up and make something great.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="btn btn-outline rounded-full px-8"
            >
              Learn How It Works
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Host Guarantee */}
      <section className="bg-base-100 px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-primary/25 bg-primary/5 p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck size={28} className="text-primary" />
              </div>

              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                The StudioSpace Host Guarantee
              </h2>

              <p className="mt-4 leading-7 text-base-content/70">
                Every listing and booking follows the same rules,
                whether you are hosting your first space or booking
                your tenth project.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 md:max-w-xl">
              <div>
                <CheckCircle size={20} className="text-primary" />
                <h3 className="mt-2 font-semibold">Verified listings</h3>
                <p className="mt-1 text-xs leading-5 text-base-content/65">
                  Listings are tied to the host account that created them.
                </p>
              </div>

              <div>
                <CheckCircle size={20} className="text-primary" />
                <h3 className="mt-2 font-semibold">Locked-in pricing</h3>
                <p className="mt-1 text-xs leading-5 text-base-content/65">
                  Totals are recalculated on the server, not trusted
                  from the browser.
                </p>
              </div>

              <div>
                <CheckCircle size={20} className="text-primary" />
                <h3 className="mt-2 font-semibold">No double bookings</h3>
                <p className="mt-1 text-xs leading-5 text-base-content/65">
                  Overlapping Pending and Confirmed requests are
                  rejected automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Owner Section */}
      <section className="bg-base-200 px-6 py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-2xl border border-base-300 bg-base-100 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              For Studio Owners
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-bold md:text-4xl">
              Have a Studio? Share Your Space with Creators.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-base-content/70">
              StudioSpace helps studio owners connect with people
              looking for creative workspaces. Add your listing once
              and manage it from your dashboard.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="btn btn-primary shrink-0 rounded-full px-8"
          >
            List Your Studio
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}