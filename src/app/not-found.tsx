
import Link from "next/link";
import { ArrowLeft, Compass, Aperture } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-base-200 px-5 py-16">

      <div className="mx-auto max-w-2xl text-center">

        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Aperture
              size={40}
              className="text-primary"
            />
          </div>
        </div>

        {/* Error Number */}
        <h1 className="text-7xl font-bold text-primary md:text-8xl">
          404
        </h1>

        {/* Error Heading */}
        <h2 className="mt-5 text-3xl font-bold md:text-4xl">
          Page Not Found
        </h2>

        {/* Error Message */}
        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-base-content/70">
          Sorry, the page you are looking for does not exist.
          It may have been moved, deleted, or the link might
          be incorrect.
        </p>

        {/* Navigation Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

          {/* Home Button */}
          <Link
            href="/"
            className="btn btn-primary rounded-full px-7"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          {/* Explore Studios Button */}
          <Link
            href="/studios"
            className="btn btn-outline rounded-full px-7"
          >
            <Compass size={18} />
            Explore Studios
          </Link>

        </div>

      </div>
    </main>
  );
}
