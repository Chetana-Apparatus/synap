import Image from "next/image"
import { GraduationCap, Award } from "lucide-react"

export function FounderSection() {
  return (
    <section id="founder" className="pt-12 pb-20 lg:pt-20 lg:pb-32 bg-[rgb(245, 245, 245)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">Meet the Founder</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Founder Image */}
           <div className="lg:col-span-2 flex items-center justify-center lg:justify-start">
  <div
  className="
    group
    relative
    w-full
    h-[320px] md:h-[620px] lg:h-[500px]
aspect-[3/4] md:object-contain lg:aspect-[3/4]

    rounded-3xl overflow-hidden
    shadow-2xl
    transition-all duration-700 ease-out
    hover:-translate-y-1
    hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]
  "
>

   <Image
  src="/images/Founder1.webp"
  alt="Aashral Surana - Founder of SynapCare"
  fill
  className="
    object-cover
    object-[50%_20%]
    md:object-[50%_30%]
    lg:object-center
    transition-transform duration-700 ease-out
    group-hover:scale-105
  "
/>


    {/* subtle overlay for smoothness */}
    <div className="
      pointer-events-none
      absolute inset-0
      bg-black/0
      transition-colors duration-700
      group-hover:bg-black/10
    " />
  </div>
</div>


            {/* Founder Info */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">Aashral Surana</h3>
                <p className="text-xl text-primary font-medium">Speech Language Pathologist & Audiologist</p>
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
                      <li>• BASLP – Audiology & SpeechLanguage Pathology</li>
                      <li>• MSc – Speech Language Pathology</li>
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
