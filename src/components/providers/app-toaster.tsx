"use client";

import { Toaster } from "sonner";
import { useTheme } from "@wrksz/themes/client";

export function AppToaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      richColors
      closeButton
      duration={4000}
    />
  );
}