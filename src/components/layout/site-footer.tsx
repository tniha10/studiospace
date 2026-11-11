
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { SocialLinks } from "@/components/layout/social-links";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";

import {
  FOOTER_LINKS,
  STUDIO_CATEGORIES,
} from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-base-300 bg-base-200">

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12">

        {/* Host Section */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-base-300 bg-base-100 p-7 md:flex-row md:items-center">

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              For Studio Owners
            </p>

            <h2 className="max-w-xl text-2xl font-bold md:text-3xl">
              Have a Studio? Share Your Space with Creators.
            </h2>

            <p className="mt-3 text-sm leading-6 text-base-content/70">
              StudioSpace is being built to help studio owners
              connect with people looking for creative workspaces.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="btn btn-primary rounded-full px-6"
          >
            List Your Studio
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Main Footer Content */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Logo and About */}
          <div>
            <Logo />

            <p className="mt-5 text-sm leading-7 text-base-content/70">
              StudioSpace is a creative workspace marketplace
              designed to help creators discover studios for
              photography, music, podcasts, filming, and more.
            </p>

            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/70 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Categories */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Studio Categories
            </h3>

            <ul className="space-y-3">
              {STUDIO_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/studios?category=${category.slug}`}
                    className="text-sm text-base-content/70 hover:text-primary"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Stay Updated
            </h3>

            <p className="text-sm leading-6 text-base-content/70">
              Get updates about new studios, creative spaces,
              and upcoming StudioSpace features.
            </p>

            <FooterNewsletter />
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-base-300 pt-6 md:flex-row md:items-center">

          <p className="text-sm text-base-content/60">
            © 2026 StudioSpace. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/terms"
              className="text-sm text-base-content/60 hover:text-primary"
            >
              Terms & Privacy
            </Link>

            <Link
              href="/about"
              className="text-sm text-base-content/60 hover:text-primary"
            >
              About Us
            </Link>
          </div>

        </div>

        {/* Project Information */}
        <p className="mt-5 text-xs leading-6 text-base-content/50">
          StudioSpace is currently a student project.
          Studio bookings, availability, and payments
          are not active until the backend is connected.
        </p>

      </div>

    </footer>
  );
}
