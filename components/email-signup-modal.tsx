"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Liquid, defaultColors, type Colors } from "./liquid-gradient"

interface EmailSignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EmailSignupModal({ isOpen, onClose }: EmailSignupModalProps) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setEmail("")
        setPhone("")
      }
    } catch (error) {
      console.error("Error submitting:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
          />

          {/* Liquid Glass Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="relative max-w-md w-full p-8 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "32px",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: `
                  0 8px 32px rgba(0,0,0,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.3),
                  inset 0 -1px 0 rgba(0,0,0,0.1),
                  0 0 0 1px rgba(255,255,255,0.1)
                `,
              }}
            >
              {/* Inner glow effect */}
              <div 
                className="absolute inset-0 rounded-[32px] pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSuccess ? (
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-1">Join Aria</h2>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/15 outline-none transition-all"
                        style={{
                          backdropFilter: "blur(10px)",
                        }}
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/15 outline-none transition-all"
                        style={{
                          backdropFilter: "blur(10px)",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      className="relative w-full h-14 rounded-2xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0">
                        <Liquid isHovered={isButtonHovered} colors={defaultColors} />
                      </div>
                      <span className="relative z-10 font-bold text-white text-lg">
                        {isSubmitting ? "Submitting..." : "Try Aria Now"}
                      </span>
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 text-center py-4"
                >
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list!</h3>
                  <p className="text-white/70 mb-6">Now start a conversation with Aria</p>
                  
                  {/* iMessage Link */}
                  <a
                    href="sms:+14156106180"
                    onClick={() => {
                      window.location.href = "sms:+14156106180"
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #34C759 0%, #30B350 100%)",
                      boxShadow: "0 4px 20px rgba(52, 199, 89, 0.3)",
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                    Message Aria on iMessage
                  </a>
                  
                  <p className="text-xs text-white/50 mt-4">
                    Tap to open Messages and say hi to Aria
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
