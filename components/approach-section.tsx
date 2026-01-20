import { Target, Users, TrendingUp } from "lucide-react"

export function ApproachSection() {
  return (
    <section
      id="approach"
      className="
    pt-10 pb-10 lg:pt-14 lg:pb-14
    bg-white
    scroll-mt-20 lg:scroll-mt-20
  "
    >

      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4 text-balance">Our Approach</h2>
          <p className="text-xl text-black max-w-2xl mx-auto text-pretty">
            A holistic, multidisciplinary approach tailored to your individual needs, supporting independence and confidence at every step. 
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto overflow-visible">

          <div className="bg-white rounded-2xl p-8 shadow-2xl ring-1 ring-black/5 hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)] transition-shadow duration-300 overflow-visible">

            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Evidence-Based Care</h3>
            <p className="text-black leading-relaxed">
              We use proven, science-backed methods and stay updated with the latest best practices to provide safe, effective, and high-quality care for every individual. 
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl ring-1 ring-black/5 hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)] transition-shadow duration-300 overflow-visible">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Compassion & Empathy</h3>
            <p className="text-black leading-relaxed">
              We listen, understand, and support everyone with genuine care and emotional sensitivity throughout their rehabilitation journey. 
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl ring-1 ring-black/5 hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)] transition-shadow duration-300 overflow-visible">
            <div className="w-16 h-16 bg-accent/50 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Goal-Oriented Rehabilitation</h3>
            <p className="text-black leading-relaxed">
              We set meaningful, achievable goals with you and celebrate every milestone on your journey to independence. 
            </p>
          </div>
        </div>
       <div className="mt-16 max-w-4xl mx-auto bg-linear-to-r from-primary to-secondary rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl">
  <h3 className="text-2xl lg:text-3xl font-bold text-left lg:text-center text-white mb-4">
    A Holistic Approach to Lifelong Well-Being
  </h3>

  <p
    className="
      text-base sm:text-lg lg:text-2xl
      text-white
      leading-relaxed
      text-left
      lg:text-center
      lg:text-justify
      text-pretty
    "
  >
    At SynapCare Rehabilitation Center,we are dedicated to improving the quality of life for individuals of all ages. 
    Our personalized, evidence-based rehabilitation covers communication, cognition, swallowing, occupational therapy, physiotherapy, and diet & nutrition.
    By combining the expertise of our multidisciplinary team, we provide coordinated, holistic care under one roof, helping every individual achieve meaningful progress, independence, and overall well-being. 
  </p>
</div>

      </div>
    </section>
  )
}
