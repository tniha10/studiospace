
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Mic,
  Music,
  Clapperboard,
  Palette,
  Search,
  CalendarCheck,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-base-100 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Welcome to StudioSpace
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Find the Right Space for Your Next Creative Project.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-base-content/70">
              Explore photography studios, podcast rooms, music
              spaces, and creative workshops. Discover a place
              that fits your ideas and brings your projects to life.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/studios"
                className="btn btn-primary rounded-full px-8"
              >
                Explore Studios
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/how-it-works"
                className="btn btn-outline rounded-full px-8"
              >
                How It Works
              </Link>
            </div>
          </div>

          <div className="relative h-80 overflow-hidden rounded-2xl md:h-[440px]">
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
              alt="Creative studio workspace"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

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
              href="/studios"
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
              href="/studios"
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
              href="/studios"
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
              href="/studios"
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
              href="/studios"
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

          <div className="grid gap-6 md:grid-cols-3">
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
                <CalendarCheck size={26} className="text-primary" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                2. Choose Your Time
              </h3>

              <p className="mt-3 text-sm leading-7 text-base-content/70">
                Select a studio and choose the date and time
                you want to reserve.
              </p>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-200 p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle size={26} className="text-primary" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                3. Start Creating
              </h3>

              <p className="mt-3 text-sm leading-7 text-base-content/70">
                Once booking is available, you will be able
                to reserve your space and get started.
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
              StudioSpace is being built to help studio owners
              connect with people looking for creative workspaces.
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
