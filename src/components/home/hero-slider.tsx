"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { A11y, Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    alt: "Bright creative studio workspace with large windows",
    label: "Photo Studios",
    headline: "Find the Right Space for Your Next Shoot.",
    subtext:
      "Natural light, seamless backdrops, and room to build your set. Book a photography studio by the hour.",
  },
  {
    src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
    alt: "Music studio with a mixing desk and monitors",
    label: "Music Suites",
    headline: "Record, Rehearse, and Mix in a Treated Room.",
    subtext:
      "Professional music suites with the gear you need, ready when your next session is.",
  },
  {
    src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
    alt: "Podcast microphone in a quiet recording room",
    label: "Podcast Rooms",
    headline: "Quiet Rooms Built for Clear Audio.",
    subtext:
      "Comfortable podcast lounges for interviews and conversations, booked in a few clicks.",
  },
] as const;

// Swiper reads these CSS variables for its arrows and dots.
const SWIPER_THEME = {
  "--swiper-navigation-color": "#ffffff",
  "--swiper-pagination-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-color": "#ffffff",
  "--swiper-pagination-bullet-inactive-opacity": "0.5",
} as CSSProperties;

export function HeroSlider() {
  return (
    <section
      className="relative bg-base-300"
      aria-roledescription="carousel"
      aria-label="Featured studio spaces"
    >
      <h1 className="sr-only">
        StudioSpace: book creative studios for photo, film, podcast, music and
        art
      </h1>

      <Swiper
        modules={[A11y, Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={700}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true }}
        style={SWIPER_THEME}
        className="h-[560px] md:h-[640px]"
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.src}>
            <div className="relative h-full w-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />

              {/* Readability overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

              <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6 pb-10">
                <div className="max-w-2xl text-white">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/80">
                    {slide.label}
                  </p>

                  <h2 className="text-4xl font-bold leading-tight md:text-6xl">
                    {slide.headline}
                  </h2>

                  <p className="mt-6 max-w-xl text-base leading-8 text-white/85">
                    {slide.subtext}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/studios"
                      className="btn btn-primary rounded-full px-8"
                    >
                      Explore Studios
                      <ArrowRight size={18} />
                    </Link>

                    <Link
                      href="/add-studio"
                      className="btn rounded-full border-white bg-transparent px-8 text-white hover:border-white hover:bg-white hover:text-black"
                    >
                      Host Your Space
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}