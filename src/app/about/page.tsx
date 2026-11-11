
import Link from "next/link";
import { ArrowRight, Compass, HeartHandshake, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* About Us Heading */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            About StudioSpace
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Built for the people who{" "}
            <span className="text-primary">make things.</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-base-content/70">
            StudioSpace is a platform where creative people can find and
            book studios for their projects. Whether you are a photographer,
            filmmaker, musician, or content creator, we want to make
            finding the right workspace easier.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-base-300 bg-base-100 p-7">
            <h2 className="mb-5 text-2xl font-bold">
              Our Mission
            </h2>

            <p className="mb-4 leading-7 text-base-content/70">
              Finding a suitable studio should not be difficult.
              Every creative project needs a space with the right
              equipment, environment, and facilities.
            </p>

            <p className="mb-4 leading-7 text-base-content/70">
              Our goal is to connect studio owners with people
              looking for creative workspaces. Studio owners can
              list their spaces, while creators can explore
              different studios and choose what works for them.
            </p>

            <Link
              href="/studios"
              className="btn btn-primary mt-4 rounded-full"
            >
              Explore Studios
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* About StudioSpace */}
          <div className="rounded-2xl bg-secondary p-7 text-secondary-content">
            <h2 className="mb-5 text-2xl font-bold">
              Why StudioSpace?
            </h2>

            <p className="mb-4 leading-7 text-secondary-content/80">
              StudioSpace brings creative people and studio
              owners together on one platform.
            </p>

            <p className="leading-7 text-secondary-content/80">
              We want to make it easier to discover photography
              studios, podcast rooms, filming locations, and
              other creative spaces without spending hours
              searching for them.
            </p>

            <p className="mt-8 border-t border-secondary-content/20 pt-5 text-sm">
              A space for every creative idea.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <section className="mt-16">
          <h2 className="mb-8 text-3xl font-bold">
            What We Believe In
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
              <Compass className="mb-5 text-primary" size={28} />

              <h3 className="mb-3 text-lg font-semibold">
                Easy Discovery
              </h3>

              <p className="text-sm leading-6 text-base-content/70">
                We want users to find and compare creative
                studios easily based on their needs and budget.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
              <HeartHandshake className="mb-5 text-primary" size={28} />

              <h3 className="mb-3 text-lg font-semibold">
                Supporting Studio Owners
              </h3>

              <p className="text-sm leading-6 text-base-content/70">
                Studio owners should have a simple way to
                share their spaces and reach more creators.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
              <Sparkles className="mb-5 text-primary" size={28} />

              <h3 className="mb-3 text-lg font-semibold">
                Creative Opportunities
              </h3>

              <p className="text-sm leading-6 text-base-content/70">
                We believe everyone should have access to
                suitable spaces where they can bring their
                creative ideas to life.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
