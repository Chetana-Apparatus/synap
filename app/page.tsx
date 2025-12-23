import { Header } from "@/components/header"
import HeroSection from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ApproachSection } from "@/components/approach-section"
import { FounderSection } from "@/components/founder-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <FounderSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
