import type { Metadata } from "next";
import Script from "next/script";
 
import { Header } from "@/components/header"
import HeroSection from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ApproachSection } from "@/components/approach-section"
import { FounderSection } from "@/components/founder-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import {
  cmsFormApi,
  DEFAULT_CONTACT_FORM_FIELDS,
  type CmsFormField,
} from "@/lib/cms"

export const metadata: Metadata = {
  verification: {
    google: "tTxIJ_79lYaGcLNHf1t5jQ2Zz5xuAAfmbpQHj_eKMlk",
  },
  title: "SynapCare Rehabilitation Center Pune | Speech Neuro Pediatric Rehab",

  description:
"Improve communication with expert speech therapy in Aundh, Pune, helping children and adults speak with confidence and connect with the world.",

  keywords: [
  "speech therapy Pune",
  "language therapy Pune",
  "swallowing therapy Pune",
  "cognitive rehabilitation Pune",
  "communication therapy Pune",
  "pediatric speech therapy",
  "adult speech therapy",
  "rehabilitation center in Pune",
  "SynapCare Rehabilitation Center"
],



  alternates: {
    canonical: "https://www.synapcarerehab.com/"
  },

   openGraph: {
    siteName: "SynapCare Rehabilitation Center",
    type: "website",
    url: "https://www.synapcarerehab.com/",
    title: "SynapCare Rehabilitation Center Pune",
    description:
      "Improve communication with expert speech therapy in Aundh, Pune, helping children and adults speak with confidence and connect with the world.",
    images: [
      {
        url: "https://www.synapcarerehab.com/images/S2.webp",
        width: 1200,
        height: 630,
        alt: "SynapCare Rehabilitation Center Pune"
      }
    ]
  }

  
};


export default async function Home() {
  let contactFormId: string | null = null
  let contactFields: CmsFormField[] = DEFAULT_CONTACT_FORM_FIELDS

  try {
    const contactForm = await cmsFormApi.getContactForm()
    contactFormId = contactForm.form.id
    contactFields = contactForm.fields
  } catch (error) {
    console.error("Failed to load CMS contact form:", error)
  }

  return (
    <>
    {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TZB6PLRY40"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TZB6PLRY40');
          `}
        </Script>
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["MedicalBusiness", "LocalBusiness"],
      name: "SynapCare Rehab",
      url: "https://www.synapcarerehab.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.synapcarerehab.com/images/S2.webp",
        width: 1200,
        height: 630
      },
      description:
        "SynapCare Rehabilitation Center provides speech therapy, language therapy, swallowing therapy, cognitive rehabilitation, and communication therapy for children and adults in Pune.",
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
          name: "What services does SynapCare Rehabilitation Center provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "SynapCare Rehabilitation Center provides speech therapy, language therapy, swallowing therapy, cognitive rehabilitation, and communication therapy for children and adults."
          }
        },
        {
          "@type": "Question",
          name: "Where is SynapCare Rehabilitation Center located?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "SynapCare Rehabilitation Center is located in Aundh, Pune, Maharashtra 411067 and serves patients across Pune and nearby areas."
          }
        },
        {
          "@type": "Question",
          name: "Does SynapCare Rehabilitation Center offer therapy for children?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes, SynapCare Rehabilitation Center offers pediatric speech therapy, language therapy, and cognitive rehabilitation tailored to children’s developmental needs."
          }
        },
        {
          "@type": "Question",
          name: "Does SynapCare Rehabilitation Center provide adult rehabilitation services?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes, the center provides rehabilitation services for adults including speech therapy, swallowing therapy, cognitive rehabilitation, and communication therapy."
          }
        },
        {
          "@type": "Question",
          name: "What conditions are treated with speech and language therapy?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Speech and language therapy at SynapCare Rehabilitation Center helps manage speech delays, language disorders, articulation issues, fluency problems, and communication difficulties."
          }
        },
        {
          "@type": "Question",
          name: "Is swallowing therapy available at SynapCare Rehabilitation Center?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes, swallowing therapy is provided for individuals experiencing difficulty with chewing or swallowing due to neurological or developmental conditions."
          }
        },
        {
          "@type": "Question",
          name: "What is cognitive rehabilitation and who needs it?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Cognitive rehabilitation focuses on improving attention, memory, problem solving, and daily functioning and is helpful for individuals with neurological or cognitive challenges."
          }
        },
        {
          "@type": "Question",
          name: "Do I need a referral to start therapy at SynapCare Rehabilitation Center?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "A referral is not mandatory. Individuals and families can directly contact SynapCare Rehabilitation Center to schedule an assessment."
          }
        },
        {
          "@type": "Question",
          name: "Are therapy programs customized for each individual?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Yes, therapy programs at SynapCare Rehabilitation Center are customized based on individual assessments, goals, and clinical needs."
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
      <ContactSection formId={contactFormId} fields={contactFields} />
      <Footer />
    </main>
    </>
  )
}
