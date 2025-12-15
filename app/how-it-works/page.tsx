"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Archive, Menu, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Card {
  id: number
  title: string
  subtitle: string
  date: string
  dateLabel: string
  image: string
}

const cards: Card[] = [
  {
    id: 1,
    title: "Message Naturally",
    subtitle: "Start a conversation in iMessage just like you normally would.",
    date: "Text naturally. Aria understands",
    dateLabel: "1",
    image: "/flow1.jpg",
  },
  {
    id: 2,
    title: "Aria confirms the task, then takes it from there.",
    subtitle:
      "Aria uses native llm intelligence to: parse intent, understand timing, dates, and context, and then confirming once—then execute automatically",
    date: "Turn everyday texts into action.",
    dateLabel: "2",
    image: "/flow2.jpg",
  },
  {
    id: 3,
    title: "Seamless iMessage Integration",
    subtitle: "No app switching. No dashboards. No friction.",
    date: "Aria fits into how you already communicate—so nothing new to learn.",
    dateLabel: "3",
    image: "/flow3.jpg",
  },
  {
    id: 4,
    title: "Tell Aria What to Remember — It Handles the Rest",
    subtitle: "Deadlines, errands, daily tasks—handled automatically.",
    date: "Aria manages timing, follow-ups, and delivery—so you don't have to think about it again.",
    dateLabel: "4",
    image: "/flow4.jpg",
  },
  {
    id: 5,
    title: "Price Alerts",
    subtitle: "Ask Aria to monitor prices and notify you when conditions are met.",
    date: "Aria watches in the background and only interrupts you when it matters.",
    dateLabel: "5",
    image: "/flow5.jpg",
  },
  {
    id: 6,
    title: "Group Chats",
    subtitle: "Add Aria to group chats to help coordinate plans.",
    date: "You call on Aria naturally—just like tagging a friend.",
    dateLabel: "6",
    image: "/flow6.jpg",
  },
  {
    id: 7,
    title: "Do I need to download an app?",
    subtitle: "No.",
    date: "Aria works completely inside iMessage.",
    dateLabel: "FAQ",
    image: "/flow7.jpg",
  },
  {
    id: 8,
    title: "Is Aria always running?",
    subtitle: "Yes.",
    date: "Once you start a conversation, Aria runs continuously in the background so reminders and alerts fire exactly when scheduled.",
    dateLabel: "1",
    image: "/flow8.jpg",
  },
  {
    id: 9,
    title: "What can Aria do?",
    subtitle:
      "As of now, Reminders and follow-ups, Time-based and conditional alerts, Direct Calendar Integration, Price monitoring, and Scheduling assistance (including group chats)",
    date: "No new app. Just text.",
    dateLabel: "2",
    image: "/flow9.jpg",
  },
  {
    id: 10,
    title: "What can't Aria do?",
    subtitle:
      "Aria is not a general-purpose conversational AI. It doesn't Answer broad knowledge questions, Provide advice or opinions, or Replace research tools or chatbots.",
    date: "For anything outside reminders and coordination, Aria will redirect you appropriately.",
    dateLabel: "3",
    image: "/flow10.jpg",
  },
  {
    id: 11,
    title: "Using Aria Without iMessage",
    subtitle: "Aria works even when iMessage isn't available.",
    date: "If iMessage is unavailable—due to device settings, connectivity, or recipient compatibility—messages automatically fall back to standard SMS.",
    dateLabel: "4",
    image: "/flowsms.jpg",
  },
  {
    id: 12,
    title: "How is this different from calendar apps or to-do lists?",
    subtitle: "You don't manage Aria. You just text.",
    date: "No forms. No interfaces. No maintenance. Aria adapts to how you already communicate.",
    dateLabel: "5",
    image: "/flow11.jpg",
  },
]

export default function HowItWorks() {
  const [position, setPosition] = useState(0)
  const [viewMode, setViewMode] = useState<"stack" | "list">("stack")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e: WheelEvent) => {
    if (viewMode !== "stack") return
    e.preventDefault()

    const scrollSensitivity = 0.008
    const delta = e.deltaY * scrollSensitivity

    setPosition((prev) => {
      const newPosition = prev + delta
      return Math.max(0, Math.min(cards.length - 1, newPosition))
    })
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false })
      return () => container.removeEventListener("wheel", handleScroll)
    }
  }, [viewMode])

  const handleTimelineClick = (index: number) => {
    setPosition(index)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const activeIndex = Math.round(position)

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-neutral-100 to-neutral-200"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute left-6 top-6 z-50">
        <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
          ← Back
        </Link>
      </div>

      {/* Header Navigation */}
      <div className="absolute right-6 top-6 z-50 flex items-center gap-1 rounded-lg border border-neutral-200 bg-white/80 p-1 shadow-sm backdrop-blur-sm">
        <button
          className={`rounded-md p-2 transition-colors ${viewMode === "stack" ? "bg-neutral-100" : "hover:bg-neutral-100"}`}
          onClick={() => setViewMode("stack")}
        >
          <Archive className="h-5 w-5 text-neutral-700" />
        </button>
        <button
          className={`rounded-md p-2 transition-colors ${viewMode === "list" ? "bg-neutral-100" : "hover:bg-neutral-100"}`}
          onClick={() => setViewMode("list")}
        >
          <Menu className="h-5 w-5 text-neutral-700" />
        </button>
      </div>

      {viewMode === "stack" ? (
        <>
          {/* Cards Stack */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1500px" }}>
            <div className="relative h-[600px] w-[800px]" style={{ transformStyle: "preserve-3d" }}>
              {[...cards].reverse().map((card, reverseIndex) => {
                const index = cards.length - 1 - reverseIndex
                const distanceFromActive = index - position

                if (distanceFromActive < -1.5 || distanceFromActive > 5) {
                  return null
                }

                const isBehind = distanceFromActive > 0
                const isInFront = distanceFromActive < 0

                const translateZ = distanceFromActive * -60
                const translateY = distanceFromActive * -30
                const scale = 1 - Math.abs(distanceFromActive) * 0.03

                let opacity = 1
                if (isInFront) {
                  opacity = Math.max(0, 1 + distanceFromActive * 2)
                }

                return (
                  <div
                    key={card.id}
                    className="absolute inset-0"
                    style={{
                      transform: `translateZ(${translateZ}px) translateY(${translateY}px) scale(${Math.max(0.7, scale)})`,
                      opacity: Math.max(0, opacity),
                      zIndex: Math.round((cards.length - Math.abs(distanceFromActive)) * 10),
                      transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
                      pointerEvents: Math.abs(distanceFromActive) < 0.5 ? "auto" : "none",
                    }}
                    onClick={() => handleTimelineClick(index)}
                  >
                    <div className="h-full w-full overflow-hidden bg-white shadow-2xl">
                      <div className="relative h-[65%] overflow-hidden bg-neutral-200">
                        <img
                          src={card.image || "/placeholder.svg"}
                          alt={card.title}
                          className="h-full w-full object-cover"
                        />
                        {isBehind && (
                          <div
                            className="absolute inset-0 bg-black"
                            style={{
                              opacity: Math.min(0.3, Math.abs(distanceFromActive) * 0.08),
                            }}
                          />
                        )}
                      </div>
                      <div className="bg-white p-8">
                        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">{card.title}</h2>
                        <p className="mt-2 text-lg text-neutral-500">{card.subtitle}</p>
                        <p className="mt-3 text-sm text-neutral-400">{card.date}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="absolute bottom-20 right-8 top-20 z-40 flex flex-col items-end justify-between py-8">
            {cards.map((card, index) => {
              const isActive = index === activeIndex
              const isNow = index === 0

              return (
                <button
                  key={card.id}
                  className="group flex items-center gap-2 transition-all duration-300"
                  onClick={() => handleTimelineClick(index)}
                >
                  <span
                    className={`text-sm font-medium transition-all duration-300 ${
                      isActive ? "text-orange-500" : "text-neutral-400 group-hover:text-neutral-600"
                    }`}
                  >
                    {isNow ? "Now" : card.dateLabel}
                  </span>
                  <div className="relative flex items-center">
                    <div
                      className={`h-0.5 transition-all duration-300 ${
                        isActive ? "w-8 bg-orange-500" : "w-4 bg-neutral-300 group-hover:w-6 group-hover:bg-neutral-400"
                      }`}
                    />
                    {isActive && <div className="absolute -right-1 h-2 w-2 rounded-full bg-orange-500" />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-neutral-400">
            Scroll or click timeline to navigate
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto max-w-5xl px-6 pb-12 pt-24">
            <div className="divide-y divide-neutral-200">
              {cards.map((card, index) => (
                <button
                  key={card.id}
                  className="group flex w-full items-center gap-6 py-4 text-left transition-colors hover:bg-neutral-50"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setViewMode("stack")
                    setPosition(index)
                  }}
                >
                  <span className="w-32 shrink-0 text-sm text-neutral-400">
                    {card.date.split(",")[0]}, {card.date.split(",")[1]?.trim().split(" ")[0]}
                  </span>
                  <span className="min-w-0 shrink-0 font-medium text-neutral-900" style={{ width: "280px" }}>
                    {card.title}
                  </span>
                  <span className="min-w-0 flex-1 text-neutral-400">{card.subtitle}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-1 group-hover:text-neutral-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Floating preview image */}
          {hoveredIndex !== null && (
            <div
              className="pointer-events-none fixed z-50 overflow-hidden shadow-2xl transition-opacity duration-200"
              style={{
                left: mousePos.x + 20,
                top: mousePos.y - 100,
                width: 280,
                height: 180,
              }}
            >
              <img
                src={cards[hoveredIndex].image || "/placeholder.svg"}
                alt={cards[hoveredIndex].title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
