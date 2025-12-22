"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { LiquidGlassCard } from "@/components/liquid-glass"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Message Naturally",
    description: "Text Aria in iMessage like you would a friend. No special commands or syntax required.",
  },
  {
    number: "02",
    title: "Aria Understands",
    description: "Aria uses native LLM intelligence to parses your intent, understands timing, dates, and context automatically.",
  },
  {
    number: "03",
    title: "Confirm Once",
    description: "Aria confirms the task, then handles everything in the background.",
  },
  {
    number: "04",
    title: "Automatic Execution",
    description: "Reminders fire on time. Alerts trigger when conditions are met. All handled seamlessly.",
  },
]

export function HowItWorks() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-white mb-6">How It Works</h2>
      {steps.map((step, index) => (
        <LiquidGlassCard
          key={index}
          className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-md cursor-pointer"
          onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-purple-400">{step.number}</span>
              <span className="text-lg font-medium text-white">{step.title}</span>
            </div>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-white/60 transition-transform duration-300",
                expandedIndex === index && "rotate-180",
              )}
            />
          </div>
          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              expandedIndex === index ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <p className="text-white/70 leading-relaxed">{step.description}</p>
            </div>
          </div>
        </LiquidGlassCard>
      ))}
    </div>
  )
}
