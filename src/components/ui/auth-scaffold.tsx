
import Link from "next/link";
import { CheckCircle, LockKeyhole } from "lucide-react";
import { Logo } from "@/components/brand/logo";

type AuthScaffoldProps = {
  mode: "login" | "register";
};

export function AuthScaffold({ mode }: AuthScaffoldProps) {
  const isLogin = mode === "login";

  return (
    <main className="min-h-screen bg-base-200 px-5 py-12 md:px-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-lg lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden bg-secondary p-10 text-secondary-content lg:flex lg:flex-col lg:justify-between">

          <div>
            <Logo />

            <p className="mt-12 text-sm font-semibold uppercase tracking-wider opacity-70">
              Welcome to StudioSpace
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight">
              Find the perfect space for your creativity.
            </h2>

            <p className="mt-5 text-sm leading-7 opacity-80">
              Discover creative studios, manage your bookings, and
              share your own workspace with other creators.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="shrink-0 text-accent" />
                <p className="text-sm">
                  Discover studios for your creative projects
                </p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="shrink-0 text-accent" />
                <p className="text-sm">
                  Manage all your bookings in one place
                </p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="shrink-0 text-accent" />
                <p className="text-sm">
                  List your own studio and reach more creators
                </p>
              </div>

            </div>
          </div>

          <p className="mt-12 text-xs opacity-60">
            StudioSpace is currently under development.
          </p>

        </div>

        {/* Right Side - Authentication Form */}
        <div className="p-6 sm:p-10">

          <h1 className="text-3xl font-bold md:text-4xl">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </h1>

          <p className="mt-3 text-sm text-base-content/60">
            {isLogin
              ? "Login to explore studios and manage your bookings."
              : "Join StudioSpace and start your creative journey."}
          </p>

          {/* Form */}
          <form className="mt-8 space-y-5">

            {/* Name - Register Only */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="auth-name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="auth-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="auth-email"
                className="mb-2 block text-sm font-medium"
              >
                Email Address
              </label>

              <input
                id="auth-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="input input-bordered w-full"
                disabled
              />
            </div>

            {/* Photo URL - Register Only */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="auth-photo"
                  className="mb-2 block text-sm font-medium"
                >
                  Profile Photo URL
                </label>

                <input
                  id="auth-photo"
                  type="url"
                  name="photoUrl"
                  placeholder="Enter your photo URL"
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label
                htmlFor="auth-password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="auth-password"
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="input input-bordered w-full"
                disabled
              />

              {!isLogin && (
                <p className="mt-2 text-xs text-base-content/60">
                  Password must contain at least 6 characters.
                </p>
              )}
            </div>

            {/* Forgot Password */}
            {isLogin && (
              <p className="text-right text-sm text-base-content/60">
                Forgot password? (Coming soon)
              </p>
            )}

            {/* Login / Register Button */}
            <button
              type="button"
              className="btn btn-primary w-full"
              disabled
            >
              {isLogin ? "Login" : "Register"}
            </button>

          </form>

          {/* Google Authentication */}
          <div className="divider my-6">OR</div>

          <button
            type="button"
            className="btn btn-outline w-full"
            disabled
          >
            Continue with Google
          </button>

          {/* Preview Notice */}
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-base-200 p-4">
            <LockKeyhole size={20} className="shrink-0 text-primary" />

            <p className="text-xs leading-6 text-base-content/70">
              Authentication is not connected yet. This form is only
              a preview and does not submit or store user information.
            </p>
          </div>

          {/* Login / Register Link */}
          <p className="mt-6 text-center text-sm">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}

            <Link
              href={isLogin ? "/register" : "/login"}
              className="font-semibold text-primary hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}
