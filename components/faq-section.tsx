"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { LiquidGlassCard } from "@/components/liquid-glass"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Do I need to download an app?",
    answer: "No. Aria works completely inside iMessage. No app download required.",
  },
  {
    question: "Is Aria always running?",
    answer:
      "Yes. Once you start a conversation, Aria runs continuously in the background so reminders and alerts fire exactly when scheduled.",
  },
  {
    question: "What can Aria do?",
    answer:
      "Reminders and follow-ups, time-based and conditional alerts, direct calendar integration, price monitoring, and scheduling assistance (including group chats).",
  },
  {
    question: "What can't Aria do?",
    answer:
      "Aria is not a general-purpose conversational AI. It doesn't answer broad knowledge questions, provide advice or opinions, or replace research tools.",
  },
  {
    question: "How is this different from calendar apps?",
    answer:
      "You don't manage Aria. You just text. No forms, no interfaces, no maintenance. Aria adapts to how you already communicate.",
  },
]

export function FAQSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="w-full max-w-3xl space-y-2 mt-12">
      <button onClick={() => setIsOpen(!isOpen)} className="group w-full text-left" aria-expanded={isOpen}>
        <LiquidGlassCard className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-white md:text-3xl">Frequently Asked Questions</h2>
            <ChevronDown
              className={cn("h-6 w-6 text-white/80 transition-transform duration-300", isOpen && "rotate-180")}
            />
          </div>
        </LiquidGlassCard>
      </button>

      <div
        className={cn(
          "grid transition-all duration-500 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <LiquidGlassCard
                key={index}
                className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-md cursor-pointer"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-white text-lg leading-relaxed">{faq.question}</h3>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-white/60 transition-transform duration-300 mt-1",
                      openIndex === index && "rotate-180",
                    )}
                  />
                </div>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    openIndex === index ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-white/70 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
