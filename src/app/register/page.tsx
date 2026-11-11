import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";
import { safeRedirectPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your StudioSpace account.",
};

// The register screen reads ?next= before rendering the form.
export const instant = false;

type RegisterPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { next } = await searchParams;
  const nextPath = safeRedirectPath(next);

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-8 shadow-sm">

        {/* Register Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Create Your Account
          </h1>

          <p className="mt-3 text-sm text-base-content/70">
            Join StudioSpace to explore creative studios,
            manage bookings, and share your own workspace.
          </p>
        </div>

        <RegisterForm nextPath={nextPath} />

      </div>
    </div>
  );
}
