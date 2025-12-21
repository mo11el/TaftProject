"use client"

import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { useEffect, useRef, useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface LiquidGlassProps {
  width?: number
  height?: number
}

export function LiquidGlass({ width = 300, height = 200 }: LiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [filterId] = useState(() => `liquid-glass-${Math.random().toString(36).substr(2, 9)}`)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  // Utility functions
  const smoothStep = (a: number, b: number, t: number) => {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)))
    return t * t * (3 - 2 * t)
  }

  const length = (x: number, y: number) => Math.sqrt(x * x + y * y)

  const roundedRectSDF = (x: number, y: number, w: number, h: number, radius: number) => {
    const qx = Math.abs(x) - w + radius
    const qy = Math.abs(y) - h + radius
    return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius
  }

  const updateShader = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const canvasDPI = 1
    const w = width * canvasDPI
    const h = height * canvasDPI
    const data = new Uint8ClampedArray(w * h * 4)

    let maxScale = 0
    const rawValues: number[] = []

    // Fragment shader logic
    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w
      const y = Math.floor(i / 4 / w)
      const uv = { x: x / w, y: y / h }

      const ix = uv.x - 0.5
      const iy = uv.y - 0.5
      const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6)
      const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15)
      const scaled = smoothStep(0, 1, displacement)

      const tx = ix * scaled + 0.5
      const ty = iy * scaled + 0.5

      const dx = tx * w - x
      const dy = ty * h - y

      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
      rawValues.push(dx, dy)
    }

    maxScale *= 0.5

    // Convert to displacement map
    let index = 0
    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[index++] / maxScale + 0.5
      const g = rawValues[index++] / maxScale + 0.5
      data[i] = r * 255
      data[i + 1] = g * 255
      data[i + 2] = 0
      data[i + 3] = 255
    }

    ctx.putImageData(new ImageData(data, w, h), 0, 0)

    // Update SVG filter
    const feImage = svgRef.current?.querySelector("feImage")
    const feDisplacementMap = svgRef.current?.querySelector("feDisplacementMap")
    if (feImage && feDisplacementMap) {
      feImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", canvas.toDataURL())
      feDisplacementMap.setAttribute("scale", (maxScale / canvasDPI).toString())
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Initialize canvas
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = width
      canvas.height = height
    }

    updateShader()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }

      // Update glass position to follow cursor with smooth centering
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const centerX = e.clientX - width / 2
        const centerY = e.clientY - height / 2
        container.style.left = `${centerX}px`
        container.style.top = `${centerY}px`
        container.style.transform = "none"
      })
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [width, height])

  return (
    <>
      {/* SVG Filter */}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        className="fixed top-0 left-0 pointer-events-none"
        style={{ zIndex: 9998 }}
      >
        <defs>
          <filter
            id={`${filterId}_filter`}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width={width}
            height={height}
          >
            <feImage id={`${filterId}_map`} width={width} height={height} />
            <feDisplacementMap in="SourceGraphic" in2={`${filterId}_map`} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Liquid Glass Container */}
      <div
        ref={containerRef}
        className="fixed"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${width}px`,
          height: `${height}px`,
          overflow: "hidden",
          borderRadius: "150px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25), 0 -10px 25px inset rgba(0, 0, 0, 0.15)",
          cursor: "none",
          backdropFilter: `url(#${filterId}_filter) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1)`,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  )
}

const GLASS_SHADOW_LIGHT =
  "shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]"

const GLASS_SHADOW_DARK =
  "dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]"

const GLASS_SHADOW = `${GLASS_SHADOW_LIGHT} ${GLASS_SHADOW_DARK}`

const DEFAULT_GLASS_FILTER_SCALE = 30
const BUTTON_GLASS_FILTER_SCALE = 70

type GlassFilterProps = {
  id: string
  scale?: number
}

const GlassFilter = ({ id, scale = DEFAULT_GLASS_FILTER_SCALE }: GlassFilterProps) => (
  <svg className="hidden">
    <title>Glass Effect Filter</title>
    <defs>
      <filter colorInterpolationFilters="sRGB" height="200%" id={id} width="200%" x="-50%" y="-50%">
        <feTurbulence baseFrequency="0.05 0.05" numOctaves="1" result="turbulence" seed="1" type="fractalNoise" />
        <feGaussianBlur in="turbulence" result="blurredNoise" stdDeviation="2" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurredNoise"
          result="displaced"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="B"
        />
        <feGaussianBlur in="displaced" result="finalBlur" stdDeviation="4" />
        <feComposite in="finalBlur" in2="finalBlur" operator="over" />
      </filter>
    </defs>
  </svg>
)

const liquidButtonVariants = cva("relative transition-transform duration-300", {
  variants: {
    liquidVariant: {
      default: "hover:scale-105",
      none: "",
    },
  },
  defaultVariants: {
    liquidVariant: "default",
  },
})

export type LiquidButtonProps = ButtonProps & {
  liquidVariant?: "default" | "none"
}

export function LiquidButton({ className, liquidVariant = "default", children, ...props }: LiquidButtonProps) {
  const filterId = `liquid-button-${Math.random().toString(36).substr(2, 9)}`

  return (
    <>
      <Button className={cn(liquidButtonVariants({ liquidVariant }), className)} {...props}>
        <div className={cn("pointer-events-none absolute inset-0 rounded-full transition-all", GLASS_SHADOW)} />
        <div
          className="-z-10 pointer-events-none absolute inset-0 isolate overflow-hidden rounded-md"
          style={{ backdropFilter: `url("#${filterId}")` }}
        />
        <span className="relative z-10">{children}</span>
      </Button>
      <GlassFilter id={filterId} scale={BUTTON_GLASS_FILTER_SCALE} />
    </>
  )
}

const liquidGlassCardVariants = cva(
  "group relative overflow-hidden bg-background/20 backdrop-blur-[2px] transition-all duration-300",
  {
    variants: {
      glassSize: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      glassSize: "default",
    },
  },
)

export type LiquidGlassCardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof liquidGlassCardVariants> & {
    glassEffect?: boolean
  }

export function LiquidGlassCard({
  className,
  glassSize,
  glassEffect = true,
  children,
  ...props
}: LiquidGlassCardProps) {
  const filterId = `liquid-card-${Math.random().toString(36).substr(2, 9)}`

  return (
    <Card className={cn(liquidGlassCardVariants({ glassSize }), className)} {...props}>
      <div className={cn("pointer-events-none absolute inset-0 rounded-lg transition-all", GLASS_SHADOW)} />

      {glassEffect && (
        <>
          <div
            className="-z-10 pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
            style={{ backdropFilter: `url("#${filterId}")` }}
          />
          <GlassFilter id={filterId} scale={DEFAULT_GLASS_FILTER_SCALE} />
        </>
      )}

      <div className="relative z-10">{children}</div>

      <div className="pointer-events-none absolute inset-0 z-20 rounded-lg bg-gradient-to-r from-transparent via-black/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:via-white/5" />
    </Card>
  )
}
