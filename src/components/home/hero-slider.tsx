"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    alt: "Bright creative studio workspace with large windows",
    label: "Photo Studios",
    caption: "Natural light, backdrops, and room to build your set.",
  },
  {
    src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
    alt: "Music studio with a mixing desk and monitors",
    label: "Music Suites",
    caption: "Record, rehearse, and mix in a treated room.",
  },
  {
    src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
    alt: "Podcast microphone in a quiet recording room",
    label: "Podcast Rooms",
    caption: "Quiet spaces built for interviews and clear audio.",
  },
] as const;

const SLIDE_INTERVAL_MS = 6000;

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % SLIDES.length);
  }

  const slide = SLIDES[activeIndex];

  return (
    <div
      className="relative h-80 overflow-hidden rounded-2xl bg-base-300 md:h-[440px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured studio spaces"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {SLIDES.map((item, index) => (
        <div
          key={item.src}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Readability overlay + caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/75">
          {slide.label}
        </p>

        <p className="mt-1 text-sm font-medium">{slide.caption}</p>
      </div>

      {/* Previous / Next */}
      <button
        type="button"
        onClick={showPrevious}
        aria-label="Previous slide"
        className="btn btn-circle btn-sm absolute left-3 top-1/2 z-20 -translate-y-1/2 border-none bg-white/85 text-black hover:bg-white"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        onClick={showNext}
        aria-label="Next slide"
        className="btn btn-circle btn-sm absolute right-3 top-1/2 z-20 -translate-y-1/2 border-none bg-white/85 text-black hover:bg-white"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 right-4 z-20 flex gap-1.5">
        {SLIDES.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show slide ${index + 1}: ${item.label}`}
            aria-current={index === activeIndex}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex ? "w-5 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
