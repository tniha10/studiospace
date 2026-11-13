
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  ChevronDown,
  LayoutDashboard,
  Plus,
  ListVideo,
  CalendarDays,
  LogOut,
} from "lucide-react";

import { toast } from "sonner";
import { signOut } from "@/lib/auth-client";
import type { SessionUser } from "@/lib/types";
import { getInitials } from "@/lib/utils";

type UserMenuProps = {
  user: SessionUser;
};

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle logout
  async function handleLogout() {
    setIsOpen(false);
    setIsLoggingOut(true);

    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message ?? "Could not log out. Please try again.");
        return;
      }

      toast.success("You have been logged out.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Could not log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="relative" ref={menuRef}>

      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full border border-base-300 bg-base-100 p-1 pr-3 hover:bg-base-200"
      >

        {/* Profile Image or Initials */}
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={36}
            height={36}
            unoptimized
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
            {getInitials(user.name)}
          </div>
        )}

        {/* User Name */}
        <div className="hidden text-left xl:block">
          <p className="max-w-32 truncate text-sm font-semibold">
            {user.name}
          </p>

          <p className="max-w-32 truncate text-xs text-base-content/60">
            {user.email}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown
          size={16}
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Account menu"
          className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"
        >

          {/* User Information */}
          <div className="border-b border-base-300 px-3 py-3">
            <p className="truncate text-sm font-semibold">
              {user.name}
            </p>

            <p className="truncate text-xs text-base-content/60">
              {user.email}
            </p>
          </div>

          {/* Dashboard */}
          <Link
            href="/dashboard"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-base-200"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Add New Studio */}
          <Link
            href="/add-studio"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-base-200"
          >
            <Plus size={18} />
            Add New Studio
          </Link>

          {/* My Studio Listings */}
          <Link
            href="/my-listings"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-base-200"
          >
            <ListVideo size={18} />
            My Studio Listings
          </Link>

          {/* My Bookings */}
          <Link
            href="/my-bookings"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-base-200"
          >
            <CalendarDays size={18} />
            My Bookings
          </Link>

          {/* Logout */}
          <div className="mt-2 border-t border-base-300 pt-2">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-error hover:bg-error/10 disabled:opacity-60"
            >
              {isLoggingOut ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <LogOut size={18} />
              )}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
