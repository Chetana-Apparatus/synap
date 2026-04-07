"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ServicesPage() {
  const router = useRouter()

  useEffect(() => {
    // Navigate to home page first
    router.push("/")

    // Wait for navigation to complete, then scroll to services section
    setTimeout(() => {
      const element = document.getElementById("services")
      if (element) {
        const headerHeight = 80 // Fixed header height
        const isMobile = window.innerWidth < 1024 // lg breakpoint
        const extraSpacing = isMobile ? 0 : 20 // No extra spacing on mobile, 20px on desktop
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight - extraSpacing

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }, 100)
  }, [router])

  return null
}

