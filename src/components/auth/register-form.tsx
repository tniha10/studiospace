"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, ImageIcon, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";

import { signIn, signUp } from "@/lib/auth-client";

type RegisterFormProps = {
  nextPath: string;
};

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export function RegisterForm({ nextPath }: RegisterFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!PASSWORD_RULE.test(password)) {
      setError(
        "Password must be at least 6 characters and include uppercase and lowercase letters."
      );
      return;
    }

    const trimmedPhotoUrl = photoUrl.trim();

    setIsSubmitting(true);

    try {
      const { error: signUpError } = await signUp.email({
        name: name.trim(),
        email,
        password,
        image: trimmedPhotoUrl === "" ? undefined : trimmedPhotoUrl,
      });

      if (signUpError) {
        setError(signUpError.message ?? "Your account could not be created.");
        return;
      }

      toast.success("Account created. Welcome to StudioSpace!");
      router.push(nextPath);
      router.refresh();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Your account could not be created."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleRegister() {
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
      setError(
        caught instanceof Error
          ? caught.message
          : "Google sign-in could not be started."
      );
      setIsGoogleLoading(false);
    }
  }

  return (
    <>
      {/* Register Form */}
      <form onSubmit={handleRegister} className="space-y-5">

        {/* Full Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <div className="flex items-center gap-3 rounded-lg border border-base-300 px-4">
            <User size={18} className="text-base-content/50" />

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full py-3 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
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

        {/* Profile Photo URL */}
        <div>
          <label htmlFor="photoUrl" className="mb-2 block text-sm font-medium">
            Profile Photo URL
          </label>

          <div className="flex items-center gap-3 rounded-lg border border-base-300 px-4">
            <ImageIcon size={18} className="text-base-content/50" />

            <input
              id="photoUrl"
              type="url"
              placeholder="https://example.com/photo.jpg (optional)"
              className="w-full py-3 outline-none"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              autoComplete="photo"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>

          <div className="flex items-center gap-3 rounded-lg border border-base-300 px-4">
            <Lock size={18} className="text-base-content/50" />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full py-3 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={6}
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

          <p className="mt-2 text-xs text-base-content/60">
            At least 6 characters with uppercase and lowercase letters.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium"
          >
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password again"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}

        {/* Register Button */}
        <button
          type="submit"
          disabled={isSubmitting || isGoogleLoading}
          className="btn btn-primary w-full"
        >
          {isSubmitting && (
            <span className="loading loading-spinner loading-sm" />
          )}
          {isSubmitting ? "Creating account..." : "Register"}
        </button>

      </form>

      {/* Google Registration */}
      <div className="mt-6">
        <div className="divider text-xs">OR</div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={isSubmitting || isGoogleLoading}
          className="btn btn-outline w-full"
        >
          {isGoogleLoading && (
            <span className="loading loading-spinner loading-sm" />
          )}
          {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
        </button>
      </div>

      {/* Login Link */}
      <p className="mt-7 text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link
          href={`/login?next=${encodeURIComponent(nextPath)}`}
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  );
}
