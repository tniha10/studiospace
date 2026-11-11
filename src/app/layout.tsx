
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppToaster } from "@/components/providers/app-toaster";

import "./globals.css";

// Website Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Website Metadata
export const metadata: Metadata = {
  title: {
    default: "StudioSpace",
    template: "%s | StudioSpace",
  },

  description:
    "StudioSpace is a platform where creators can discover and book photography studios, podcast rooms, and other creative workspaces.",

  keywords: [
    "StudioSpace",
    "studio booking",
    "photography studio",
    "podcast studio",
    "creative workspace",
    "studio rental",
  ],
};

// Main Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col">

        <ThemeProvider>

          {/* Navbar */}
          <SiteHeader />

          {/* Page Content. Pages render their own <main>, so this stays a div
              to avoid nested landmarks. */}
          <div id="main-content" className="flex-1">
            {children}
          </div>

          {/* Footer */}
          <SiteFooter />

          {/* Toast Notifications */}
          <AppToaster />

        </ThemeProvider>

      </body>
    </html>
  );
}
