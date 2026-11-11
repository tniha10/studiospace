import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { safeRedirectPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your StudioSpace account.",
};

// The login screen reads ?next= before rendering the form.
export const instant = false;

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const nextPath = safeRedirectPath(next);

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-12">

      <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-8 shadow-sm">

        {/* Login Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Welcome Back!
          </h1>

          <p className="mt-3 text-sm text-base-content/70">
            Login to your StudioSpace account to manage
            your studios and bookings.
          </p>
        </div>

        <LoginForm nextPath={nextPath} />

      </div>
    </div>
  );
}
