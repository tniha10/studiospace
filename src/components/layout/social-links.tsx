
"use client";

import { toast } from "sonner";

import {
  XLogo,
  InstagramLogo,
  YouTubeLogo,
} from "@/components/brand/social-logos";

export function SocialLinks() {
  return (
    <div className="mt-5 flex items-center gap-3">

      {/* X / Twitter */}
      <button
        type="button"
        aria-label="X profile coming soon"
        title="X - Coming Soon"
        className="btn btn-ghost btn-circle border border-base-300 bg-base-100 hover:border-primary hover:text-primary"
        onClick={() => toast.info("X profile is coming soon!")}
      >
        <XLogo className="h-5 w-5" />
      </button>

      {/* Instagram */}
      <button
        type="button"
        aria-label="Instagram profile coming soon"
        title="Instagram - Coming Soon"
        className="btn btn-ghost btn-circle border border-base-300 bg-base-100 hover:border-primary hover:text-primary"
        onClick={() => toast.info("Instagram profile is coming soon!")}
      >
        <InstagramLogo className="h-5 w-5" />
      </button>

      {/* YouTube */}
      <button
        type="button"
        aria-label="YouTube profile coming soon"
        title="YouTube - Coming Soon"
        className="btn btn-ghost btn-circle border border-base-300 bg-base-100 hover:border-primary hover:text-primary"
        onClick={() => toast.info("YouTube profile is coming soon!")}
      >
        <YouTubeLogo className="h-5 w-5" />
      </button>

    </div>
  );
}
