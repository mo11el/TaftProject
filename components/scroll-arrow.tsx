"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function ScrollArrow({ hideAt = 0.3 }: { hideAt?: number }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setIsVisible(scrollProgress < hideAt)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hideAt])

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      animate={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-full p-2 hover:bg-white/20 transition-colors cursor-pointer">
          <ChevronDown className="w-5 h-5 text-white/70" strokeWidth={1.5} />
        </div>
      </motion.div>
    </motion.div>
  )
}
