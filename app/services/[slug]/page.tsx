import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { services } from '@/lib/services-data';
import { ArrowLeft, Phone, CheckCircle2, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";
import { Button } from '@/components/ui/button';

interface ServicePageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = services.find(s => s.id === slug);

    if (!service) {
        return {
            title: 'Service Not Found | SynapCare',
        };
    }

    return {
        title: `${service.title} | SynapCare Rehabilitation Center`,
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = services.find(s => s.id === slug);

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    // Helper for treatments
    const treatments = service.specializedTreatments || [
        "Assessment & Consultation",
        "Personalized Therapy Plans",
        "Evidence-Based Techniques",
        "Functional Rehabilitation",
        "Follow-up & Progress Monitoring"
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#FDFCF9]">
            <Header />
            <main className="flex-grow pt-24">
                {/* Hero Header Section */}
                <section className="relative pt-12 pb-24 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[500px] z-0 opacity-20 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFCF9]" />
                        <Image
                            src={service.image}
                            alt=""
                            fill
                            className="object-cover blur-sm"
                        />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <Link
                            href="/#services"
                            className="inline-flex items-center text-sm font-bold text-muted-foreground/60 hover:text-primary mb-12 transition-colors group tracking-widest"
                        >
                            <div className="w-8 h-8 rounded-full border border-muted-foreground/20 flex items-center justify-center mr-3 group-hover:border-primary/40 transition-colors">
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            </div>
                            BACK TO EXPERTISE
                        </Link>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-4 tracking-tight">
                            {service.title}
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="container mx-auto px-4 pt-12 pb-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Left Column: Text Content */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="space-y-6">


                                <div className="text-xl text-muted-foreground leading-relaxed font-medium">
                                    {service.deepDive || `${service.description.split('.').slice(0, 3).join('.')}.`}
                                </div>
                            </div>

                            <div className="bg-[#E9EDE4]/40 rounded-[2.5rem] p-8 md:p-12 border border-primary/5">
                                <h2 className="text-3xl font-bold text-primary mb-8 tracking-tight">
                                    {service.clinicalFocus?.title || "Clinical Focus & Approach"}
                                </h2>
                                <div className="space-y-6 text-muted-foreground/80 leading-relaxed text-lg whitespace-pre-line">
                                    {service.clinicalFocus ? (
                                        <>
                                            {service.clinicalFocus.description && (
                                                <p>{service.clinicalFocus.description}</p>
                                            )}
                                            {service.clinicalFocus.points && (
                                                <ul className="space-y-4">
                                                    {service.clinicalFocus.points.map((point, i) => (
                                                        <li key={i} className="flex gap-4">
                                                            <div className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <p>
                                                At SynapCare, we believe in a holistic yet scientifically rigorous approach to {service.title.toLowerCase()}. Every patient receives a comprehensive biomechanical and cognitive assessment before we initiate any treatment protocol.
                                            </p>
                                            <p>
                                                Our goal is not just symptom management but long-term structural resilience and functional independence. We utilize evidence-based techniques that are tailored to your specific demands, ensuring that our care aligns with your personal goals and lifestyle.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>


                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-border/40">
                                <h2 className="text-3xl font-bold text-primary mb-10 tracking-tight">
                                    Specialized Treatments
                                </h2>

                                <ul className="space-y-6 mb-12">
                                    {treatments.map((treatment, i) => (
                                        <li key={i} className="flex items-center gap-5 text-muted-foreground/90 font-semibold text-lg">
                                            <div className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-secondary/20 flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary),0.5)]" />
                                            </div>
                                            {treatment}
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-5">
                                    <Button
                                        asChild
                                        className="w-full h-16 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center gap-3 text-xl font-bold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl border-0"
                                    >
                                        <Link href="/#contact">
                                            <Phone className="w-5 h-5 fill-current" />
                                            Book Appointment
                                        </Link>
                                    </Button>
                                    <p className="text-center text-sm text-muted-foreground/60 font-medium italic">
                                        * Immediate consultation slots available
                                    </p>
                                </div>
                            </div>


                        </div>
                    </div>
                </section>

                {/* Call to Action Bottom */}
                <section className="bg-primary/5 py-20 border-t border-primary/5">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8">Ready to rediscover your potential?</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                            Contact SynapCare today to schedule a comprehensive consultation with our team of elite specialists.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl">
                                <Link href="/#contact">Get Started Today</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg font-bold border-primary text-primary hover:bg-primary/5">
                                <a href="tel:+917387770918">Call +91 73877 70918</a>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
