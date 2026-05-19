"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MeshGradient } from "@paper-design/shaders-react"
import { ArrowLeft, Building2, Users, Shield, Zap, Globe, HeadphonesIcon } from "lucide-react"

const enterpriseFeatures = [
  {
    icon: Building2,
    title: "Custom Deployment",
    description: "Deploy Aria on your own infrastructure with full data sovereignty and compliance.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Centralized admin dashboard for managing users, permissions, and usage analytics.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption, SSO integration, and audit logs.",
  },
  {
    icon: Zap,
    title: "Priority Processing",
    description: "Dedicated compute resources ensuring instant responses at any scale.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Multi-region deployment with 99.99% uptime SLA and disaster recovery.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "24/7 enterprise support with dedicated account manager and custom SLAs.",
  },
]

export default function EnterprisePage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Shader Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <MeshGradient
          style={{ width: "100%", height: "100%" }}
          colors={["#1a1a2e", "#16213e", "#0f3460", "#533483", "#e94560"]}
          speed={0.3}
          distortion={0.4}
          swirl={0.2}
        />
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/90 text-sm hover:bg-white/20 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            Aria for Enterprise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 mb-8"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            Intelligent assistance at scale. Built for teams that move fast.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16"
        >
          {enterpriseFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="group p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <feature.icon className="w-10 h-10 text-white/80 mb-4 group-hover:text-white transition-colors" />
              <h3
                className="text-xl font-semibold text-white mb-2"
                style={{ fontFamily: "Calibri, sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-white/60 text-sm leading-relaxed"
                style={{ fontFamily: "Calibri, sans-serif" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
            <h2
              className="text-2xl font-semibold text-white text-center mb-6"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Get in Touch
            </h2>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                  style={{ fontFamily: "Calibri, sans-serif" }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 disabled:opacity-50 transition-all duration-300"
                  style={{ fontFamily: "Calibri, sans-serif" }}
                >
                  {isSubmitting ? "Submitting..." : "Contact Sales"}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white" style={{ fontFamily: "Calibri, sans-serif" }}>
                  Thanks! We&apos;ll be in touch soon.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-white/40 text-sm mt-12 text-center"
          style={{ fontFamily: "Calibri, sans-serif" }}
        >
          Aria Enterprise • NYC | CDMX
        </motion.p>
      </div>
    </div>
  )
}
