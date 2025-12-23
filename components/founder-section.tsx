import Image from "next/image"
import { GraduationCap, Award } from "lucide-react"

export function FounderSection() {
  return (
    <section id="founder" className="py-20 lg:py-32 bg-[rgb(245, 245, 245)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Meet the Founder</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Founder Image */}
            <div className="lg:col-span-2">
              <div className="relative h-100 lg:h-125 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/founder.webp"
                  alt="Aashral Surana - Founder of SynapCare"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Founder Info */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">Aashral Surana</h3>
                <p className="text-xl text-primary font-medium">Speech-Language Pathologist & Audiologist</p>
                <p className="text-lg text-black">Founder, SynapCare</p>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Education</h4>
                    <ul className="space-y-1 text-black">
                      <li>• BASLP – Audiology & Speech-Language Pathology</li>
                      <li>• MSc – Speech-Language Pathology</li>
                    </ul>
                  </div>
                </div>

                {/* Advanced Training */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Award className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Advanced Training</h4>
                    <ul className="space-y-1 text-black">
                      <li>• LSVT LOUD Certified</li>
                      <li>• NMES (VitalStim Plus) Certified</li>
                      <li>• Certification in Speech & Swallowing in Oncodeglutology</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="pt-4 border-t">
                <p className="text-black  leading-relaxed text-pretty">
                  With a deep passion for helping individuals rediscover their voice and abilities, Aashral founded
                  SynapCare to create a healing space where evidence-based care meets genuine compassion. Her expertise
                  spans across speech, language, swallowing, and cognitive rehabilitation, making her a trusted partner
                  in your journey toward better health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
