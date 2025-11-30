"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const steps = [
  {
    title: "Message Naturally",
    description: "Start a conversation in iMessage just like you normally would",
  },
  {
    title: "AI Responds",
    description: "AriaReply uses LLM intelligence to parse and understand tasks connecting it to everyday messaging, letting you access help simply by texting like you normally would.",
  },
  {
    title: "Seamless Integration",
    description: "No app switching needed—everything happens within iMessage",
  },
  {
    title: "Smart Assistance",
    description: "Tell Aria what you need to remember, and it handles the rest deadlines, errands, or daily tasks",
  },
]

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <main className="min-h-screen bg-white text-black py-20 px-6">
      <Link href="/" className="fixed top-6 left-6 text-sm hover:opacity-70 transition-opacity">
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-16 text-center" style={{ fontFamily: "Times New Roman, serif" }}>
          How It Works
        </h1>

        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg"
              onHoverStart={() => setActiveIndex(index)}
            >
              <motion.button
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left p-6 rounded-lg transition-all duration-300 ${
                  activeIndex === index ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"
                }`}
                initial={{ width: "100%" }}
                animate={{ width: activeIndex === index ? "100%" : "100%" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0,
                        height: activeIndex === index ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm mt-2">{step.description}</p>
                    </motion.div>
                  </div>
                  <span className="text-2xl font-bold opacity-50">{String(index + 1).padStart(2, "0")}</span>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6" style={{ fontFamily: "Times New Roman, serif" }}>
            Ready to experience AriaReply?
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Sign Up for Early Access
          </Link>
        </div>
      </div>
    </main>
  )
}
