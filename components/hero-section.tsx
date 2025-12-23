"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
// import { HeroSection } from '@/components/hero-section';
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
    cta: " Our approach",
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
  <div className="relative h-screen w-full overflow-hidden">
    {slides.map((slide, index) => (
      <div
        key={slide.id}
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          index === currentSlide ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat object-cover"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="max-w-4xl text-center">
            <h1 className="mb-4 text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {slide.title}
            </h1>

            <p className="mb-6 text-xl md:text-2xl font-medium text-primary-foreground/90">
              {slide.subtitle}
            </p>

            <p className="mb-10 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
              {slide.description}
            </p>

            <Link href={slide.href}>
  <Button
    size="lg"
    className="rounded-full bg-linear-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
  >
    {slide.cta}
  </Button>
</Link>

          </div>
        </div>
      </div>
    ))}

    {/* Navigation Arrows */}
    <button
      onClick={goToPrevious}
      className="absolute left-4 md:left-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur hover:bg-white/30"
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>

    <button
      onClick={goToNext}
      className="absolute right-4 md:right-8 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur hover:bg-white/30"
      aria-label="Next slide"
    >
      <ChevronRight className="h-6 w-6" />
    </button>

    {/* Dots */}
    <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`h-3 rounded-full transition-all ${
            index === currentSlide
              ? "w-10 bg-primary"
              : "w-3 bg-white/50 hover:bg-white"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
)
}