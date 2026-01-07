"use client"

import { useState, useEffect,useRef } from "react"
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
const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
 
  
    // const handleScroll = () => {
    //   setIsScrolled(window.scrollY > 10);
    // };
  
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
      className={`fixed top-0 left-0 w-full z-50 px-0 transition-all duration-300
        bg-white/60 shadow-[0_0_30px_rgba(0,0,0,0.2)] border-b border-[rgba(150,150,149,0.6)] py-0 backdrop-blur-md
        lg:bg-white lg:shadow-none lg:backdrop-blur-none lg:border-0 lg:py-4
      `}>
    
        <div className="mx-auto px-4 lg:px-4">
          <div className="flex items-center justify-between h-20 lg:h-15">
           
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
              className="lg:hidden p-3"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-9 w-9" />
            </button>
          </div>
        </div>
      </header>

    /
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
          <div className="flex items-center justify-between h-20 px-0 border-b">
            {/* SAME LOGO SIZE */}
            <Image
              src="/images/Logo 1.webp"
              alt="SynapCare Rehabilitation Center"
              width={280}
              height={60}
              className="h-40 w-auto"
            />

            <button className="p-2" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-9 w-9" />
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
