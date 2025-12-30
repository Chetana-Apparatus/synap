import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "SynapCare Rehabilitation Center ",
  description:
    "Holistic, compassionate, and evidence-based rehabilitation for children and adults. Specializing in speech therapy, language therapy, dysphagia treatment, and cognitive rehabilitation.",
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
