"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Circle, ChevronDown } from "lucide-react"

const services = [
  { label: "Speech Therapy", href: "/services/speech-therapy" },
  { label: "Language Therapy", href: "/services/language-and-communication-therapy" },
  { label: "Dysphagia Therapy", href: "/services/swallowing-dysphagia-therapy" },
  { label: "Cognitive Rehabilitation", href: "/services/cognitive-rehabilitation" },
  { label: "Physiotherapy", href: "/services/physiotherapy" },
  { label: "Auditory Verbal Therapy & Auditory Training", href: "/services/auditory-verbal-therapy" },
{ label: "Psychology & Behavioural Services", href: "/services/psychology-and-behavioural-services" },
]

export function ServicesDropdownSimple() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        onMouseEnter={() => setIsOpen(true)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 rounded-lg px-2 py-1 font-medium text-[#013927] transition duration-200 hover:text-[#013927]"
      >
        Services
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      <div
        className={`absolute right-0 top-full z-30 mt-3 w-64 overflow-hidden rounded-2xl border border-[#013927]/10 bg-white/95 shadow-[0_18px_40px_rgba(1,57,39,0.12)] backdrop-blur-sm transition-all duration-250 ease-out ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        role="menu"
        aria-label="Services dropdown"
      >
        <div className="flex flex-col gap-1 p-2">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#013927] transition duration-200 hover:bg-[#013927]/10 hover:text-[#013927] hover:translate-x-1"
              role="menuitem"
            >
              <Circle className="h-2.5 w-2.5 text-[#013927] transition duration-200 group-hover:text-[#FFD700]" />
              <span>{service.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
