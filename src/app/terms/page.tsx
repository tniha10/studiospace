
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Privacy",
  description: "Terms and privacy information for StudioSpace.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">

        {/* Page Heading */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Terms & Privacy
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Terms &{" "}
            <span className="text-primary">Privacy Policy</span>
          </h1>

          <p className="mt-5 text-base leading-7 text-base-content/70">
            Welcome to StudioSpace. This page explains some
            important information about using our platform,
            booking studios, and handling user information.
          </p>

          <p className="mt-4 text-sm text-base-content/50">
            Last Updated: October 2026
          </p>
        </div>

        {/* Terms and Privacy Content */}
        <div className="rounded-2xl border border-base-300 bg-base-100 p-7 md:p-10">

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">
              1. About StudioSpace
            </h2>

            <p className="text-sm leading-7 text-base-content/70">
              StudioSpace is a student-built project designed
              to connect creative people with studio owners.
              The platform is currently under development,
              so some features may not be available yet.
            </p>
          </section>

          <div className="divider" />

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">
              2. Studio Bookings and Payments
            </h2>

            <p className="text-sm leading-7 text-base-content/70">
              StudioSpace aims to help users find and book
              creative workspaces. Booking and payment
              features are not currently active. When these
              features are introduced, users will be able
              to review booking details, cancellation rules,
              and any applicable charges before confirming
              a reservation.
            </p>
          </section>

          <div className="divider" />

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">
              3. User Accounts and Information
            </h2>

            <p className="text-sm leading-7 text-base-content/70">
              Account registration and login are not connected
              during the initial development phase. The
              current authentication pages are for interface
              preview only and do not create user accounts.
              Once authentication is implemented, account
              information needed for the platform will be
              stored using MongoDB.
            </p>
          </section>

          <div className="divider" />

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">
              4. Studio Listings and Images
            </h2>

            <p className="text-sm leading-7 text-base-content/70">
              Studio owners are responsible for providing
              accurate information about their studios,
              including prices, locations, facilities,
              and images. Owners should only upload images
              they have permission to use.
            </p>
          </section>

          <div className="divider" />

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">
              5. User Responsibilities
            </h2>

            <p className="text-sm leading-7 text-base-content/70">
              Users are expected to respect studio rules,
              equipment, and property during their bookings.
              Both studio owners and creators should provide
              accurate information and use the platform
              responsibly.
            </p>
          </section>

          <div className="divider" />

          {/* Section 6 */}
          <section>
            <h2 className="mb-3 text-xl font-semibold">
              6. Contact Information
            </h2>

            <p className="text-sm leading-7 text-base-content/70">
              StudioSpace does not currently have a dedicated
              customer support email. For questions about
              this student project, please contact the
              project owner through the project repository.
            </p>
          </section>

        </div>

        {/* Back to Home */}
        <div className="mt-10">
          <Link
            href="/"
            className="btn btn-outline rounded-full"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}
