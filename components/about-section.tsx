import { Heart,ClipboardList, Layers, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-left lg:text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold  text-center text-primary text-balance">The Heart of SynapCare</h2>

          <div className="space-y-6 text-lg leading-relaxed text-black">
  <p className="text-pretty">
    "At SynapCare Rehabilitation Center, we see beyond challenges and focus on potential. We believe every person has the ability to reconnect, relearn, and rediscover their strengths. Our name is inspired by the word "synapse", the powerful connections in the brain that enable us to speak, move, swallow, think, and communicate. With the right care, patience, and support, these connections grow stronger and real change follows. Every step forward matters. As skills begin to return and confidence grows, so does hope. At SynapCare, we walk alongside you and your family, focused not just on recovery but on helping you live, connect, and thrive again.  "
  </p>
</div>

          <div className="grid md:grid-cols-3 gap-8 pt-12">
             {/* Card 1 */}
  <div className="space-y-4 text-center border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
      <ClipboardList className="w-6 h-6 text-secondary" />
    </div>
    <h3 className="font-semibold text-xl">Personalized Care Plans</h3>
    <p className="text-sm text-black">
      Every individual’s journey is unique. We create therapy plans tailored to personal needs, goals, and everyday life because progress works best when care is truly personal. 
    </p>
  </div>
             {/* Card 2 */}
  <div className="space-y-4 text-center border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
      <Layers className="w-6 h-6 text-primary" />
    </div>
    <h3 className="font-semibold text-xl">Family Centered Support</h3>
    <p className="text-sm text-black">
    We actively involve families and caregivers at every step, offering guidance, education, and support to ensure progress continues beyond therapy sessions.
    </p>
  </div>
            {/* Card 3 */}
  <div className="space-y-4 text-center border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
    <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center mx-auto">
      <Users className="w-6 h-6 text-primary" />
    </div>
    <h3 className="font-semibold text-xl">Integrated Therapy Approach</h3>
    <p className="text-sm text-black">
    Our team works together to address physical, cognitive, emotional and communication needs, ensuring coordinated care that supports meaningful, whole-person recovery. 
    </p>
  </div>
          </div>
        </div>
      </div>
    </section>
  )
}
