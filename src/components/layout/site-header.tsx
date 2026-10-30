
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";

import { NAV_LINKS } from "@/lib/constants";
import type { SessionUser } from "@/lib/types";

type SiteHeaderProps = {
  user?: SessionUser | null;
};

export function SiteHeader({ user = null }: SiteHeaderProps) {
  const pathname = usePathname();

  // State for mobile navbar
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu when Escape is pressed
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Check which navigation link is active
  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur-md">

      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 md:px-12">

        {/* Website Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-2 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-base-content/70 hover:bg-base-200 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Desktop Login / User Menu */}
          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn btn-ghost btn-sm rounded-full"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="btn btn-primary btn-sm rounded-full"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="btn btn-ghost btn-circle lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-base-300 bg-base-100 lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-6xl px-5 py-5"
          >

            {/* Mobile Links */}
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-base-content/70 hover:bg-base-200"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Authentication */}
            <div className="mt-5 border-t border-base-300 pt-5">
              {user ? (
                <div className="rounded-xl bg-base-200 p-4">

                  <p className="mb-1 text-sm font-semibold">
                    {user.name}
                  </p>

                  <p className="mb-4 text-xs text-base-content/60">
                    {user.email}
                  </p>

                  <UserMenu user={user} />

                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">

                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-outline rounded-full"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-primary rounded-full"
                  >
                    Register
                  </Link>

                </div>
              )}
            </div>

          </nav>
        </div>
      )}

    </header>
  );
}
