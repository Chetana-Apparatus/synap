"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation , Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import {
  MessageSquare,
  Brain,
  Utensils,
  Lightbulb,
  Activity,
  Hand,
  HeartPulse,
  Apple,
} from "lucide-react"

/* -------- SERVICES DATA -------- */

const services = [
  {
    icon: MessageSquare,
    title: "Speech Therapy",
    description:
      "Speech therapy helps children and adults communicate clearly and confidently. It focuses on production and quality of speech. Therapy aims to improve how speech sounds are formed and how effectively the voice is used for communication. Helps in cases of Articulation and Phonological disorders, Stuttering and Cluttering, Dysarthria and Apraxia of Speech, and Voice disorders.",
    image: "/speech-therapy.jpg",
    status: "active",
  },
  {
    icon: Brain,
    title: "Language & Communication Therapy",
    description:
      "Language and communication therapy targets the understanding and use of language in everyday interactions. It supports individuals with language delay, autism spectrum–related communication needs, aphasia following stroke or brain injury, and social communication difficulties, helping them comprehend information, express ideas, and use language meaningfully in daily life.",
    image: "/language-therapy.jpg",
    status: "active",
  },
  {
    icon: Utensils,
    title: "Swallowing (Dysphagia) Therapy",
    description:
      "Comprehensive assessment and evidence-based treatment for swallowing and feeding difficulties, supporting neurological conditions, post-stroke and head & neck rehabilitation, pediatric feeding disorders, with a focus on safe and efficient swallowing.",
    image: "/swallowing-therapy.jpg",
    status: "active",
  },
  {
    icon: Lightbulb,
    title: "Cognitive Rehabilitation",
    description:
      "Cognitive rehabilitation focuses on improving memory, attention, thinking, problem-solving, and everyday communication. It is designed for individuals with neurological conditions, brain injuries, or cognitive difficulties, helping them become more independent in daily activities.",
    image: "/cognitive-therapy.jpg",
    status: "active",
  },
  {
    icon: Activity,
    title: "Physiotherapy",
    description:
      "It enhances helps improve movement, strength, balance, and overall physical independence. Our services will include paediatric, adult, and neurological rehabilitation, supporting recovery and better mobility at every stage of life.",
    image: "/physiotherapy.jpg",
    status: "coming",
  },
  {
    icon: Hand,
    title: "Occupational Therapy",
    description:
      "Encourages autonomy in completing daily tasks and develops refined motor functions. It focuses on fine motor skills, sensory integration, handwriting, and daily living skills for both children and adults.",
    image: "/occupational-therapy.jpg",
    status: "coming",
  },
  {
    icon: HeartPulse,
    title: "Psychology & Behavioural Services",
    description:
      "These services provide emotional and behavioral support to improve mental well-being. They include counseling, psychological assessments, and behavior therapy, helping individuals manage emotions, stress, and everyday challenges.",
    image: "/psychology-therapy.jpg",
    status: "coming",
  },
  {
    icon: Apple,
    title: "Diet & Nutrition Services",
    description:
      "Our diet and nutrition services offer personalized meal planning to support health, recovery, and wellness. This includes therapeutic diets, and dysphagia-friendly nutrition plans for safe and healthy eating.",
    image: "/nutrition-therapy.jpg",
    status: "coming",
  },
]



export function ServicesSection() {
  const swiperRef = React.useRef<any>(null)

  return (
    <section id="services" className="pt-12 pb-20 lg:pt-20 lg:pb-32 bg-[rgb(245,245,245)]">
      <div className="container mx-auto px-4">
       
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-foreground max-w-2xl mx-auto">
            Discover our diverse range of tailored rehabilitation services
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
                  <Card
                    className={`group h-full flex flex-col overflow-hidden rounded-3xl transition-all duration-500 p-0
                      ${
                        service.status === "coming"
                          ? "border-2 border-dashed border-muted opacity-80"
                          : "border-2 border-primary/20 hover:border-primary/50 hover:shadow-2xl"
                      }
                    `}
                  >
                    {/* IMAGE */}
                    <div className="relative h-72 shrink-0 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className={`object-cover transition-transform duration-700 group-hover:scale-105
                          ${service.status === "coming" ? "grayscale blur-[1px]" : ""}
                        `}
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
                         <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
  <Icon className="w-6 h-6 text-white" strokeWidth={2.25} />
</div>

                          <h3 className="text-lg font-bold text-white">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    
                    <div className="p-6 flex-1 flex">
                      <p
                        className={`text-sm leading-relaxed
                          ${
                            service.status === "coming"
                              ? "text-black"
                              : "text-black"
                          }
                        `}
                      >
                        {service.description}
                      </p>
                    </div>
                  </Card>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

     
        <div className="services-pagination flex justify-center mt-6 mb-6" />

    
        <div className="flex justify-center mt-12">
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
  >
    
    <span className="relative z-10">
      <Link href="#contact">Book a Consultation</Link>
    </span>

    
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
  </Button>
</div>

      </div>
    </section>
  )
}