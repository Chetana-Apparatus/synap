import type { Metadata } from "next";


import { Header } from "@/components/header"
import HeroSection from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ApproachSection } from "@/components/approach-section"
import { FounderSection } from "@/components/founder-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Speech Therapy & Communication Therapy in Pune | SynapCare Rehab",

  description:
    "SynapCare Rehab offers expert speech therapy, communication therapy, and language rehabilitation for children and adults in Aundh, Pune, Maharashtra 411067. Trusted speech therapists for communication disorders treatment in India.",

  keywords: [
    "speech therapy",
    "communication therapy",
    "speech therapist in India",
    "speech rehabilitation center",
    "language therapy",
    "child speech therapy",
    "adult speech therapy",
    "communication disorders treatment",
    "SynapCare Rehab"
  ],

  alternates: {
    canonical: "https://www.synapcarerehab.com/"
  },

  openGraph: {
    siteName: "SynapCare Rehab",
    type: "website",
    url: "https://www.synapcarerehab.com/",
    title: "Speech Therapy & Communication Rehabilitation in Pune | SynapCare Rehab",
    description:
      "Expert speech therapy and communication disorder treatment for children and adults in Aundh, Pune, Maharashtra.",
    images: [
      {
        url: "https://www.synapcarerehab.com/logo3.webp",
        width: 1200,
        height: 630,
        alt: "SynapCare Rehab Speech Therapy Center Pune"
      }
    ]
  }
};


export default function Home() {
  return (
    <>
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      name: "SynapCare Rehab",
      url: "https://www.synapcarerehab.com/",
      logo: "https://www.synapcarerehab.com/logo3.webp",
      description:
        "SynapCare Rehab is a speech rehabilitation center providing speech therapy, communication therapy, and language therapy for children and adults in Pune.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Aundh",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411067",
        addressCountry: "IN"
      },
      areaServed: "Pune, Maharashtra, India"
    })
  }}
/>



<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What services does SynapCare Rehab provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "SynapCare Rehab provides speech therapy, communication therapy, language therapy, and treatment for communication disorders for children and adults."
          }
        },
        {
          "@type": "Question",
          name: "Where is SynapCare Rehab located?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "SynapCare Rehab is located in Aundh, Pune, Maharashtra 411067, serving patients across Pune and nearby areas."
          }
        },
        {
          "@type": "Question",
          name: "Does SynapCare Rehab offer child and adult speech therapy?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes, SynapCare Rehab offers specialized speech therapy programs for both children and adults based on individual communication needs."
          }
        }
      ]
    })
  }}
/>

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
    </>
  )
}
