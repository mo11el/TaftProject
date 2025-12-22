"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Cursor } from "react-creative-cursor"
import "react-creative-cursor/dist/styles.css"
import TypewriterTitle from "@/components/typewriter-title"

export default function About() {
  const flags = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    flag: i % 2 === 0 ? "🇺🇸" : "🇲🇽",
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 10,
  }))

  return (
    <div className="min-h-screen bg-white relative overflow-hidden" style={{ cursor: "none" }}>
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .floating-flag {
          animation: float linear infinite;
          position: fixed;
          font-size: 3rem;
          z-index: 10;
        }
      `}</style>

      {/* Floating flags */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {flags.map((flag) => (
          <div
            key={flag.id}
            className="floating-flag"
            style={{
              left: `${flag.left}%`,
              animationDelay: `${flag.delay}s`,
              animationDuration: `${flag.duration}s`,
            }}
          >
            {flag.flag}
          </div>
        ))}
      </div>

      {/* Creative Cursor effect */}
      <Cursor isGelly={true} cursorSize={60} cursorBackgrounColor="#3b82f6" />

      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
          data-cursor-magnetic
          data-cursor-size="100px"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 relative z-20">
        <div className="mb-12">
          <TypewriterTitle
            sequences={[
              { text: "Built for your day — as it happens.", deleteAfter: true, pauseAfter: 2000 },
              { text: "The easiest assistant you'll ever use.", deleteAfter: true, pauseAfter: 2000 },
              { text: "A better way to remember things.", deleteAfter: true, pauseAfter: 2000 },
            ]}
            autoLoop={true}
            typingSpeed={50}
            deleteSpeed={30}
            naturalVariance={true}
          />
        </div>

        {/* Main content */}
        <div className="max-w-2xl w-full">
          <p
            className="text-black leading-relaxed text-lg"
            style={{ fontFamily: "Times New Roman, serif" }}
            data-cursor-color="#10b981"
            data-cursor-size="80px"
          >
            <span className="font-bold">About AriaReply</span>
            <br />
            <br />
            AriaReply is an AI messaging platform built between New York City and Mexico City, focused on delivering
            seamless, intelligent communication directly within iMessage.
            <br />
            <br />
            Sign up for early access to experience AriaReply.
            <br />
            <br />
            Explore{" "}
            <a
              href="https://www.linkedin.com/company/ariareply-ai/jobs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline inline-block"
              data-cursor-stick
              data-cursor-text="Jobs"
              data-cursor-size="120px"
            >
              open positions
            </a>{" "}
            to learn more about opportunities to join our team.
            <br />
            <br />
            For inquiries, contact us at ian@ariareply.com & mcorona@ariareply.com.
            <br />
            <br />
            Follow our updates on Instagram (@ariareply) and X (@ariareplyai).
          </p>
        </div>
      </div>
    </div>
  )
}
