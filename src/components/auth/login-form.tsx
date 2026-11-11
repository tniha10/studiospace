"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

import { signIn } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/api";

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { error: signInError } = await signIn.email({ email, password });

      if (signInError) {
        setError(signInError.message ?? "Email or password is incorrect.");
        return;
      }

      toast.success("Welcome back!");
      router.push(nextPath);
      router.refresh();
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setIsGoogleLoading(true);

    try {
      const { error: googleError } = await signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}${nextPath}`,
      });

      if (googleError) {
        setError(googleError.message ?? "Google sign-in could not be started.");
        setIsGoogleLoading(false);
      }
    } catch (caught) {
      setError(getErrorMessage(caught));
      setIsGoogleLoading(false);
    }
  }

  return (
    <>
      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5">

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium"
          >
            Email Address
          </label>

          <div className="flex items-center gap-3 rounded-lg border border-base-300 px-4">
            <Mail size={18} className="text-base-content/50" />

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full py-3 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium"
          >
            Password
          </label>

          <div className="flex items-center gap-3 rounded-lg border border-base-300 px-4">
            <Lock size={18} className="text-base-content/50" />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full py-3 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-base-content/60"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="mt-2 text-right">
            <span className="text-sm text-base-content/50">
              Forgot Password?
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={isSubmitting || isGoogleLoading}
          className="btn btn-primary w-full"
        >
          {isSubmitting && (
            <span className="loading loading-spinner loading-sm" />
          )}
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

      </form>

      {/* Google Login */}
      <div className="mt-6">
        <div className="divider text-xs">OR</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isSubmitting || isGoogleLoading}
          className="btn btn-outline w-full"
        >
          {isGoogleLoading && (
            <span className="loading loading-spinner loading-sm" />
          )}
          {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
        </button>
      </div>

      {/* Register Link */}
      <p className="mt-7 text-center text-sm text-base-content/70">
        Don&apos;t have an account?{" "}
        <Link
          href={`/register?next=${encodeURIComponent(nextPath)}`}
          className="font-semibold text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </>
  );
}
