"use client"

import { motion, useScroll } from "framer-motion"

export function ScrollIndicator() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div className="fixed top-4 right-4 w-2 h-32 bg-white/20 rounded-full overflow-hidden z-50">
      <motion.div className="w-full bg-white rounded-full origin-top" style={{ scaleY: scrollYProgress }} />
    </motion.div>
  )
}
