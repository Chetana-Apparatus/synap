"use client"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, ArrowUp, Mail, Phone, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { services } from "@/lib/services-data"



export function Footer() {
  const [showArrow, setShowArrow] = useState(false)



  useEffect(() => {

    const handleScroll = () => {



      if (window.scrollY > window.innerHeight) {

        setShowArrow(true)

      } else {

        setShowArrow(false)

      }

    }



    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])



  const scrollToTop = () => {

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    })

  }



  return (

    <footer className="bg-foreground text-white py-12 relative">

      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col items-start gap-4 leading-none ">
            <div className="relative w-[200px] h-[80px]">
              <Image
                src="/images/logo4.webp"
                alt="SynapCare"
                fill
                className="object-contain "
                priority
              />
            </div>

            <p className="text-white/70 mb-1 leading-relaxed max-w-xs text-balance">
              Reconnecting minds, rebuilding lives, one synapse at a time.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="https://www.facebook.com/SynapCareRehab/"
                target="_blank"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition"
              >
                <Facebook className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.instagram.com/synapcare_rehab/"
                target="_blank"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition"
              >
                <Instagram className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.linkedin.com/company/synapcare-rehabilitation-center"
                target="_blank"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 underline underline-offset-8 decoration-primary/30">Quick Links</h4>
            <ul className="space-y-4">
              {["home", "about", "services", "founder", "contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "home" ? "/" : `/#${item}`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6 underline underline-offset-8 decoration-primary/30">Services</h4>
            <ul className="space-y-4 text-white/70">
              {services.slice(0, 7).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6 underline underline-offset-8 decoration-primary/30">Contact Info</h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3 group">
                <a href="mailto:synapcare1510@gmail.com" className="flex items-start gap-3 hover:text-white transition-colors break-all">
                  <Mail className="w-5 h-5 text-primary shrink-0 transition-transform group-hover:scale-110" />
                  synapcare1510@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex flex-col gap-1">
                    <a href="tel:+917387770918" className="hover:text-white transition-colors hover:translate-x-1 transition-transform">
                      +91 73877 70918
                    </a>
                    <a href="tel:+917709370918" className="hover:text-white transition-colors hover:translate-x-1 transition-transform">
                      +91 77093 70918
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=Asha+Apartment,+Sanewadi,+Aundh,+Pune,+Maharashtra+411067"
                  target="_blank"
                  className="flex items-start gap-3 hover:text-white transition-colors leading-relaxed"
                >
                  <MapPin className="w-5 h-5 text-primary shrink-0 transition-transform group-hover:scale-110" />
                  Asha Apartment, Sanewadi, Aundh, Pune, Maharashtra 411067
                </Link>
              </li>
            </ul>
          </div>
        </div>



        {/* Bottom Bar */}

        <div className="border-t border-white/20 pt-8 text-center text-white/60">

          <p>

            &copy; {new Date().getFullYear()} SynapCare Rehabilitation Center. All rights reserved.

          </p>

        </div>

      </div>



      {/* Scroll To Top Arrow (visible after Hero section) */}

      {showArrow && (

        <button

          onClick={scrollToTop}

          aria-label="Scroll to top"

          className="

            fixed bottom-6 right-6 z-50

            flex items-center justify-center

            w-12 h-12

            rounded-full

            bg-gradient-to-r from-primary to-secondary

            text-white

            shadow-lg

            transition-all duration-300

            hover:-translate-y-1

            hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]

          "

        >

          <ArrowUp size={22} />

        </button>

      )}

    </footer>

  )

}

