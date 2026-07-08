import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "SynapCare Rehabilitation Center ",
  description:
    "Improve communication with expert speech therapy in Aundh, Pune, helping children and adults speak with confidence and connect with the world.",
  keywords:
    "speech therapy, language therapy, swallowing therapy, dysphagia, cognitive rehabilitation, speech pathologist, audiologist",
  generator: "v0.app",
  icons: {
    icon: "/favicon.icon.webp"
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-sans antialiased`}>
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
