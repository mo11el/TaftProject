"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion"
import { ArrowUp, Youtube, Package, Mail } from "lucide-react"
import { EmailSignupModal } from "@/components/email-signup-modal"
import { AboutOverlay } from "@/components/about-overlay"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { ParticleEffect } from "@/components/particle-effect"
import { ScrollArrow } from "@/components/scroll-arrow"

// Custom easing curves - precisely tuned for premium feel
const easeInOut = cubicBezier(0.4, 0, 0.2, 1)
const easeOut = cubicBezier(0, 0, 0.2, 1) // Graceful deceleration
const easeIn = cubicBezier(0.4, 0, 1, 1)
const premiumEase = cubicBezier(0.25, 0.46, 0.45, 0.94) // Sophisticated motion curve

export default function DiaAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Refined step progress with precise timing
  const step1 = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const step2 = useTransform(scrollYProgress, [0.15, 0.3], [0, 1])
  const step3 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1])
  const step4 = useTransform(scrollYProgress, [0.45, 0.6], [0, 1])
  const step5 = useTransform(scrollYProgress, [0.6, 0.75], [0, 1])
  const step6 = useTransform(scrollYProgress, [0.75, 0.9], [0, 1])
  const step7 = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  // Living canvas background - subtle color shifts
  const backgroundBlue = useTransform(step1, [0, 0.6, 1], ["#a1bde4", "#6b7db8", "#4a5a8a"])
  const backgroundCenter = useTransform(step1, [0, 0.6, 1], ["#e5e8ef", "#d1d5dc", "#b8bcc9"])
  const backgroundYellow = useTransform(step1, [0, 0.6, 1], ["#f3ebbd", "#e6d89a", "#d4c577"])

  // Dark atmospheric transition - perfectly timed
  const darkBackgroundOpacity = useTransform(step1, [0.6, 0.9], [0, 1], { ease: premiumEase })

  // Smoother section visibility
  const showStep1 = useTransform(scrollYProgress, [0, 0.15, 0.18], [1, 1, 0])
  const showStep2 = useTransform(scrollYProgress, [0.12, 0.15, 0.3, 0.33], [0, 1, 1, 0])
  const showStep3 = useTransform(scrollYProgress, [0.27, 0.3, 0.45, 0.48], [0, 1, 1, 0])
  const showStep4 = useTransform(scrollYProgress, [0.42, 0.45, 0.6, 0.63], [0, 1, 1, 0])
  const showStep5 = useTransform(scrollYProgress, [0.57, 0.6, 0.75, 0.78], [0, 1, 1, 0])
  const showStep6 = useTransform(scrollYProgress, [0.72, 0.75, 0.9, 0.93], [0, 1, 1, 0])
  const showStep7 = useTransform(scrollYProgress, [0.87, 0.9], [0, 1])

  return (
    <div ref={containerRef} className="relative">
      {/* Living Canvas Background - Subtly shifting colors */}
      <motion.div
        className="fixed inset-0"
        style={{
          background: useTransform(
            step1,
            [0, 1],
            [
              `linear-gradient(100deg, ${backgroundBlue.get()}, ${backgroundCenter.get()}, ${backgroundYellow.get()})`,
              `linear-gradient(100deg, ${backgroundBlue.get()}, ${backgroundCenter.get()}, ${backgroundYellow.get()})`,
            ],
          ),
        }}
      />

      {/* Dark Atmospheric Background - Twilight transition */}
      <motion.div
        className="fixed inset-0"
        style={{
          backgroundColor: "#0F101A",
          backgroundImage: `
            radial-gradient(at 10% 15%, hsla(250, 80%, 40%, 0.25) 0px, transparent 50%),
            radial-gradient(at 85% 20%, hsla(50, 70%, 55%, 0.2) 0px, transparent 50%),
            radial-gradient(at 50% 95%, hsla(10, 80%, 50%, 0.3) 0px, transparent 50%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")
          `,
          opacity: darkBackgroundOpacity,
        }}
      />

      <ParticleEffect fadeOutAt={0.3} />
      <ScrollArrow hideAt={0.3} />

      <div className="relative z-10 h-[500vh]">
        {/* Step 1: The Overture - Precisely choreographed 3-second sequence */}
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            opacity: showStep1,
            scale: useTransform(step1, [0, 1], [1.02, 0.98]), // Subtle zoom for depth
          }}
        >
          <motion.div className="text-center font-light relative">
            {/* THE BROWSER COMPANY - 600ms graceful fade-in (00:01) */}
            <motion.div
              className="text-xl tracking-[0.3em] mb-2 font-light"
              style={{
                opacity: useTransform(step1, [0, 0.4], [0, 1]),
                // Delicate serif typography for elegance
                fontFamily: "Georgia, serif",
                fontWeight: 300,
                // Text color transitions with background atmosphere
                color: useTransform(step1, [0, 0.6, 1], ["rgb(30 41 59)", "rgb(60 71 89)", "rgb(255 255 255)"]),
                // Subtle scale for organic feel
                scale: useTransform(step1, [0, 0.4], [0.98, 1]),
              }}
              transition={{ duration: 0.6, ease: premiumEase }}
            >
              Aria
            </motion.div>

            {/* of NEW YORK - Staggered 200ms delay for sophisticated rhythm (00:01.2) */}
            <motion.div
              className="text-sm tracking-[0.2em] italic font-light opacity-90"
              style={{
                opacity: useTransform(step1, [0.2, 0.6], [0, 1]),
                fontFamily: "Georgia, serif",
                fontWeight: 300,
                // Synchronized color transition
                color: useTransform(step1, [0, 0.6, 1], ["rgb(51 65 85)", "rgb(81 95 115)", "rgb(255 255 255)"]),
                scale: useTransform(step1, [0.2, 0.6], [0.98, 1]),
              }}
              transition={{ duration: 0.6, ease: premiumEase }}
            >
              NYC | CDMX
            </motion.div>
          </motion.div>

          {/* PRESENTS - Timed with the major visual event (00:02) */}
          <motion.div
            className="font-light text-sm tracking-[0.4em] mt-8 opacity-80"
            style={{
              opacity: useTransform(step1, [0.5, 0.8], [0, 1]),
              fontFamily: "Georgia, serif",
              fontWeight: 300,
              color: useTransform(step1, [0, 0.6, 1], ["rgb(51 65 85)", "rgb(81 95 115)", "rgb(255 255 255)"]),
              scale: useTransform(step1, [0.5, 0.8], [0.98, 1]),
            }}
            transition={{ duration: 0.5, ease: premiumEase }}
          >
            Built for your rhythm. Designed for your day.
          </motion.div>
        </motion.div>

        {/* Step 2: The Ascent - Rising circular frame with your image */}
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            opacity: showStep2,
            scale: useTransform(step2, [0, 1], [1.06, 0.99]),
          }}
        >
          {/* Rising circular frame with your image */}
          <motion.div
            className="w-80 h-80 rounded-full flex items-end justify-center pb-8 relative overflow-hidden"
            style={{
              // Organic rising motion with ease-out curve
              clipPath: useTransform(
                step2,
                [0, 0.7, 1],
                ["ellipse(50% 20% at 50% 100%)", "ellipse(50% 45% at 50% 80%)", "ellipse(50% 50% at 50% 50%)"],
              ),
              y: useTransform(step2, [0, 0.7], [80, 0]),
              opacity: useTransform(step2, [0, 0.3], [0, 1]),
              // Subtle warm glow from bottom edge - backlit effect
              boxShadow: useTransform(
                step2,
                [0, 0.5, 1],
                [
                  "0 0 0px rgba(255, 165, 0, 0)",
                  "0 20px 40px rgba(255, 165, 0, 0.3)",
                  "0 10px 20px rgba(255, 165, 0, 0.2)",
                ],
              ),
              // Circular frame border
              border: "4px solid rgba(255, 255, 255, 0.2)",
            }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            {/* Your image within the circular frame */}
            <motion.img
              src="/media/dia-vision.mp4"
              alt="Dia Vision"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: useTransform(step2, [0.3, 0.6], [0, 1]),
                scale: useTransform(step2, [0.3, 0.6], [1.1, 1]),
              }}
              transition={{ duration: 0.5, ease: premiumEase }}
            />

            {/* Dia text overlay - appears after image settles */}
            <motion.div
              className="relative z-10 text-white font-serif text-5xl drop-shadow-lg"
              style={{
                opacity: useTransform(step2, [0.7, 1], [0, 1]),
                y: useTransform(step2, [0.7, 1], [15, 0]),
                scale: useTransform(step2, [0.7, 1], [0.95, 1]),
                fontFamily: "Georgia, serif",
                fontWeight: 400,
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
              }}
              transition={{ duration: 0.4, ease: premiumEase }}
            >
              Aria
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Step 3: Single Element Transformation */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            opacity: showStep3,
            scale: useTransform(step3, [0, 1], [1.05, 0.97]),
          }}
        >
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-between px-6 py-4 relative overflow-hidden"
            style={{
              width: useTransform(step3, [0, 1], [100, 400]),
              height: useTransform(step3, [0, 1], [100, 60]),
            }}
            transition={{ duration: 0.6, ease: easeInOut }}
          >
            <motion.span
              className="text-white font-medium whitespace-nowrap"
              style={{
                opacity: useTransform(step3, [0.6, 1], [0, 1]),
                x: useTransform(step3, [0.6, 1], [-10, 0]),
              }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              Where texting meets productivity
            </motion.span>
            <motion.div
              className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                opacity: useTransform(step3, [0.6, 1], [0, 1]),
                scale: useTransform(step3, [0.6, 1], [0.8, 1]),
              }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Step 4: YouTube Example with Motion Path */}
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            opacity: showStep4,
            scale: useTransform(step4, [0, 1], [1.04, 0.96]),
          }}
        >
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-4 mb-8 w-96 relative z-10"
            style={{
              opacity: useTransform(step4, [0, 0.2], [0, 1]),
              scale: useTransform(step4, [0, 0.2], [0.95, 1]),
            }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <motion.span
              className="text-white"
              style={{
                opacity: useTransform(step4, [0.5, 0.7], [1, 0]),
              }}
              transition={{ duration: 0.3, ease: easeIn }}
            >
              Hey Aria remind me to....
            </motion.span>
          </motion.div>

          <motion.div
            className="bg-white/90 rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg absolute"
            style={{
              opacity: useTransform(step4, [0.1, 0.3, 0.7, 0.8], [0, 1, 1, 0]),
              y: useTransform(step4, [0.1, 0.3], [60, 0]),
              scale: useTransform(step4, [0.1, 0.3], [0.9, 1]),
            }}
            transition={{ duration: 0.6, ease: easeInOut }}
          >
            <Youtube className="w-5 h-5 text-red-500" />
            <span className="text-gray-800 font-medium">Instant Responses...</span>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mt-8"
            style={{
              opacity: useTransform(step4, [0.8, 1], [0, 1]),
              scale: useTransform(step4, [0.8, 1], [0.95, 1]),
              y: useTransform(step4, [0.8, 1], [10, 0]),
            }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <div className="text-white text-sm leading-relaxed">
              Simply text Aria like you would any other contact. Ask questions — receive intelligent responses and
              reminders.
            </div>
          </motion.div>
        </motion.div>

        {/* Step 5: Staggered Product Comparison */}
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            opacity: showStep5,
            scale: useTransform(step5, [0, 1], [1.06, 0.96]),
          }}
        >
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-4 mb-8 w-96 relative z-10"
            style={{
              opacity: useTransform(step5, [0, 0.2], [0, 1]),
              scale: useTransform(step5, [0, 0.2], [0.95, 1]),
            }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <motion.span
              className="text-white"
              style={{
                opacity: useTransform(step5, [0.6, 0.8], [1, 0]),
              }}
              transition={{ duration: 0.3, ease: easeIn }}
            >
              Monitor NYC to Miami flights and let me know when they drop below $250
            </motion.span>
          </motion.div>

          <div className="flex gap-4 mb-8 relative">
            <motion.div
              className="bg-white/90 rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg"
              style={{
                opacity: useTransform(step5, [0.1, 0.25, 0.6, 0.7], [0, 1, 1, 0]),
                y: useTransform(step5, [0.1, 0.25], [50, 0]),
                scale: useTransform(step5, [0.1, 0.25], [0.9, 1]),
                x: useTransform(step5, [0.4, 0.6], [0, -140]),
                y: useTransform(step5, [0.4, 0.6], [0, -100]),
                scale: useTransform(step5, [0.4, 0.6], [1, 0.2]),
              }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <Package className="w-5 h-5 text-amber-500" />
              <span className="text-gray-800 font-medium">Smart Scheduling</span>
            </motion.div>

            <motion.div
              className="bg-white/90 rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg"
              style={{
                opacity: useTransform(step5, [0.25, 0.4, 0.65, 0.75], [0, 1, 1, 0]),
                y: useTransform(step5, [0.25, 0.4], [50, 0]),
                scale: useTransform(step5, [0.25, 0.4], [0.9, 1]),
                x: useTransform(step5, [0.5, 0.7], [0, -140]),
                y: useTransform(step5, [0.5, 0.7], [0, -100]),
                scale: useTransform(step5, [0.5, 0.7], [1, 0.2]),
              }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <Package className="w-5 h-5 text-amber-600" />
              <span className="text-gray-800 font-medium">Smart Price Monitoring</span>
            </motion.div>
          </div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-lg"
            style={{
              opacity: useTransform(step5, [0.75, 1], [0, 1]),
              scale: useTransform(step5, [0.75, 1], [0.95, 1]),
              y: useTransform(step5, [0.75, 1], [15, 0]),
            }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <div className="grid grid-cols-3 gap-4 text-white text-sm">
              <div className="font-medium">Feature</div>
              <div className="font-medium">SMS Reminders</div>
              <div className="font-medium">Tailored Alerts</div>
              <div>Price</div>
              <div>$3.99</div>
              <div>per Month</div>
              <div>Smart</div>
              <div>Personal</div>
              <div>Instant</div>
              <div>Conversational</div>
              <div>Adaptive</div>
              <div>Seamless</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Step 6: Email Rewrite */}
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            opacity: showStep6,
            scale: useTransform(step6, [0, 1], [1.05, 0.98]),
          }}
        >
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-4 mb-8 w-96 relative z-10"
            style={{
              opacity: useTransform(step6, [0, 0.2], [0, 1]),
              scale: useTransform(step6, [0, 2], [0.95, 1]),
            }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <motion.span
              className="text-white"
              style={{
                opacity: useTransform(step6, [0.5, 0.7], [1, 0]),
              }}
              transition={{ duration: 0.3, ease: easeIn }}
            >
              Loved by thousands...
            </motion.span>
          </motion.div>

          <motion.div
            className="bg-white/90 rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg mb-8 absolute"
            style={{
              opacity: useTransform(step6, [0.1, 0.25, 0.6, 0.7], [0, 1, 1, 0]),
              y: useTransform(step6, [0.1, 0.25], [50, 0]),
              scale: useTransform(step6, [0.1, 0.25], [0.9, 1]),
              x: useTransform(step6, [0.3, 0.6], [0, -180]),
              y: useTransform(step6, [0.3, 0.6], [0, -120]),
              scale: useTransform(step6, [0.3, 0.6], [1, 0.2]),
            }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <Mail className="w-5 h-5 text-blue-500" />
            <span className="text-gray-800 font-medium">SMS</span>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md"
            style={{
              opacity: useTransform(step6, [0.7, 1], [0, 1]),
              scale: useTransform(step6, [0.7, 1], [0.95, 1]),
              y: useTransform(step6, [0.7, 1], [10, 0]),
            }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <div className="text-white text-sm leading-relaxed mb-4">
              Aria's my secret weapon. I used to scramble whenever something came up last minute, now Aria keeps it all
              organized.
            </div>
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                opacity: useTransform(step6, [0.85, 1], [0, 1]),
                y: useTransform(step6, [0.85, 1], [8, 0]),
                scale: useTransform(step6, [0.85, 1], [0.95, 1]),
              }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              Simple
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Step 7: Final Welcome with Staggered Features */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            opacity: showStep7,
            scale: useTransform(step7, [0, 1], [1.03, 0.99]),
          }}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-4 flex"
            style={{
              scale: useTransform(step7, [0, 0.3], [0.9, 1]),
              opacity: useTransform(step7, [0, 0.3], [0, 1]),
              y: useTransform(step7, [0, 0.3], [20, 0]),
            }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <div className="flex-1 pr-8">
              <motion.h1
                className="text-white text-3xl font-serif mb-6"
                style={{
                  opacity: useTransform(step7, [0.2, 0.4], [0, 1]),
                  y: useTransform(step7, [0.2, 0.4], [15, 0]),
                }}
                transition={{ duration: 0.4, ease: easeOut }}
              >
                Welcome to Aria
              </motion.h1>

              <div className="space-y-4 mb-8">
                <motion.div
                  className="text-white/80 flex items-center gap-3"
                  style={{
                    opacity: useTransform(step7, [0.3, 0.5], [0, 1]),
                    x: useTransform(step7, [0.3, 0.5], [-15, 0]),
                  }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  Bringing powerful AI capabilities directly to SMS.
                </motion.div>
                <motion.div
                  className="text-white/80 flex items-center gap-3"
                  style={{
                    opacity: useTransform(step7, [0.45, 0.65], [0, 1]),
                    x: useTransform(step7, [0.45, 0.65], [-15, 0]),
                  }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  Making it easier than ever to get things done.
                </motion.div>
                <motion.div
                  className="text-white/80 flex items-center gap-3"
                  style={{
                    opacity: useTransform(step7, [0.6, 0.8], [0, 1]),
                    x: useTransform(step7, [0.6, 0.8], [-15, 0]),
                  }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  Shop smarter with price & market alerts.
                </motion.div>
              </div>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                style={{
                  opacity: useTransform(step7, [0.7, 0.9], [0, 1]),
                  y: useTransform(step7, [0.7, 0.9], [10, 0]),
                  scale: useTransform(step7, [0.7, 0.9], [0.95, 1]),
                }}
                transition={{ duration: 0.4, ease: easeOut }}
              >
                Let's Go
              </motion.button>
            </div>

            <div className="flex-shrink-0 w-32 flex items-center justify-center">
              <motion.div
                className="w-24 h-12 bg-white/5 rounded-full relative overflow-hidden"
                style={{ opacity: useTransform(step7, [0.5, 0.8], [0, 1]) }}
              >
                <motion.div
                  className="absolute w-3 h-3 bg-white/20 rounded-full"
                  animate={{
                    x: [-20, 60],
                    y: [0, -8, 0],
                    scale: [1, 0.6, 0.3],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: easeInOut,
                    repeatDelay: 0.5,
                  }}
                />
                <motion.div
                  className="absolute right-2 top-1/2 w-2 h-2 bg-white/10 rounded-full transform -translate-y-1/2"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: easeInOut,
                    repeatDelay: 0.5,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator />
      <AboutOverlay />

      <EmailSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
