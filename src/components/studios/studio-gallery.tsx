"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type StudioGalleryProps = {
  images: string[];
  title: string;
};

/**
 * Swipeable photo gallery for a studio. With a single image it simply shows
 * that image; with several it adds arrows, dots and keyboard control.
 */
export function StudioGallery({ images, title }: StudioGalleryProps) {
  const uniqueImages = Array.from(new Set(images.filter(Boolean)));
  const hasMany = uniqueImages.length > 1;

  return (
    <div
      className="overflow-hidden rounded-2xl bg-base-300"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} photo gallery`}
    >
      <Swiper
        modules={[A11y, Keyboard, Navigation, Pagination]}
        navigation={hasMany}
        pagination={hasMany ? { clickable: true } : false}
        keyboard={{ enabled: true }}
        allowTouchMove={hasMany}
        style={
          {
            "--swiper-navigation-color": "#ffffff",
            "--swiper-pagination-color": "#ffffff",
            "--swiper-pagination-bullet-inactive-color": "#ffffff",
            "--swiper-pagination-bullet-inactive-opacity": "0.5",
          } as CSSProperties
        }
        className="h-72 md:h-[420px]"
      >
        {uniqueImages.map((src, index) => (
          <SwiperSlide key={src}>
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={
                  hasMany
                    ? `${title}, photo ${index + 1} of ${uniqueImages.length}`
                    : title
                }
                fill
                unoptimized
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}