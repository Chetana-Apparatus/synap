"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors: typeof errors = { name: "", email: "", phone: "", message: "" }
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    setErrors(newErrors)
    // Return true if no errors
    return Object.values(newErrors).every((err) => err === "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return // stop if validation fails

    setIsSubmitting(true) // disable button
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        alert('Message sent successfully!')
        setFormData({ name: "", email: "", phone: "", message: "" })
        setErrors({ name: "", email: "", phone: "", message: "" })
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false) // re-enable button
    }
  }

  return (
   <section
  id="contact"
  className="
    pt-28 pb-20
    lg:pt-32 lg:pb-32
    bg-white
    scroll-mt-28 lg:scroll-mt-32
  "
>

      <div className="container mx-auto px-4">
        <div className="text-left lg:text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4 text-balance">
            Start Your Journey with SynapCare
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto text-pretty">
            Your care begins with a conversation. Reach out to us today.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-2xl ring-1 ring-black/5">

            <form onSubmit={handleSubmit} className="space-y-6 py-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className={`w-full h-40 resize-none overflow-auto ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <Button
  type="submit"
  disabled={isSubmitting}
  className="
    group relative overflow-hidden w-full rounded-full
    bg-gradient-to-r from-primary to-secondary
    text-white font-semibold
    px-6 py-3
    cursor-pointer
    shadow-md
    transition-all duration-300 ease-out
    hover:-translate-y-0.5
    hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
    disabled:opacity-60 disabled:cursor-not-allowed
  "
>
  {isSubmitting ? "Sending..." : "Send Message"}



  {/* Light streak hover effect */}
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
</Button>

            </form>
          </div>

          {/* Contact info section remains unchanged */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-2xl ring-1 ring-black/5 overflow-visible">

              <h3 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
  <h4 className="font-semibold mb-1">Email</h4>
  <a
    href="mailto:synapcare1510@gmail.com"
    className="text-black hover:text-primary transition"
  >
    synapcare1510@gmail.com
  </a>
</div>

                </div>
                <div className="flex items-start gap-4">
  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
    <Phone className="w-6 h-6 text-secondary" />
  </div>

  <div>
    <h4 className="font-semibold mb-1">Phone</h4>

    <div className="flex flex-col gap-1 text-black">
      <a
        href="tel:+917387770918"
        className="hover:text-primary transition"
      >
        +91 73877 70918
      </a>

      <a
        href="tel:+917709370918"
        className="hover:text-primary transition"
      >
        +91 77093 70918
      </a>
    </div>
  </div>
</div>

 
                {/* <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-black">synapcare1510@gmail.com</p>
                  </div>
                </div> */}
 
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <a
      href="https://www.google.com/maps?q=Asha+Apartment,+Sahil+Park,+Sanewadi,+Aundh,+Pune,+Maharashtra+411067"
      target="_blank"
      rel="noopener noreferrer"
      className="text-black hover:text-primary transition underline-offset-4 hover:text-primary cursor-pointer"
    >
      Asha Apartment, Sahil Park, Sanewadi, Aundh, Pune, Maharashtra 411067
    </a>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="bg-linear-to-br from-primary to-secondary rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span className="font-semibold">10:00 AM - 8:00 PM</span>
                </div>
                {/* <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div> */}
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
