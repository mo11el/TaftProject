"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { ShinyButton } from "./shiny-button"

interface EmailSignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EmailSignupModal({ isOpen, onClose }: EmailSignupModalProps) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting email:", error)
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSuccess ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-serif text-gray-900 mb-2">Join Aria</h2>
                    <p className="text-gray-600">Sign up for early access</p>
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                    </div>

                    <ShinyButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Get Early Access"}
                    </ShinyButton>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    We'll notify you when Aria launches. No spam, ever.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-2">You're on the list!</h3>
                  <p className="text-gray-600 mb-6">Now start a conversation with Aria</p>
                  
                  {/* iMessage Button */}
                  <a
                    href="sms:+14156106180&body=Hi%20Aria!"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#34C759] hover:bg-[#2DB84D] text-white font-medium rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.6 6.32A8.78 8.78 0 0 0 12 4a8.73 8.73 0 0 0-8 5.17 8.93 8.93 0 0 0 1.57 9.68L4 22l3.32-1.54a8.73 8.73 0 0 0 4.68 1.36 8.78 8.78 0 0 0 8.77-8.77 8.77 8.77 0 0 0-2.77-6.73zM12 19.82a6.72 6.72 0 0 1-3.62-1.05l-.26-.15-2.69 1.25.58-2.82-.17-.27a6.93 6.93 0 0 1 11.74-7.09A6.93 6.93 0 0 1 12 19.82z"/>
                    </svg>
                    Open iMessage
                  </a>
                  
                  <p className="text-xs text-gray-500 mt-4">
                    This will open iMessage on your device
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
