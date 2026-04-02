"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { services } from "@/lib/services-data"

export function ServicesSection() {
  const swiperRef = React.useRef<any>(null)

  return (
    <>
      <section id="services" className="pt-10 pb-10 lg:pt-14 lg:pb-14 bg-[rgb(245,245,245)]">
        <div className="container mx-auto px-4">

          <div className="text-center mb-4 lg:mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-2 lg:mb-4">
              What We Offer
            </h2>
            <p className="text-base lg:text-xl text-foreground max-w-2xl mx-auto">
              Explore our range of personalized rehabilitation services designed to support recovery, independence, and everyday well-being.
            </p>
          </div>


          <div className="relative">

            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous slide"
              className="
              hidden md:flex
              absolute -left-10
              top-1/2 -translate-y-1/2
              z-10
              items-center justify-center
              rounded-full
              bg-white/90
              backdrop-blur
              text-primary
              p-3
              shadow-lg
              transition-all
              hover:bg-white
              hover:scale-110
              -translate-x-4
            "
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next slide"
              className="
              hidden md:flex
              absolute -right-10
              top-1/2 -translate-y-1/2
              z-10
              items-center justify-center
              rounded-full
              bg-white/90
              backdrop-blur
              text-primary
              p-3
              shadow-lg
              transition-all
              hover:bg-white
              hover:scale-110
              translate-x-4
            "
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Swiper */}
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={false}
              pagination={{
                clickable: true,
                el: ".services-pagination",
              }}
              loop
              spaceBetween={24}
              className="!items-stretch"
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {services.map((service, index) => {
                const Icon = service.icon

                return (
                  <SwiperSlide key={index} className="!h-auto flex">
                    <Link href={`/services/${service.id}`} className="flex h-full">
                      <Card
                        className={`group w-full flex flex-col overflow-hidden rounded-3xl transition-all duration-500 p-0
                        ${service.status === "coming"
                            ? "border-2 border-dashed border-muted opacity-80"
                            : "border-2 border-primary/20 hover:border-primary/50 hover:shadow-2xl"
                          }
                      `}
                      >
                        {/* IMAGE */}
                        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-3xl">

                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110
                              ${service.status === "coming" ? "grayscale blur-[1px]" : ""}
                            `}
                            sizes="(max-width: 640px) 100vw, 
                                   (max-width: 1024px) 50vw, 
                                   (max-width: 1280px) 33vw, 
                                   25vw"
                          />


                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                          {service.status === "coming" && (
                            <span className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                              Coming Soon
                            </span>
                          )}

                          {/* Title */}
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <Icon className="w-6 h-6 text-white" strokeWidth={2.25} />
                              </div>

                              <h3 className="text-lg font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
                                {service.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>


          <div className="services-pagination flex justify-center mt-4 mb-4 lg:mt-6 lg:mb-6" />


          <div className="flex justify-center mt-6 lg:mt-12">
            <Button
              size="lg"
              className="
      group relative overflow-hidden rounded-full
      bg-linear-to-r from-primary to-secondary
      text-white font-semibold
      px-8 py-4
      cursor-pointer
      shadow-md
      transition-all duration-300 ease-out
      hover:-translate-y-0.5
      hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
    "
              asChild
            >
              <Link href="/#contact">
                <span className="relative z-10">Book a Consultation</span>
                <span
                  className="
                    pointer-events-none
                    absolute -top-[150%] left-0
                    w-[300%] h-[6px]
                    bg-white/40
                    rounded-full
                    blur-sm
                    opacity-0
                    transition-all duration-500
                    group-hover:top-[150%]
                    group-hover:opacity-100
                  "
                />
              </Link>
            </Button>
          </div>

        </div>
      </section>

    </>
  )
}