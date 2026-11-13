
export function getInitials(name: string) {
  const words = name.trim().split(/\s+/);

  if (words.length === 1 && words[0] === "") {
    return "SS";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  const firstLetter = words[0][0];
  const lastLetter = words[words.length - 1][0];

  return (firstLetter + lastLetter).toUpperCase();
}

export function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (pathname === href) {
    return true;
  }

  return pathname.startsWith(href + "/");
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Only allows redirects inside this site (no //evil.example). */
export function safeRedirectPath(
  value: string | undefined,
  fallback = "/dashboard"
) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
