
import Link from "next/link";
import { Aperture } from "lucide-react";

type LogoProps = {
  className?: string;
  markOnly?: boolean;
  href?: string;
};

export function Logo({
  className = "",
  markOnly = false,
  href = "/",
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="StudioSpace home"
      className={`flex items-center gap-2 ${className}`}
    >
      {/* Logo Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-content">
        <Aperture size={24} />
      </div>

      {/* Website Name */}
      {!markOnly && (
        <span className="text-2xl font-bold">
          Studio<span className="text-primary">Space</span>
        </span>
      )}
    </Link>
  );
}
