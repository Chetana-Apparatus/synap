import {
    MessageSquare,
    Brain,
    Utensils,
    Lightbulb,
    Activity,
    Hand,
    HeartPulse,
    Apple,
    Ear,
    LucideIcon
} from "lucide-react"

export interface Service {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    image: string;
    status: string;
    alt: string;
    deepDive?: string;
    clinicalFocus?: {
        title: string;
        points?: string[];
        description?: string;
    };
    specializedTreatments?: string[];
    experienceBadge?: {
        value: string;
        label: string;
        title: string;
    };
}

export const services: Service[] = [
    {
        id: "speech-therapy",
        icon: MessageSquare,
        title: "Speech Therapy",
        description:
            "Speech therapy supports children and adults in speaking clearly, confidently, and with ease. Our focus is not just on speech sounds, but on helping individuals express themselves comfortably in everyday conversations. Therapy targets how speech sounds are produced and how the voice is used, adapting care to each person’s needs. We provide support for articulation and phonological disorders, stuttering and cluttering, dysarthria, apraxia of speech, and voice disorders, using evidence-based and compassionate approaches. Our goal is to support clearer communication, improved confidence, and better participation in daily life.",
        image: "/speech-therapy.jpg",
        status: "active",
        alt: "“Speech therapy session at SynapCare Rehabilitation Center in Aundh Pune” ",
        deepDive: "Speech difficulties can affect confidence, social interaction, and overall quality of life. Our speech therapy services focus on identifying the underlying causes whether neurological, developmental, or structural and delivering targeted therapies for clear, effective communication.",
        clinicalFocus: {
            title: "Clinical Focus & Approach",
            description: "We conduct detailed speech and voice assessments to understand individual challenges such as articulation errors, fluency disorders, and motor speech conditions. Our therapy combines evidence-based techniques with personalised exercises to improve clarity, fluency, and vocal strength.\n\nOur goal is not just improvement, but long-term communication independence across personal, social, and professional environments."
        },
        specializedTreatments: [
            "Articulation & Phonological Therapy",
            "Fluency (Stammering) Management",
            " Voice Therapy & Vocal Hygiene",
            "Motor Speech Rehabilitation (Apraxia/Dysarthria)",
            "Accent & Speech Clarity Training"
        ],

    },
    {
        id: "language-and-communication-therapy",
        icon: Brain,
        title: "Language & Communication Therapy",
        description:
            "Language challenges can impact how individuals understand, process, and express thoughts. We help to close these gaps by improving both comprehension and expression for meaningful communication in everyday life.",
        image: "/language-therapy.jpg",
        status: "active",
        alt: "“Language and communication therapy session at SynapCare Rehabilitation Center in Aundh Pune” ",
        deepDive: "Language is the bridge that connects us to others. We focus on bridging the gap between thought and expression, ensuring every individual has the tools to understand and be understood.",
        clinicalFocus: {
            title: "Clinical Focus & Approach",
            description: "Our approach targets receptive and expressive language therapy, including vocabulary development, sentence structure, and conversational skills. We customise therapy for each person, regardless of age, to make sure that they can communicate better.We stress the importance of developing real-world communication skills that make it easier to participate in school, social, and work settings."
        },
        specializedTreatments: [
            "Receptive Language Training",
            "Expressive Language Therapy",
            "Social Communication Skills",
            "Pragmatic Language Therapy",
            " Language Intervention for Neurological Conditions"

        ],

    },
    {
        id: "swallowing-dysphagia-therapy",
        icon: Utensils,
        title: "Swallowing (Dysphagia) Therapy",
        description:
            "We provide comprehensive assessment and evidence-based therapy for individuals with swallowing and feeding difficulties. Our programs support children and adults affected by neurological conditions, post-stroke recovery, head and neck rehabilitation, and pediatric feeding disorders. Combining Traditional therapy with Electrical Stimulation for swallowing to bring faster and better recovery Our therapists focus on helping each person swallow safely and efficiently, improving comfort, nutrition, strength, and quality of life. By combining careful evaluation, personalized therapy plans, and ongoing guidance for families and caregivers, we help restore confidence and independence in eating and drinking. Whether it’s rebuilding swallowing skills after an injury or supporting a child with feeding challenges, our goal is to make every meal safe, manageable, and nourishing.",
        image: "/swallowing-therapy.jpg",
        status: "active",
        alt: "Comprehensive swallowing and dysphagia therapy session at SynapCare Rehabilitation Center in Aundh Pune",
        deepDive: "Swallowing disorders (dysphagia) can significantly affect nutrition, safety, and overall health. Our specialised care focuses on restoring safe and efficient swallowing function.",
        clinicalFocus: {
            title: "Clinical Focus & Approach",
            description: "We perform comprehensive swallowing assessments to identify the root cause and severity of the issue. Therapy includes targeted exercises, compensatory strategies, and dietary guidance to improve swallowing safety.\n\n Our aim is to reduce risks such as aspiration while ensuring comfort and confidence during eating and drinking."
        },
        specializedTreatments: [
            "Dysphagia Assessment & Management",
            "Swallowing Exercises & Rehabilitation",
            "Diet & Texture Modification Guidance",
            "Postural & Compensatory Techniques",
            " Neurological Swallowing Therapy"
        ],

    },
    {
        id: "cognitive-rehabilitation",
        icon: Lightbulb,
        title: "Cognitive Rehabilitation",
        description:
            "Our cognitive rehabilitation program helps individuals improve memory, attention, problem-solving, and everyday thinking skills. Designed for adults with neurological conditions, brain injuries, or cognitive difficulties, therapy focuses on practical skills that support independence in daily life. Through personalized exercises, real-life practice, and family guidance, we aim to help clients regain confidence, enhance decision-making, and participate more fully at home or work. Our approach combines evidence-based methods with compassionate support to make meaningful, lasting improvements.",
        image: "/cognitive-therapy.jpg",
        status: "active",
        alt: "Cognitive rehabilitation therapy session at SynapCare Rehabilitation Center in Aundh Pune",
        deepDive: "Cognitive challenges can affect memory, attention, and decision-making, impacting independence and daily functioning. We provide structured rehabilitation to rebuild these essential skills.",
        clinicalFocus: {
            title: "Neuroplasticity Recovery",
            description: "Our therapy targets core cognitive domains, including memory, attention, executive function, and problem-solving. Using structured tasks and real-life simulations, we help individuals regain cognitive efficiency.\n\nWe focus on functional outcomes that support independence in personal and professional life."
        },
        specializedTreatments: [
            "Memory Enhancement Programs",
            "Attention & Concentration Training",
            "Executive Function Rehabilitation",
            "Problem-Solving & Reasoning Tasks",
            " Brain Injury & Neurological Rehab"
        ],

    },
    {
        id: "physiotherapy",
        icon: Activity,
        title: "Physiotherapy",
        description:
            "Our physiotherapy programs are designed to enhance movement, strength, balance, and overall physical independence. We will provide support for children, adults, and individuals with neurological conditions, helping each person recover and regain mobility at every stage of life. Our evidence-based approach focuses on functional outcomes, personalized exercise plans, and ongoing guidance for families and caregivers. Whether it’s improving mobility after injury, supporting developmental needs in children, or maintaining independence in adults, physiotherapy at SynapCare aims to restore confidence and physical capability. ",
        image: "/physiotherapy.jpg",
        status: "active",
        alt: "Physiotherapy session at SynapCare Rehabilitation Center in Aundh Pune",
        deepDive: "Physical limitations, pain, or injury can restrict mobility and independence. Our physiotherapy services are designed to restore movement, strength, and overall physical function.",
        clinicalFocus: {
            title: "Functional Biomechanics",
            description: "We conduct detailed physical assessments to identify biomechanical issues, muscle imbalances, and movement dysfunctions. Our therapy combines manual techniques, exercise programmes, and functional training.\n\nWe focus on long-term recovery, injury prevention, and improved physical performance."
        },
        specializedTreatments: [
            "Neurological & Orthopedic Rehab",
            "Manual Therapy & Joint Mobilization",
            "Strengthening & Rehabilitation Exercises",
            "Postural Correction Programs",
            "Pain Management Techniques"
        ],

    },
    {
        id: "auditory-verbal-therapy",
        icon: Ear,
        title: "Auditory Verbal Therapy & Auditory Training",
        description:
            "At SynapCare Rehabilitation Center, we offer Auditory Verbal Therapy (AVT) and Auditory Training (AT) for children and adults with hearing loss. These therapies help individuals develop better listening and spoken communication skills. We work with people using hearing aids and cochlear implants, focusing on helping the brain understand sounds, speech, and language more effectively. Our sessions aim to improve sound awareness, speech clarity, listening skills, and everyday communication. At SynapCare, we involve families in the therapy process to support early intervention, steady progress, and long-term communication outcomes.",
        image: "/Auditory Verbal Therapy.jpg",
        status: "active",
        alt: "Auditory Verbal Therapy session at SynapCare Rehabilitation Center in Aundh Pune",
        deepDive: "Hearing problems can make it harder to learn to talk and understand language. Our therapy focuses on improving listening skills to help with spoken communication.",
        clinicalFocus: {
            title: "Auditory Brain Training",
            description: "We train individuals to effectively use residual hearing with hearing aids or cochlear implants. Therapy emphasises listening, speech development, and auditory processing through structured sessions.Our goal is to enable confident communication through listening rather than reliance on visual cues."
        },
        specializedTreatments: [
            "Listening Skill Development",
            " Auditory Processing Training",
            "Speech & Language Integration",
            "Cochlear Implant Rehabilitation",
            "Parent & Caregiver Training Programs"
        ],

    },
    {
        id: "psychology-and-behavioural-services",
        icon: HeartPulse,
        title: "Psychology & Behavioural Services",
        description:
            "Our psychology and behavioural services are designed to support emotional well-being and mental health for children and adults. We provide counseling, psychological assessments, and behavior therapy to help individuals manage emotions, cope with stress, and overcome everyday challenges. Our approach combines evidence-based strategies with compassionate guidance, empowering clients to build resilience, improve coping skills, and enhance overall quality of life. By integrating emotional and behavioural support with other rehabilitation services, we aim for holistic care that addresses both mind and body.",
        image: "/psychology-therapy.jpg",
        status: "active",
        alt: "Psychology and behavioral therapy session at SynapCare Rehabilitation Center in Aundh Pune",
        deepDive: "Emotional and behavioural problems can hurt relationships, learning, and general health. We offer full psychological support that is personalised to each person's needs.",
        clinicalFocus: {
            title: "Resilience & Regulation",
            description: "Our services include assessment, counselling, and evidence-based interventions for emotional, behavioural, and developmental concerns. We focus on understanding underlying patterns and building coping strategies.\n\nWe aim to improve emotional resilience, behaviour regulation, and quality of life."
        },
        specializedTreatments: [
            "Behavioral Therapy & Intervention",
            "Emotional Regulation Strategies",
            "Cognitive Behavioral Therapy (CBT)",
            "Counseling & Psychological Support",
            "Developmental & Behavioural Assessments"
        ],

    },
    {
        id: "occupational-therapy",
        icon: Hand,
        title: "Occupational Therapy",
        description:
            "Our occupational therapy programs are designed to help children and adults regain independence in daily activities. Therapy focuses on improving fine motor skills, sensory integration, handwriting, and everyday living skills, enabling individuals to perform tasks with confidence and ease. By combining personalized exercises, practical strategies, and caregiver guidance, our approach encourages autonomy, promotes skill development, and enhances participation at home, school, and work. We support individuals to live more independently and confidently through occupational therapy. ",
        image: "/occupational-therapy.jpg",
        status: "coming",
        alt: "Occupational therapy session at SynapCare Rehabilitation Center in Aundh Pune",
        deepDive: "Difficulties in daily activities can impact independence and quality of life. Our occupational therapy services focus on enabling individuals to perform meaningful everyday tasks with greater ease, confidence, and efficiency.",
        clinicalFocus: {
            title: "Daily Living Independence",
            description: "We assess functional abilities across self-care, work, and daily living activities to identify physical, cognitive, or sensory barriers. Our therapy combines task-specific training, adaptive techniques, and environmental modifications to improve independence.Our goal is to empower individuals to participate fully in their daily routines, whether at home, school, or work."
        },
        specializedTreatments: [
            "Activities of Daily Living (ADL) Training",
            "Fine Motor Skill Development",
            "Sensory Integration Therapy",
            "Hand Function & Dexterity Training",
            "Adaptive Equipment & Environmental Modifications"
        ],

    },
    {
        id: "diet-and-nutrition-services",
        icon: Apple,
        title: "Diet & Nutrition Services",
        description:
            "Our diet and nutrition services provide personalized meal planning to support health, recovery, and overall wellness. We design therapeutic diets and dysphagia-friendly nutrition plans tailored to each individual’s needs, ensuring safe, nourishing, and practical eating. Our approach combines clinical expertise with guidance for families and caregivers, helping clients achieve their nutrition goals while supporting rehabilitation and long-term well-being. Whether for recovery, chronic conditions, or dietary management, our focus is on making healthy eating safe, simple, and effective.",
        image: "/nutrition-therapy.jpg",
        status: "coming",
        alt: "Personalized diet and nutrition services at SynapCare Rehabilitation Center in Aundh Pune",
        deepDive: "Proper nutrition plays a vital role in recovery, overall health, and long-term well-being. Our diet and nutrition services provide personalised guidance to support medical conditions, rehabilitation, and healthy living.",
        clinicalFocus: {
            title: "Medical Nutrition Therapy",
            description: "We conduct comprehensive nutritional assessments to understand individual needs, medical conditions, and lifestyle factors. Our plans are personalised to support recovery, improve energy levels, and manage specific health concerns.\n\nWe focus on sustainable dietary habits that promote long-term health and improved quality of life."
        },
        specializedTreatments: [
            "Clinical Nutrition Assessment",
            "Therapeutic Diet Planning",
            "Weight Management Program",
            "Nutrition for Neurological & Medical Conditions",
            "Lifestyle & Preventive Nutrition Counseling"
        ],

    },
]

