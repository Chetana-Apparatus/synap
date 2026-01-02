"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "Reconnect",
    subtitle: "Restore communication, confidence, and connection",
    description:
      "Our speech and communication therapy programs help you rebuild meaningful connections with loved ones and regain your confidence in social interactions.",
    cta: "Explore Services",
    href: "/#services",
    image: "/images/S1.webp",
  },
  {
    id: 2,
    title: "Relearn",
    subtitle: "Rebuild essential skills for everyday life",
    description:
      "Through cognitive and occupational therapy, we help you rediscover and strengthen the skills needed for daily activities and independent living.",
    cta: "Our Approach",
    href: "/#approach",
    image: "/images/S2.webp",
  },
  {
    id: 3,
    title: "Rediscover Strength",
    subtitle: "Empowering body, mind, and well-being",
    description:
      "Our comprehensive approach combines physiotherapy, emotional counseling, and wellness programs to help you achieve holistic health and resilience.",
    cta: "Book a Consultation",
    href: "/#contact",
    image: "/images/S3.webp",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  /* ---------------- SWIPE (MOBILE ONLY) ---------------- */
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const minSwipeDistance = 50

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 1024

  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMobile()) return
    touchEndX.current = null
    touchStartX.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMobile()) return
    touchEndX.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (!isMobile()) return
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    if (Math.abs(distance) < minSwipeDistance) return

    if (distance > 0) goToNext()
    else goToPrevious()
  }

  /* ---------------- AUTOPLAY ---------------- */
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div
      className="relative w-full min-h-[85vh] lg:min-h-[100vh] overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center px-4">
            <div className="max-w-4xl text-center">
              <h1 className="mb-4 text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                {slide.title}
              </h1>

              <p className="mb-6 text-xl md:text-2xl font-medium text-primary-foreground/90">
                {slide.subtitle}
              </p>

              <p className="mb-10 text-base md:text-lg text-white/85 max-w-2xl mx-auto">
                {slide.description}
              </p>

              <Link href={slide.href}>
                <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-white font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]"
                >
                  <span className="relative z-10">{slide.cta}</span>
                  <span className="pointer-events-none absolute -top-[150%] left-0 w-[300%] h-[6px] bg-white/40 blur-sm opacity-0 transition-all duration-500 group-hover:top-[150%] group-hover:opacity-100" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Desktop Arrows */}
      <button
        onClick={goToPrevious}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/40 p-3 text-white hover:bg-black/60"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/40 p-3 text-white hover:bg-black/60"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
