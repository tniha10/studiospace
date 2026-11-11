
import Link from "next/link";
import {
  Search,
  CalendarClock,
  Handshake,
  Clapperboard,
  ShieldCheck,
  BadgeCheck,
  Users,
  Headphones,
  ArrowRight,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Find Your Studio",
      description:
        "Explore different creative studios based on your location, budget, and the type of space you need.",
    },
    {
      number: "02",
      icon: CalendarClock,
      title: "Choose Your Time",
      description:
        "Pick a date and start and end times inside the studio's opening hours.",
    },
    {
      number: "03",
      icon: Handshake,
      title: "Send a Booking Request",
      description:
        "Review the hourly price and send a request. It starts as Pending and can be tracked in My Bookings.",
    },
    {
      number: "04",
      icon: Clapperboard,
      title: "Start Creating",
      description:
        "Visit your booked studio and bring your creative ideas to life in a space that suits your work.",
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Booking Transparency",
      description:
        "View studio details and booking information clearly before making a reservation.",
    },
    {
      icon: BadgeCheck,
      title: "Creator Profiles",
      description:
        "Studio owners and creators can manage their profiles and studio information.",
    },
    {
      icon: Users,
      title: "Studio Equipment",
      description:
        "Check the available equipment and facilities before choosing a studio.",
    },
    {
      icon: Headphones,
      title: "Easy Communication",
      description:
        "Find important studio and host information to help plan your booking.",
    },
  ];

  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Your Creative Journey{" "}
            <span className="text-primary">Starts Here</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-base-content/70">
            Finding and booking a creative studio should be
            simple. Follow these four easy steps to find
            the right space for your next project.
          </p>
        </div>

        {/* Booking Steps */}
        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-200 hover:border-primary hover:shadow-md"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <Icon className="text-primary" size={24} />
                    </div>

                    <span className="text-xl font-bold text-base-content/30">
                      {step.number}
                    </span>
                  </div>

                  <h2 className="mb-3 text-lg font-semibold">
                    {step.title}
                  </h2>

                  <p className="text-sm leading-6 text-base-content/70">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Why Choose StudioSpace
              </p>

              <h2 className="text-3xl font-bold md:text-4xl">
                Everything You Need to{" "}
                <span className="text-primary">
                  Create
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-base-content/70">
                StudioSpace helps creators discover suitable
                workspaces with clear information about
                pricing, facilities, and booking details.
              </p>
            </div>

            <Link
              href="/studios"
              className="btn btn-primary rounded-full"
            >
              Explore Studios
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Features Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-base-300 bg-base-100 p-6"
                >
                  <Icon className="mb-5 text-primary" size={26} />

                  <h3 className="mb-3 text-base font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-6 text-base-content/70">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
