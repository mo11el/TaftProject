import { GradientBackground } from "@/components/gradient-background"
import { HowItWorks } from "@/components/how-it-works"
import { FAQSection } from "@/components/faq-section"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

export default function Page() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <section className="px-6">
        <h1
          className={`${instrumentSerif.className} text-white text-center text-balance font-normal tracking-tight text-7xl mb-12`}
        >
          Making Life a little easier, one text at a time            
        </h1>

        <div className="w-full max-w-3xl mx-auto space-y-6">
          <HowItWorks />
          <FAQSection />
        </div>
      </section>
    </main>
  )
}
