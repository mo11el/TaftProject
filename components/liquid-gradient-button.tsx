"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface LiquidGradientButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode
  className?: string
}

export function LiquidGradientButton({
  children,
  className,
  ...props
}: LiquidGradientButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-2xl px-8 py-4 font-bold text-white",
        "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-blue-500",
        "before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-blue-400 after:via-purple-400 after:to-pink-400",
        "after:opacity-0 after:blur-xl after:transition-opacity after:duration-500 hover:after:opacity-50",
        "shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
        "transition-shadow duration-300",
        className
      )}
      style={{
        backgroundSize: "200% 200%",
        animation: "gradient-shift 3s ease infinite",
      }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
