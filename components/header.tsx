"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  // const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 20)
  //   }
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#approach", label: "Our Approach" },
    { href: "#founder", label: "Founder" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header
       className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
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
              className="h-40 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
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
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                  className="text-foreground hover:text-primary hover:bg-muted/50 transition-all font-medium py-3 px-4 rounded-lg"
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
