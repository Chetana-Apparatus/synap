import { Target, Users, TrendingUp } from "lucide-react"

export function ApproachSection() {
  return (
    <section id="approach" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4 text-balance">Our Approach</h2>
          <p className="text-xl text-black max-w-2xl mx-auto text-pretty">
            Holistic, multidisciplinary treatment centered around your unique needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Evidence-Based Care</h3>
            <p className="text-black leading-relaxed">
              We use scientifically proven methods and stay updated with the latest best practices to ensure safe, effective, and high-quality care for every individual. 
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Compassion & Empathy</h3>
            <p className="text-black leading-relaxed">
              Every individual's journey is unique. We listen, understand, and support you with genuine care and
              emotional sensitivity at every step.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="w-16 h-16 bg-accent/50 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Goal-Oriented Rehabilitation</h3>
            <p className="text-black leading-relaxed">
              We work collaboratively with you to set meaningful, achievable goals and celebrate every milestone on your path to independence.  
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-16 max-w-4xl mx-auto bg-linear-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-center shadow-xl">
          <p className="text-xl lg:text-2xl text-white leading-relaxed text-pretty">
           At SynapCare Rehabilitation Center, we are committed to enhancing quality of life for individuals of all ages through personalized, evidence-based rehabilitation. Our multidisciplinary team provides comprehensive care across communication, cognition, swallowing, occupational therapy, physiotherapy, and diet & nutrition services, ensuring holistic, coordinated care under one roof. 

  
          </p>
        </div>
      </div>
    </section>
  )
}
