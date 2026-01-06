"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("#home")

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#approach", label: "Our Approach" },
    { href: "#founder", label: "Founder" },
    { href: "#contact", label: "Contact" },
  ]

  
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  
  useEffect(() => {
    const updateActiveLink = () => {
      const scrollPosition = window.scrollY + 150

      if (scrollPosition < 200) {
        setActiveLink("#home")
        return
      }

      const sections = ["contact", "founder", "approach", "services", "about", "home"]

      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const bottom = top + el.offsetHeight
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveLink(`#${id}`)
            return
          }
        }
      }
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true })
    updateActiveLink()

    return () => window.removeEventListener("scroll", updateActiveLink)
  }, [])

  return (
    <>
      
      <header
        className="
          fixed top-0 left-0 right-0 z-50
           bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-md
          
          lg:bg-white lg:backdrop-blur-0 lg:border-none
        "
      >
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-20">
           
            <Link href="#home" className="flex items-center gap-2">
              <Image
                src="/images/Logo 1.webp"
                alt="SynapCare Rehabilitation Center"
                width={280}
                height={60}
                className="h-40 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-medium transition-colors
                    ${
                      activeLink === link.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }
                  `}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                asChild
                className="
                  group relative overflow-hidden rounded-full
                  bg-gradient-to-r from-primary to-secondary
                  text-white font-medium
                  px-6 py-3
                  shadow-md
                "
              >
                <Link href="#contact">Book a Consultation</Link>
              </Button>

              <Button
                variant="outline"
                className="rounded-full border-primary text-primary px-6 py-3"
              >
                Call Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-8 w-8" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= FULL SCREEN MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div
          className="
            fixed inset-0 z-[100]
            bg-white
            lg:hidden
            flex flex-col
            animate-in slide-in-from-right duration-300
          "
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between h-20 px-4 border-b">
            {/* SAME LOGO SIZE */}
            <Image
              src="/images/Logo 1.webp"
              alt="SynapCare Rehabilitation Center"
              width={280}
              height={60}
              className="h-40 w-auto"
            />

            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-8 w-8" />
            </button>
          </div>

          {/* Menu Content */}
          <nav className="flex-1 overflow-y-auto px-4 py-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-4 px-4 rounded-xl text-lg font-medium transition-all
                  ${
                    activeLink === link.href
                      ? "bg-muted text-primary"
                      : "text-foreground hover:bg-muted"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="mt-8 flex flex-col gap-4">
              <Button
                asChild
                className="
                  w-full rounded-full
                  bg-gradient-to-r from-primary to-secondary
                  text-white py-4 shadow-md
                "
              >
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book a Consultation
                </Link>
              </Button>

              <Button
                variant="outline"
      className="w-full rounded-full border-primary text-primary py-4"
              >
                Call Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
