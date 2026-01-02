"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  // const [isScrolled, setIsScrolled] = useState(false)
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
    // Function to determine which section is currently in view
    const updateActiveLink = () => {
      const scrollPosition = window.scrollY + 150 // Offset for header height + some padding
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // If at the very top, set home as active
      if (scrollPosition < 200) {
        setActiveLink("#home")
        return
      }

      // Check each section from bottom to top to find the active one
      const sections = ["contact", "founder", "approach", "services", "about", "home"]
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const elementTop = element.offsetTop
          const elementBottom = elementTop + element.offsetHeight
          
          // If scroll position is within this section's bounds
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveLink(`#${sectionId}`)
            return
          }
        }
      }

      // If scrolled to bottom, set contact as active
      if (window.scrollY + windowHeight >= documentHeight - 100) {
        setActiveLink("#contact")
      }
    }

    // Set initial active link based on hash or scroll position
    const hash = window.location.hash
    if (hash && navLinks.some(link => link.href === hash)) {
      setActiveLink(hash)
    } else {
      updateActiveLink()
    }

    // Listen for hash changes (when clicking nav links OR footer links)
    const handleHashChange = () => {
      const hash = window.location.hash || "#home"
      if (navLinks.some(link => link.href === hash)) {
        setActiveLink(hash)
        // Also update after scroll animation completes
        setTimeout(() => {
          updateActiveLink()
        }, 1000)
      }
    }

    // Listen for scroll events to update active link based on visible section
    const handleScroll = () => {
      updateActiveLink()
    }

    // Listen for popstate (browser back/forward)
    const handlePopState = () => {
      const hash = window.location.hash || "#home"
      if (navLinks.some(link => link.href === hash)) {
        setActiveLink(hash)
      }
      setTimeout(() => {
        updateActiveLink()
      }, 100)
    }

    window.addEventListener("hashchange", handleHashChange)
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("popstate", handlePopState)
    
    // Update on mount
    updateActiveLink()

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  return (
    <header
  className="
    fixed top-0 left-0 right-0 z-50
    bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-md
    lg:bg-white lg:backdrop-blur-0 lg:border-none
  "
>
      <div className="  mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2">
            <Image
              src="/images/Logo 1.webp"
              alt="SynapCare Rehabilitation Center"
              width={280}
              height={60}
              className="h-40 w-auto "
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

                {/* Active underline */}
                {activeLink === link.href && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          
         {/* CTA Buttons */}
<div className="hidden lg:flex items-center gap-4">
  {/* Primary CTA */}
  <Button
    asChild
    className="
      group relative overflow-hidden rounded-full
      bg-gradient-to-r from-primary to-secondary
      text-white font-medium
      px-6 py-3
      cursor-pointer
      shadow-md
      transition-all duration-300
      hover:-translate-y-0.5
      hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
    "
  >
    <Link href="#contact" className="relative z-10">
      Book a Consultation

      {/* Light streak */}
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

  {/* Secondary CTA */}
  <Button
    variant="outline"
    className="
      group relative overflow-hidden rounded-full
      border border-primary
      text-primary
      px-6 py-3
      bg-transparent
      cursor-pointer
      shadow-sm
      transition-all duration-300
      hover:-translate-y-0.5
      hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]
    "
  >
    <span className="relative z-10">Call Now</span>

    {/* Light streak */}
    <span
      className="
        pointer-events-none
        absolute -top-[150%] left-0
        w-[300%] h-[6px]
        bg-primary/40
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


          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 h-24 w-20
    flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-10 w-10" /> : <Menu className="h-12 w-12" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t bg-white/95 backdrop-blur-md rounded-b-lg shadow-xl">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-all font-medium py-3 px-4 rounded-lg ${
                    activeLink === link.href
                      ? "text-primary bg-muted/50"
                      : "text-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 px-4 overflow-visible">
  {/* Primary CTA */}
  <Button
    asChild
    className="
      group relative w-full overflow-hidden rounded-full
      bg-gradient-to-r from-primary to-secondary
      text-white font-medium
      px-6 py-3
      cursor-pointer
      shadow-md
      transition-all duration-300 ease-out
      hover:-translate-y-0.5
      hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
    "
  >
    <Link href="#contact" className="relative z-10 text-center">
      Book a Consultation

      {/* Light streak */}
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

  {/* Secondary CTA */}
  <Button
    className="
      group relative w-full overflow-hidden rounded-full
      border border-primary
      bg-transparent
      text-primary
      px-6 py-3
      cursor-pointer
      shadow-sm
      transition-all duration-300 ease-out
      hover:-translate-y-0.5
      hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]
    "
  >
    <span className="relative z-10 text-center">Call Now</span>

    {/* Light streak */}
    <span
      className="
        pointer-events-none
        absolute -top-[150%] left-0
        w-[300%] h-[6px]
        bg-primary/40
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

            </nav>
          </div>
        )}
      </div>
    </header>
  )
}