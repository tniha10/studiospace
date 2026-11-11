"use client";

import { useTheme } from "@wrksz/themes/client";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleThemeChange() {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <button
      type="button"
      onClick={handleThemeChange}
      className="btn btn-ghost btn-circle btn-sm border border-base-300"
      aria-label="Toggle light and dark theme"
      title="Change theme"
    >
      <Sun
        size={20}
        className="hidden [[data-theme=dark]_&]:block"
      />

      <Moon
        size={20}
        className="block [[data-theme=dark]_&]:hidden"
      />
    </button>
  );
}