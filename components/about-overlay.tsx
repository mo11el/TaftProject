"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

export function AboutOverlay() {
  const { scrollYProgress } = useScroll()

  const overlayOpacity = useTransform(scrollYProgress, [0.88, 0.95], [0, 1])

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40 flex gap-4"
      style={{
        opacity: overlayOpacity,
      }}
    >
      <Link href="/about">
        <motion.span
          className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
          style={{ fontFamily: "Times New Roman, serif" }}
          whileHover={{ opacity: 0.7 }}
        >
          About
        </motion.span>
      </Link>

      <Link href="/privacy">
        <motion.span
          className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
          style={{ fontFamily: "Times New Roman, serif" }}
          whileHover={{ opacity: 0.7 }}
        >
          Privacy
        </motion.span>
      </Link>

      <Link href="/how-it-works">
        <motion.span
          className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300 cursor-pointer"
          style={{ fontFamily: "Times New Roman, serif" }}
          whileHover={{ opacity: 0.7 }}
        >
          How it Works
        </motion.span>
      </Link>
    </motion.div>
  )
}
