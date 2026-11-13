
export const SITE_NAME = "StudioSpace";

export const SITE_DESCRIPTION =
  "Find and book creative studios for photography, filming, podcasting, music, and workshops.";

// Navbar links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
] as const;

// Studio category type
export type StudioCategory = {
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
  aliases: readonly string[];
};

// Studio categories
export const STUDIO_CATEGORIES: readonly StudioCategory[] = [
  {
    slug: "photo-studio",
    label: "Photo Studios",
    shortLabel: "Photo",
    description: "Studios for photography and photoshoots.",
    aliases: ["Photo Studio", "Photography Studio"],
  },
  {
    slug: "sound-stage",
    label: "Sound Stages",
    shortLabel: "Stage",
    description: "Spaces for filming and video production.",
    aliases: ["Film Stage", "Film & Cinema Stage"],
  },
  {
    slug: "podcast-room",
    label: "Podcast Rooms",
    shortLabel: "Podcast",
    description: "Rooms for recording podcasts and interviews.",
    aliases: ["Podcast Lounge"],
  },
  {
    slug: "music-suite",
    label: "Music Suites",
    shortLabel: "Music",
    description: "Studios for recording and practicing music.",
    aliases: ["Music Recording", "Recording Studio"],
  },
  {
    slug: "art-workshop",
    label: "Art Workshops",
    shortLabel: "Workshop",
    description: "Creative spaces for art and workshops.",
    aliases: ["Workshop", "Art Workshop"],
  },
];

// User account menu links
export const ACCOUNT_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/add-studio", label: "Add New Studio", icon: "add" },
  { href: "/my-listings", label: "My Studio Listings", icon: "listings" },
  { href: "/my-bookings", label: "My Bookings", icon: "bookings" },
] as const;

// Footer links
export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/add-studio", label: "List Your Space" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

// Find a category using its slug or alias
export function getCategoryBySlug(slug?: string | null) {
  if (!slug) {
    return null;
  }

  const category = STUDIO_CATEGORIES.find((item) => {
    if (item.slug === slug) {
      return true;
    }

    return item.aliases.some(
      (alias) => alias.toLowerCase() === slug.toLowerCase()
    );
  });

  return category || null;
}
