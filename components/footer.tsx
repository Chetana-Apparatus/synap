"use client"



import Image from "next/image"

import Link from "next/link"

import { Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react"

import { useEffect, useState } from "react"



export function Footer() {

  const [showArrow, setShowArrow] = useState(false)



  useEffect(() => {

    const handleScroll = () => {

      // Show arrow after Hero section

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

        <div className="grid md:grid-cols-4 gap-6 mb-8">



          {/* Logo & Tagline */}

          <div className="md:col-span-2 flex flex-col items-start gap-4 leading-none ">
            <div className="relative h-[100px] w-[280px] overflow-hidden">
              <Image
                src="/images/Logo 1.webp"
                alt="SynapCare"
                fill
                className="  brightness-0 invert border-2 object-contain scale-[1.9] -ml-4"
              />
            </div>

            <p className="text-white/70 leading-relaxed max-w-md text-balance">
              Reconnecting minds,rebuilding lives,one synapse at a time.
            </p>


            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61585082220584/"
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




          {/* Quick Links */}

          <div>

            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>

            <ul className="space-y-2">

              {["home", "about", "services", "founder", "contact"].map((item) => (

                <li key={item}>

                  <Link

                    href={`#${item}`}

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

            <h4 className="font-semibold text-lg mb-4">Services</h4>

            <ul className="space-y-2 text-white/70">

              <li>Speech Therapy</li>

              <li>Language Therapy</li>

              <li>Swallowing Therapy</li>

              <li>Cognitive Rehabilitation</li>

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



      {/* 🔼 Scroll To Top Arrow (visible after Hero section) */}

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

