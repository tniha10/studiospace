
"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");

  // Handle newsletter form submission
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userEmail = email.trim();

    // Check if email is empty
    if (userEmail === "") {
      toast.error("Please enter your email address");
      return;
    }

    // Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Newsletter API is not connected yet
    toast.info("Newsletter subscription is coming soon!");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5">

      {/* Email Input */}
      <div className="mb-3">
        <label
          htmlFor="newsletter-email"
          className="mb-2 block text-sm font-medium"
        >
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
          />

          <input
            type="email"
            id="newsletter-email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full rounded-full bg-base-100 pl-11"
            autoComplete="email"
          />
        </div>
      </div>

      {/* Subscribe Button */}
      <button
        type="submit"
        className="btn btn-primary w-full rounded-full"
      >
        Subscribe
        <ArrowRight size={18} />
      </button>

      {/* Information */}
      <p className="mt-3 text-xs leading-5 text-base-content/60">
        Newsletter subscription will be available soon.
      </p>

    </form>
  );
}
