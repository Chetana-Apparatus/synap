"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

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
      "Speech therapy supports children and adults in speaking clearly, confidently, and with ease. Our focus is not just on speech sounds, but on helping individuals express themselves comfortably in everyday conversations.Therapy targets how speech sounds are produced and how the voice is used, adapting care to each person’s needs. We provide support for articulation and phonological disorders, stuttering and cluttering, dysarthria, apraxia of speech, and voice disorders, using evidence-based and compassionate approaches.Our goal is to support clearer communication, improved confidence, and better participation in daily life.",
    image: "/speech-therapy.jpg",
    status: "active",
    alt: "“Speech therapy session at SynapCare Rehabilitation Center in Aundh Pune” "
  },
  {
    icon: Brain,
    title: "Language & Communication Therapy",
    description:
      "Language and communication therapy help individuals understand, express, and use language meaningfully in everyday life. We support children and adults in building practical communication skills that improve connection and participation.Our therapy addresses language delays, autism-related communication needs, aphasia following stroke or brain injury, and social communication and literacy related challenges. Sessions focus on helping individuals comprehend information,sharethoughts and emotions, and communicate more confidently across home, school, and social settings.Our aim is to make communication more functional, natural, and effective where it matters most.",
    image: "/language-therapy.jpg",
    status: "active",
    alt: "“Language and communication therapy session at SynapCare Rehabilitation Center in Aundh Pune” "
  },
  {
    icon: Utensils,
    title: "Swallowing (Dysphagia) Therapy",
    description:
      "We provide comprehensive assessment and evidence-based therapy for individuals with swallowing and feeding difficulties. Our programs support children and adults affected by neurological conditions, post-stroke recovery, head and neck rehabilitation, and pediatric feeding disorders. Combining Traditional therapy with Electrical Stimulation for swallowing to bring faster and better recovery Our therapists focus on helping each person swallow safely and efficiently, improving comfort, nutrition, strength, and quality of life.By combining careful evaluation, personalized therapy plans, and ongoing guidance for families and caregivers, we help restore confidence and independence in eating and drinking.Whether it’s rebuilding swallowing skills after an injury or supporting a child with feeding challenges, our goal is to make every meal safe, manageable, and nourishing.",
    image: "/swallowing-therapy.jpg",
    status: "active",
    alt: "Comprehensive swallowing and dysphagia therapy session at SynapCare Rehabilitation Center in Aundh Pune"
  },
  {
    icon: Lightbulb,
    title: "Cognitive Rehabilitation",
    description:
      "Our cognitive rehabilitation program helps individuals improve memory, attention, problem-solving, and everyday thinking skills. Designed for adults with neurological conditions, brain injuries, or cognitive difficulties, therapy focuses on practical skills that support independence in daily life.Through personalized exercises, real-life practice, and family guidance, we aim to help clients regain confidence, enhance decision-making, and participate more fully at home or work. Our approach combines evidence-based methods with compassionate support to make meaningful, lasting improvements.",
    image: "/cognitive-therapy.jpg",
    status: "active",
    alt: "Cognitive rehabilitation therapy session at SynapCare Rehabilitation Center in Aundh Pune"
  },
  {
    icon: Activity,
    title: "Physiotherapy",
    description:
      "Our physiotherapy programs are designed to enhance movement, strength, balance, and overall physical independence. We will provide support for children, adults, and individuals with neurological conditions, helping each person recover and regain mobility at every stage of life.Our evidence-based approach focuses on functional outcomes, personalized exercise plans, and ongoing guidance for families and caregivers. Whether it’s improving mobility after injury, supporting developmental needs in children, or maintaining independence in adults, physiotherapy at SynapCare aims to restore confidence and physical capability. ",
    image: "/physiotherapy.jpg",
    status: "coming",
    alt: "Physiotherapy session at SynapCare Rehabilitation Center in Aundh Pune"
  },
  {
    icon: Hand,
    title: "Occupational Therapy",
    description:
      "Our occupational therapy programs are designed to help children and adults regain independence in daily activities. Therapy focuses on improving fine motor skills, sensory integration, handwriting, and everyday living skills, enabling individuals to perform tasks with confidence and ease.By combining personalized exercises, practical strategies, and caregiver guidance, our approach encourages autonomy, promotes skill development, and enhances participation at home, school, and work. We support individuals to live more independently and confidently through occupational therapy. ",
    image: "/occupational-therapy.jpg",
    status: "coming",
    alt: "Occupational therapy session at SynapCare Rehabilitation Center in Aundh Pune"
  },
  {
    icon: HeartPulse,
    title: "Psychology & Behavioural Services",
    description:
      "Our psychology and behavioural services are designed to support emotional well-being and mental health for children and adults. We provide counseling, psychological assessments, and behavior therapy to help individuals manage emotions, cope with stress, and overcome everyday challengesOur approach combines evidence-based strategies with compassionate guidance, empowering clients to build resilience, improve coping skills, and enhance overall quality of life. By integrating emotional and behavioural support with other rehabilitation services, we aim for holistic care that addresses both mind and body.",
    image: "/psychology-therapy.jpg",
    status: "coming",
    alt: "Psychology and behavioral therapy session at SynapCare Rehabilitation Center in Aundh Pune"
  },
  {
    icon: Apple,
    title: "Diet & Nutrition Services",
    description:
      "Our diet and nutrition services provide personalized meal planning to support health, recovery, and overall wellness. We design therapeutic diets and dysphagia-friendly nutrition plans tailored to each individual’s needs, ensuring safe, nourishing, and practical eating.Our approach combines clinical expertise with guidance for families and caregivers, helping clients achieve their nutrition goals while supporting rehabilitation and long-term well-being. Whether for recovery, chronic conditions, or dietary management, our focus is on making healthy eating safe, simple, and effective.",
    image: "/nutrition-therapy.jpg",
    status: "coming",
    alt: "Personalized diet and nutrition services at SynapCare Rehabilitation Center in Aundh Pune"
  },
]



export function ServicesSection() {
  const swiperRef = React.useRef<any>(null)

  const [isOpen, setIsOpen] = React.useState(false);
  const [popHeading, setPopHeading] = React.useState("");
  const [popContent, setPopContent] = React.useState("");

  const handlePopUp = (index: number) => {
    setPopHeading(services[index].title);
    setPopContent(services[index].description);
    setIsOpen(true);
  }

  return (
    <>

      {isOpen && <div className="fixed h-screen w-screen bg-black/80 z-1000 top-0 left-0 flex items-center justify-center p-4">

        <div className="absolute h-full w-full " onClick={() => setIsOpen(false)}></div>



        <div className="p-8 bg-white rounded-xl max-w-[600px] w-full relative  flex flex-col gap-2 md:h-auto h-[400px] o  "   >

          <div className="absolute top-4 right-4 cursor-pointer flex items-center justify-center p-1 rounded-full hover:bg-gray-300" onClick={() => setIsOpen(false)}>
            <X />
          </div>

          <h3 className="text-xl font-bold text-primary w-full border-b border-gray-300 pb-4 mb-4">{popHeading}</h3>
          <p className="text-balance leading-8 letter overflow-y-auto">{popContent}</p>



        </div>


      </div>}



      <section id="services" className="pt-12 pb-20 lg:pt-20 lg:pb-32 bg-[rgb(245,245,245)]">
        <div className="container mx-auto px-4">

          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
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
                    <Card
                      className={`group h-full flex flex-col overflow-hidden rounded-3xl transition-all duration-500 p-0
                      ${service.status === "coming"
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
                          ${service.status === "coming"
                              ? "text-black"
                              : "text-black"
                            }
                        `}
                        >
                          {service.description.slice(0, 500)}{
                            service.description.length > 500 ? <>
                              <button onClick={() => handlePopUp(index)} className=" text-primary font-bold block"> Read More</button>
                            </> : ""
                          }
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

    </>
  )
}