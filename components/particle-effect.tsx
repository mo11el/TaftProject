"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  life: number
  maxLife: number
}

export function ParticleEffect({ fadeOutAt = 0.3 }: { fadeOutAt?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(1)
  const particlesRef = useRef<Particle[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse/touch tracking
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX
      const y = "touches" in e ? e.touches[0].clientY : e.clientY
      setMousePos({ x, y })

      // Create particles away from cursor
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = 50 + Math.random() * 50
        const vx = Math.cos(angle) * (2 + Math.random() * 2)
        const vy = Math.sin(angle) * (2 + Math.random() * 2)

        particlesRef.current.push({
          id: idRef.current++,
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          vx,
          vy,
          radius: 2 + Math.random() * 3,
          life: 1,
          maxLife: 1,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // Gravity
        p.life -= 0.02

        if (p.life > 0) {
          ctx.globalAlpha = p.life * opacity
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
          return true
        }
        return false
      })

      ctx.globalAlpha = 1
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleMouseMove)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [opacity])

  // Listen for scroll to fade out particles
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrollProgress > fadeOutAt) {
        setOpacity(Math.max(0, 1 - (scrollProgress - fadeOutAt) / 0.2))
      } else {
        setOpacity(1)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [fadeOutAt])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-5" />
}
