import { Heart, Brain, Sparkles } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-primary text-balance">The Heart of SynapCare</h2>

          <div className="space-y-6 text-lg leading-relaxed text-black">
  <p className="text-pretty">
    "In SynapCare Rehabilitation Center, we believe that every mind has the capacity to reconnect, to learn and to discover their capabilities. Our name is derived from "synapse," which refers to the connections within the brain that enable us to speak, to move, to swallow, to think, and to communicate. When they are strengthened and supported, everything changes because capabilities develop and hope is restored."
  </p>
</div>


          {/* Key Values */}
          <div className="grid md:grid-cols-3 gap-8 pt-12">
             {/* Card 1 */}
  <div className="space-y-4 text-center border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
      <Brain className="w-6 h-6 text-secondary" />
    </div>
    <h3 className="font-semibold text-xl">Evidence-Based</h3>
    <p className="text-sm text-black">
      Scientifically proven methods for optimal results
    </p>
  </div>
             {/* Card 2 */}
  <div className="space-y-4 text-center border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
      <Heart className="w-6 h-6 text-primary" />
    </div>
    <h3 className="font-semibold text-xl">Compassionate Care</h3>
    <p className="text-sm text-black">
      Empathy and understanding at every step
    </p>
  </div>
            {/* Card 3 */}
  <div className="space-y-4 text-center border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
    <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center mx-auto">
      <Sparkles className="w-6 h-6 text-primary" />
    </div>
    <h3 className="font-semibold text-xl">Goal-Oriented</h3>
    <p className="text-sm text-black">
      Personalized plans for your unique journey
    </p>
  </div>
          </div>
        </div>
      </div>
    </section>
  )
}
