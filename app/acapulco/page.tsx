'use client';

import { useEffect } from 'react';

export default function AcapulcoPage() {
  useEffect(() => {
    // Initialize Oil Shader Canvas
    const canvas = document.getElementById('oil-canvas') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let time = 0;
        const animate = () => {
          time += 0.005;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Oil shader effect with iridescent colors
          const imageData = ctx.createImageData(canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const pixelIndex = i / 4;
            const x = pixelIndex % canvas.width;
            const y = Math.floor(pixelIndex / canvas.width);

            // Perlin-like noise simulation with sine waves
            const noise =
              Math.sin(x * 0.005 + time) * 0.5 +
              Math.sin(y * 0.005 + time) * 0.5 +
              Math.sin((x + y) * 0.003 + time * 0.5) * 0.5;

            // Iridescent color generation
            const hue = (noise * 180 + time * 30) % 360;
            const rgb = hslToRgb(hue, 80, 50);

            data[i] = rgb.r;
            data[i + 1] = rgb.g;
            data[i + 2] = rgb.b;
            data[i + 3] = Math.max(20, noise * 100 + 60);
          }

          ctx.putImageData(imageData, 0, 0);
          requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #050505;
          --fg: #fafafa;
          --muted: rgba(250,250,250,0.38);
          --accent: #2563eb;
          --border: rgba(250,250,250,0.08);
          --font-display: 'Editorial New', Georgia, serif;
          --font-mono: 'Geist Mono', monospace;
          --font-sans: 'Geist', system-ui, sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--fg);
          font-family: var(--font-sans);
          overflow-x: hidden;
          cursor: none;
        }

        /* ─── CUSTOM CURSOR ─── */
        #cursor-dot {
          position: fixed;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--fg);
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%,-50%);
          transition: transform 0.1s, background 0.2s, width 0.2s, height 0.2s;
          mix-blend-mode: difference;
        }
        #cursor-ring {
          position: fixed;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(250,250,250,0.5);
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%,-50%);
          transition: transform 0.08s linear, width 0.3s, height 0.3s, border-color 0.3s;
          mix-blend-mode: difference;
        }
        body.cursor-hover #cursor-dot { width: 10px; height: 10px; background: var(--accent); }
        body.cursor-hover #cursor-ring { width: 48px; height: 48px; border-color: var(--accent); }

        /* ─── NAVBAR ─── */
        #navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          transition: background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s;
        }
        #navbar.scrolled {
          background: rgba(5,5,5,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.25em;
          color: var(--muted);
          cursor: none;
        }
        .nav-logo-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          transition: transform 0.3s;
        }
        .nav-logo:hover .nav-logo-dot { transform: scale(1.5); }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.15em; color: var(--muted);
          text-decoration: none; cursor: none;
          position: relative; transition: color 0.3s;
        }
        .nav-links a .num { color: var(--accent); margin-right: 4px; }
        .nav-links a::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px; background: var(--fg);
          transition: width 0.3s;
        }
        .nav-links a:hover { color: var(--fg); }
        .nav-links a:hover::after { width: 100%; }
        .nav-status { display: flex; align-items: center; gap: 8px; }
        .nav-ping {
          position: relative; width: 8px; height: 8px;
        }
        .nav-ping span {
          position: absolute; border-radius: 50%;
          width: 100%; height: 100%;
          background: var(--accent);
        }
        .nav-ping .ping-anim {
          animation: ping 1.5s infinite;
          opacity: 0.6;
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .nav-status-text {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; color: var(--muted);
        }
        @media (max-width: 768px) {
          #navbar { padding: 16px 24px; }
          .nav-links, .nav-status { display: none; }
        }

        /* ─── HERO / OIL SHADER ─── */
        #hero {
          position: relative; height: 100vh; width: 100%;
          overflow: hidden; background: #000;
        }
        #oil-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          display: block; touch-action: none;
        }
        .hero-overlay {
          position: absolute; inset: 0; z-index: 10;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 120px 48px 60px;
          pointer-events: none;
        }
        .hero-tl { max-width: 420px; }
        .hero-eyebrow {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.3em; color: var(--muted); margin-bottom: 12px;
        }
        .hero-h1 {
          font-family: var(--font-display);
          font-size: clamp(42px, 7vw, 88px);
          font-weight: 400; line-height: 0.95;
          letter-spacing: -0.02em;
        }
        .hero-h1 em { font-style: italic; }
        .hero-br { align-self: flex-end; text-align: right; max-width: 400px; }
        .hero-sub {
          font-family: var(--font-sans); font-size: 13px;
          color: var(--muted); line-height: 1.7;
          letter-spacing: 0.01em; max-width: 320px; margin-left: auto;
        }
        .hero-cta-wrapper {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%); z-index: 20;
          pointer-events: auto;
        }
        .hero-cta {
          position: relative;
          padding: 14px 36px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.2em; text-transform: uppercase;
          background: transparent;
          color: var(--fg);
          cursor: none;
          transition: background 0.4s, color 0.4s;
          backdrop-filter: blur(8px);
        }
        .hero-cta:hover { background: var(--fg); color: var(--bg); }
        .hero-cta .cta-dot {
          position: absolute; top: -4px; right: -4px;
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
          animation: ping 1.5s infinite;
        }
        .scroll-indicator {
          position: absolute; bottom: 32px; left: 50%;
          transform: translateX(-50%); z-index: 20;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          pointer-events: none;
          animation: fadeIn 1s 2s both;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .scroll-label {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.3em; color: var(--muted);
        }
        .scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, rgba(250,250,250,0.5), transparent);
          animation: scrollBob 1.5s ease-in-out infinite;
        }
        @keyframes scrollBob {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        /* ─── GRADUAL BLUR ─── */
        .gradual-blur-bottom {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 180px; z-index: 15; pointer-events: none;
        }
        .gradual-blur-bottom div {
          position: absolute; inset: 0;
        }

        /* ─── SECTIONS COMMON ─── */
        section { position: relative; }
        .eyebrow {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.3em; color: var(--muted); margin-bottom: 20px;
        }
        .section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(250,250,250,0.12), transparent);
          margin: 0 48px;
        }

        /* ─── PHILOSOPHY / ABOUT ─── */
        #philosophy {
          padding: 120px 0 0;
          overflow: hidden;
        }
        .philosophy-header { padding: 0 48px 80px; }
        .philosophy-h2 {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 64px);
          font-weight: 400; font-style: italic;
          line-height: 1.1;
        }
        .marquee-track {
          position: relative;
          height: 110px;
          overflow: hidden;
          display: flex; align-items: center;
        }
        .marquee-inner {
          display: flex; gap: 80px;
          white-space: nowrap;
          will-change: transform;
        }
        .marquee-inner.left { animation: marqueeLeft 30s linear infinite; }
        .marquee-inner.right { animation: marqueeRight 30s linear infinite; }
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-word {
          font-family: var(--font-display);
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 400; letter-spacing: -0.02em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(250,250,250,0.25);
          cursor: default;
          transition: color 0.3s, -webkit-text-stroke 0.3s;
          white-space: nowrap;
        }
        .marquee-word:hover {
          color: var(--fg);
          -webkit-text-stroke: none;
        }
        .marquee-dot { color: rgba(250,250,250,0.15); margin: 0 16px; }

        /* ─── BEHAVIORAL SYSTEMS (WORKS) ─── */
        #systems {
          padding: 120px 48px 80px;
          position: relative;
        }
        .systems-header { margin-bottom: 80px; }
        .systems-h2 {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 56px);
          font-style: italic; font-weight: 400;
        }
        .systems-list { position: relative; }
        .system-item {
          border-top: 1px solid var(--border);
          padding: 36px 0;
          position: relative;
          cursor: none;
        }
        .system-item:last-child { border-bottom: 1px solid var(--border); }
        .system-link {
          display: flex; flex-direction: column;
          gap: 16px;
          text-decoration: none; color: inherit;
          cursor: none;
        }
        @media (min-width: 768px) {
          .system-link {
            flex-direction: row; align-items: center;
            justify-content: space-between;
          }
        }
        .system-year {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; color: var(--muted);
          width: 60px; flex-shrink: 0;
        }
        .system-name {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 80px);
          font-weight: 400; letter-spacing: -0.02em;
          flex: 1; transition: transform 0.3s, color 0.3s;
        }
        .system-item:hover .system-name {
          transform: translateX(20px);
          color: rgba(250,250,250,0.6);
        }
        .system-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .system-tag {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.15em;
          padding: 5px 12px; border: 1px solid var(--border);
          border-radius: 100px; color: var(--muted);
        }

        /* Floating image on hover */
        .float-image {
          position: absolute; pointer-events: none; z-index: 50;
          width: 260px; height: 180px;
          overflow: hidden; border-radius: 8px;
          opacity: 0; transform: scale(0.85);
          transition: opacity 0.2s, transform 0.2s;
        }
        .float-image.visible { opacity: 1; transform: scale(1); }
        .float-image img {
          width: 100%; height: 100%; object-fit: contain;
          background: #111;
          padding: 20px;
          filter: brightness(0.9);
        }
        .float-image-tint {
          position: absolute; inset: 0;
          background: rgba(37,99,235,0.08);
        }

        /* ─── TECH MARQUEE (Technical Arsenal) ─── */
        #tech {
          padding: 80px 0 120px;
          overflow: hidden;
        }
        .tech-header { padding: 0 48px 64px; }

        /* ─── CHARACTERIZATION ─── */
        #characterization {
          padding: 120px 48px;
          border-top: 1px solid var(--border);
        }
        .char-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px; margin-top: 64px;
        }
        @media (min-width: 768px) {
          .char-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (min-width: 1024px) {
          .char-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .char-card {
          border: 1px solid var(--border);
          padding: 32px; border-radius: 2px;
          transition: border-color 0.3s, background 0.3s;
          cursor: none;
        }
        .char-card:hover {
          border-color: rgba(250,250,250,0.25);
          background: rgba(250,250,250,0.02);
        }
        .char-card-title {
          font-family: var(--font-display);
          font-size: 22px; font-style: italic;
          margin-bottom: 16px;
        }
        .char-card-body {
          font-size: 13px; line-height: 1.75;
          color: var(--muted);
        }
        .char-card-num {
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.2em; color: var(--accent);
          margin-bottom: 16px;
        }

        /* ─── ARCHITECTURE ─── */
        #architecture {
          padding: 120px 48px;
          background: rgba(250,250,250,0.015);
          border-top: 1px solid var(--border);
        }
        .arch-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px; margin-top: 64px;
        }
        @media (min-width: 768px) {
          .arch-grid { grid-template-columns: 1fr 1fr; }
        }
        .arch-copy {
          font-size: 14px; line-height: 2; color: var(--muted);
          max-width: 520px;
        }
        .arch-copy p { margin-bottom: 20px; }
        .arch-list {
          list-style: none; display: flex; flex-direction: column; gap: 0;
        }
        .arch-list li {
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.1em; color: var(--muted);
          padding: 14px 0; border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 12px;
          transition: color 0.3s, padding-left 0.3s;
          cursor: none;
        }
        .arch-list li:hover { color: var(--fg); padding-left: 8px; }
        .arch-list li::before {
          content: '—'; color: var(--accent); flex-shrink: 0;
        }
        .arch-h2 {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 52px);
          font-style: italic; font-weight: 400;
          line-height: 1.1; margin-bottom: 8px;
        }

        /* ─── VISION ─── */
        #vision {
          padding: 140px 48px;
          border-top: 1px solid var(--border);
          overflow: hidden;
        }
        .vision-h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 6vw, 80px);
          font-weight: 400; line-height: 1.05;
          letter-spacing: -0.02em; max-width: 900px;
        }
        .vision-h2 em { font-style: italic; color: rgba(250,250,250,0.6); }
        .vision-copy {
          margin-top: 48px; max-width: 560px;
          font-size: 14px; line-height: 2; color: var(--muted);
        }
        .vision-copy p { margin-bottom: 16px; }

        /* ─── FOOTER / CTA ─── */
        #contact {
          border-top: 1px solid var(--border);
          position: relative; overflow: hidden;
        }
        .cta-block {
          display: block; padding: 80px 48px;
          text-decoration: none; cursor: none;
          position: relative; overflow: hidden;
        }
        .cta-curtain {
          position: absolute; inset: 0; background: var(--accent);
          transform: translateY(100%);
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
          z-index: 0;
        }
        .cta-block:hover .cta-curtain { transform: translateY(0); }
        .cta-inner {
          position: relative; z-index: 1;
          display: flex; align-items: center; justify-content: space-between; gap: 32px;
        }
        .cta-h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 7vw, 96px);
          font-weight: 400; line-height: 1;
          transition: color 0.3s;
        }
        .cta-h2 em { font-style: italic; }
        .cta-block:hover .cta-h2 { color: #050505; }
        .cta-arrow {
          font-size: 48px; line-height: 1;
          transition: transform 0.3s, color 0.3s;
          flex-shrink: 0;
        }
        .cta-block:hover .cta-arrow { transform: rotate(45deg); color: #050505; }

        /* Email modal */
        .email-modal-overlay {
          position: fixed; inset: 0; z-index: 9000;
          background: rgba(5,5,5,0.85); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s;
        }
        .email-modal-overlay.open { opacity: 1; pointer-events: auto; }
        .email-modal {
          background: #0c0c0c; border: 1px solid var(--border);
          padding: 48px; max-width: 480px; width: 90%;
          border-radius: 4px;
          transform: translateY(20px);
          transition: transform 0.3s;
        }
        .email-modal-overlay.open .email-modal { transform: translateY(0); }
        .email-modal h3 {
          font-family: var(--font-display); font-size: 32px;
          font-style: italic; margin-bottom: 8px;
        }
        .email-modal p {
          font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 32px;
        }
        .email-modal input {
          width: 100%; background: rgba(250,250,250,0.05);
          border: 1px solid var(--border); color: var(--fg);
          padding: 12px 16px; font-family: var(--font-mono);
          font-size: 12px; margin-bottom: 16px; border-radius: 2px;
          outline: none; transition: border-color 0.3s;
        }
        .email-modal input:focus { border-color: rgba(250,250,250,0.3); }
        .email-modal textarea {
          width: 100%; background: rgba(250,250,250,0.05);
          border: 1px solid var(--border); color: var(--fg);
          padding: 12px 16px; font-family: var(--font-sans);
          font-size: 13px; line-height: 1.6;
          margin-bottom: 24px; border-radius: 2px;
          outline: none; resize: vertical; min-height: 120px;
          transition: border-color 0.3s;
        }
        .email-modal textarea:focus { border-color: rgba(250,250,250,0.3); }
        .modal-actions { display: flex; gap: 12px; }
        .btn-send {
          flex: 1; padding: 12px; background: var(--fg); color: var(--bg);
          border: none; font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.15em; text-transform: uppercase;
          border-radius: 2px; cursor: none; transition: background 0.3s;
        }
        .btn-send:hover { background: rgba(250,250,250,0.85); }
        .btn-cancel {
          padding: 12px 20px; background: transparent; color: var(--muted);
          border: 1px solid var(--border); font-family: var(--font-mono);
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          border-radius: 2px; cursor: none; transition: color 0.3s;
        }
        .btn-cancel:hover { color: var(--fg); }

        /* footer info bar */
        .footer-bar {
          padding: 24px 48px; border-top: 1px solid var(--border);
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 16px;
        }
        .footer-time {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; color: var(--muted);
        }
        .footer-time span { color: var(--fg); }
        .footer-links { display: flex; gap: 32px; }
        .footer-links a {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; color: var(--muted);
          text-decoration: none; cursor: none; transition: color 0.3s;
        }
        .footer-links a:hover { color: var(--fg); }
        .footer-loc {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.15em; color: var(--muted);
        }
        .footer-copy {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.2em; color: var(--muted);
        }

        /* ─── ANIMATION HELPERS ─── */
        .reveal {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94),
                      transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .reveal.visible { opacity: 1; transform: none; }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        /* ─── SECTION SEPARATORS ─── */
        .sep {
          margin: 0 48px;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
        }

        /* ─── BUILT BTWN badge ─── */
        .built-badge {
          position: fixed; bottom: 28px; right: 48px; z-index: 500;
          font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.2em; color: rgba(250,250,250,0.2);
          writing-mode: vertical-rl; text-orientation: mixed;
          transform: rotate(180deg);
          pointer-events: none;
        }
      `}</style>

      {/* Custom cursor */}
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>

      {/* Built badge */}
      <div className="built-badge">BUILT BTWN NYC | CDMX</div>

      {/* Navbar */}
      <header id="navbar">
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); }}>
          <span>ACAPULCO</span>
          <span className="nav-logo-dot"></span>
        </a>
        <ul className="nav-links">
          <li><a href="#philosophy"><span className="num">01</span>PHILOSOPHY</a></li>
          <li><a href="#systems"><span className="num">02</span>SYSTEMS</a></li>
          <li><a href="#architecture"><span className="num">03</span>ARCHITECTURE</a></li>
          <li><a href="#contact"><span className="num">04</span>CONTACT</a></li>
        </ul>
        <div className="nav-status">
          <div className="nav-ping">
            <span className="ping-anim"></span>
            <span></span>
          </div>
          <span className="nav-status-text">ARIAREPLY</span>
        </div>
      </header>

      {/* HERO — Oil Shader */}
      <section id="hero">
        <canvas id="oil-canvas" aria-label="Interactive iridescent oil shader"></canvas>

        {/* Gradual blur at bottom */}
        <div className="gradual-blur-bottom" id="hero-blur"></div>

        <div className="hero-overlay">
          <div className="hero-tl reveal">
            <p className="hero-eyebrow">01 — BEHAVIOR INFRASTRUCTURE</p>
            <h1 className="hero-h1">BEHAVIOR<br/><em>INFRASTRUCTURE</em><br/>FOR AI</h1>
          </div>
          <div className="hero-br reveal reveal-delay-2">
            <p className="hero-sub">Meticulously crafted behavioral systems and bespoke characterization frameworks for agents, copilots, and AI assistants.</p>
          </div>
        </div>

        <div className="hero-cta-wrapper">
          <button className="hero-cta" onClick={() => document.getElementById('systems')?.scrollIntoView({behavior:'smooth'})}>
            Explore Behaviors
            <span className="cta-dot"></span>
          </button>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-label">SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* PHILOSOPHY / About */}
      <section id="philosophy">
        <div className="philosophy-header">
          <p className="eyebrow reveal">03 — PHILOSOPHY</p>
          <h2 className="philosophy-h2 reveal reveal-delay-1">Models Think.<br/><em style={{color:'rgba(250,250,250,0.5)'}}>Behavior Connects.</em></h2>
        </div>

        <div className="marquee-track">
          <div className="marquee-inner left" id="marquee-1">
            <span className="marquee-word">The pauses.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">The pacing.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">The initiative.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">The communication style.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">The emotional calibration.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">The pauses.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">The pacing.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">The initiative.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">The communication style.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">The emotional calibration.</span><span className="marquee-dot">•</span>
          </div>
        </div>
        <div className="marquee-track" style={{marginTop:'12px'}}>
          <div className="marquee-inner right" id="marquee-2">
            <span className="marquee-word">Users remember how it made them feel.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Behavior is becoming infrastructure.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Users remember how it made them feel.</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Behavior is becoming infrastructure.</span><span className="marquee-dot">•</span>
          </div>
        </div>

        <div className="sep" style={{marginTop:'80px'}}></div>
      </section>

      {/* BEHAVIORAL SYSTEMS */}
      <section id="systems">
        <div className="systems-header">
          <p className="eyebrow reveal">04 — BEHAVIORAL SYSTEMS</p>
          <h2 className="systems-h2 reveal reveal-delay-1">A Library of <em style={{fontStyle:'italic'}}>Human Dynamics</em></h2>
        </div>

        <div className="systems-list" id="systems-list">
          <div className="system-item">
            <div className="system-link">
              <div className="system-year">2024</div>
              <div className="system-name">iMessage Native</div>
              <div className="system-tags">
                <span className="system-tag">Platform-Native</span>
                <span className="system-tag">Conversational</span>
                <span className="system-tag">Rhythm</span>
              </div>
            </div>
          </div>
          <div className="system-item">
            <div className="system-link">
              <div className="system-year">2024</div>
              <div className="system-name">WhatsApp Intelligence</div>
              <div className="system-tags">
                <span className="system-tag">Messaging</span>
                <span className="system-tag">Adaptive</span>
                <span className="system-tag">Global</span>
              </div>
            </div>
          </div>
          <div className="system-item">
            <div className="system-link">
              <div className="system-year">2023</div>
              <div className="system-name">Social Presence</div>
              <div className="system-tags">
                <span className="system-tag">Instagram</span>
                <span className="system-tag">Brand Voice</span>
                <span className="system-tag">Engagement</span>
              </div>
            </div>
          </div>
          <div className="system-item">
            <div className="system-link">
              <div className="system-year">2023</div>
              <div className="system-name">Operator Dynamics</div>
              <div className="system-tags">
                <span className="system-tag">High-Agency</span>
                <span className="system-tag">Execution</span>
                <span className="system-tag">Coordination</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating image for hover */}
        <div className="float-image" id="float-img">
          <img id="float-img-src" src="" alt="" />
          <div className="float-image-tint"></div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section id="tech">
        <div className="tech-header">
          <p className="eyebrow reveal">05 — TECHNICAL ARSENAL</p>
        </div>
        <div className="marquee-track">
          <div className="marquee-inner left">
            <span className="marquee-word">Behavioral Frameworks</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Personality Architecture</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Conversational Design</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Memory Heuristics</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Composable Systems</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Behavioral Frameworks</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Personality Architecture</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Conversational Design</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Memory Heuristics</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Composable Systems</span><span className="marquee-dot">•</span>
          </div>
        </div>
        <div className="marquee-track" style={{marginTop:'12px'}}>
          <div className="marquee-inner right">
            <span className="marquee-word">Initiative Models</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Emotional Calibration</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Platform-Native Adaptation</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Decision-Making Principles</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Response Pacing Logic</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Initiative Models</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Emotional Calibration</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Platform-Native Adaptation</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Decision-Making Principles</span><span className="marquee-dot">•</span>
            <span className="marquee-word">Response Pacing Logic</span><span className="marquee-dot">•</span>
          </div>
        </div>
      </section>

      <div className="sep"></div>

      {/* BESPOKE CHARACTERIZATION */}
      <section id="characterization">
        <p className="eyebrow reveal">06 — BESPOKE CHARACTERIZATION</p>
        <h2 className="arch-h2 reveal reveal-delay-1">Bespoke Characterization <em>at Scale</em></h2>
        <p style={{fontSize:'14px',color:'var(--muted)',maxWidth:'560px',lineHeight:'1.8',marginTop:'20px',marginBottom:'0'}} className="reveal reveal-delay-2">
          Every assistant has a personality — whether intentionally designed or not.<br/>
          Acapulco gives teams the ability to architect that personality with precision.
        </p>

        <div className="char-grid">
          <div className="char-card reveal reveal-delay-1">
            <p className="char-card-num">SYS — 001</p>
            <h3 className="char-card-title">Operator Dynamics</h3>
            <p className="char-card-body">High-agency behavioral systems designed for execution, coordination, and proactive assistance.</p>
          </div>
          <div className="char-card reveal reveal-delay-2">
            <p className="char-card-num">SYS — 002</p>
            <h3 className="char-card-title">iMessage Native</h3>
            <p className="char-card-body">Built specifically for modern messaging environments with natural pacing, conversational rhythm, and platform-aware communication.</p>
          </div>
          <div className="char-card reveal reveal-delay-3">
            <p className="char-card-num">SYS — 003</p>
            <h3 className="char-card-title">Research Architect</h3>
            <p className="char-card-body">Structured analytical behavior optimized for synthesis, exploration, and critical thinking.</p>
          </div>
          <div className="char-card reveal reveal-delay-1">
            <p className="char-card-num">SYS — 004</p>
            <h3 className="char-card-title">Adaptive Intelligence</h3>
            <p className="char-card-body">Behavioral systems that dynamically adjust tone, verbosity, and initiative based on context.</p>
          </div>
          <div className="char-card reveal reveal-delay-2">
            <p className="char-card-num">SYS — 005</p>
            <h3 className="char-card-title">Concierge</h3>
            <p className="char-card-body">White-glove interaction frameworks designed around anticipation, clarity, and attentiveness.</p>
          </div>
          <div className="char-card reveal reveal-delay-3">
            <p className="char-card-num">SYS — ∞</p>
            <h3 className="char-card-title">Hundreds More</h3>
            <p className="char-card-body">A growing collection of meticulously refined behavioral systems designed for every imaginable use case.</p>
          </div>
        </div>
      </section>

      <div className="sep"></div>

      {/* ARCHITECTURE */}
      <section id="architecture">
        <p className="eyebrow reveal">07 — TECHNICAL ARCHITECTURE</p>
        <h2 className="arch-h2 reveal reveal-delay-1">Designed Like <em>Infrastructure</em></h2>
        <div className="arch-grid">
          <div className="arch-copy reveal reveal-delay-2">
            <p>Acapulco behaviors are modular, composable, and programmable.</p>
            <p>Each behavioral system is a precision-engineered layer — not a prompt, not a persona, but a full-spectrum behavioral substrate.</p>
            <p>These systems can be layered, combined, and customized to create assistants that behave exactly as intended, across thousands of interactions.</p>
          </div>
          <ul className="arch-list reveal reveal-delay-3">
            <li>Conversational frameworks</li>
            <li>Memory heuristics</li>
            <li>Response pacing logic</li>
            <li>Initiative models</li>
            <li>Emotional calibration systems</li>
            <li>Communication patterns</li>
            <li>Platform adaptations</li>
            <li>Decision-making principles</li>
            <li>Formatting rules</li>
            <li>Escalation logic</li>
          </ul>
        </div>
      </section>

      <div className="sep"></div>

      {/* VISION */}
      <section id="vision">
        <p className="eyebrow reveal">08 — THE NEXT FRONTIER</p>
        <h2 className="vision-h2 reveal reveal-delay-1">
          The next generation of AI products<br/>
          will not win because they are<br/>
          <em>marginally smarter.</em>
        </h2>
        <div className="vision-copy reveal reveal-delay-2">
          <p>They will win because they communicate better. Because they understand context more naturally. Because they build trust more effectively.</p>
          <p>Because they adapt. Because they feel intentional.</p>
          <p>Acapulco is building the infrastructure layer that makes those experiences possible.</p>
          <p>A future where behavior is programmable. Where personality is composable. Where every assistant can be crafted with the same level of care that great companies devote to products, brands, and human connection.</p>
        </div>
      </section>

      <div className="sep"></div>

      {/* FOOTER / LET'S COLLABORATE */}
      <footer id="contact">
        <div className="cta-block" id="cta-block" onClick={() => { const modal = document.getElementById('email-modal'); if (modal) modal.classList.add('open'); }}>
          <div className="cta-curtain"></div>
          <div className="cta-inner">
            <h2 className="cta-h2">Let's <em>Collaborate</em></h2>
            <span className="cta-arrow">↗</span>
          </div>
        </div>

        <div className="footer-bar">
          <div className="footer-time">
            LOCAL TIME <span id="footer-clock">--:--:--.---</span>
          </div>
          <div className="footer-links">
            <a href="mailto:ariareplyai@gmail.com">EMAIL</a>
            <a href="https://ariareply.com" target="_blank" rel="noopener noreferrer">ARIAREPLY</a>
          </div>
          <span className="footer-loc">NYC | CDMX</span>
          <p className="footer-copy">© <span id="footer-year"></span> ACAPULCO</p>
        </div>
      </footer>

      {/* Email Modal */}
      <div className="email-modal-overlay" id="email-modal">
        <div className="email-modal">
          <h3>Let's Collaborate</h3>
          <p>Get in touch with the team at AriaReply. We'll respond within 24 hours.</p>
          <input type="text" placeholder="YOUR NAME" id="modal-name" />
          <input type="email" placeholder="YOUR EMAIL" id="modal-email" />
          <textarea placeholder="TELL US ABOUT YOUR PROJECT" id="modal-msg"></textarea>
          <div className="modal-actions">
            <button className="btn-send" onClick={() => { alert('Message sent!'); document.getElementById('email-modal')?.classList.remove('open'); }}>SEND MESSAGE</button>
            <button className="btn-cancel" onClick={() => { document.getElementById('email-modal')?.classList.remove('open'); }}>CANCEL</button>
          </div>
        </div>
      </div>

      <script>{`
        // ─── CURSOR ───
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        function animCursor() {
          rx += (mx - rx) * 0.12;
          ry += (my - ry) * 0.12;
          dot.style.left = mx + 'px'; dot.style.top = my + 'px';
          ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
          requestAnimationFrame(animCursor);
        }
        animCursor();
        document.querySelectorAll('a,button,.char-card,.system-item,.arch-list li').forEach(el => {
          el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
          el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        // ─── NAVBAR SCROLL ───
        window.addEventListener('scroll', () => {
          document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
        });

        // ─── REVEAL ON SCROLL ───
        const revealEls = document.querySelectorAll('.reveal');
        const io = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.12 });
        revealEls.forEach(el => io.observe(el));

        // ─── GRADUAL BLUR ───
        (function buildBlur() {
          const container = document.getElementById('hero-blur');
          const n = 8;
          for (let i = 1; i <= n; i++) {
            const p = i / n;
            const blurVal = Math.pow(2, p * 3.5) * 0.05;
            const p1 = Math.round(((i-1)/n)*100*10)/10;
            const p2 = Math.round((i/n)*100*10)/10;
            const p3 = Math.min(100, Math.round(((i+1)/n)*100*10)/10);
            const div = document.createElement('div');
            div.style.cssText = \`
              position:absolute;inset:0;
              mask-image:linear-gradient(to bottom,transparent \${p1}%,black \${p2}%,black \${p3}%,transparent 100%);
              -webkit-mask-image:linear-gradient(to bottom,transparent \${p1}%,black \${p2}%,black \${p3}%,transparent 100%);
              backdrop-filter:blur(\${blurVal.toFixed(3)}rem);
              -webkit-backdrop-filter:blur(\${blurVal.toFixed(3)}rem);
              pointer-events:none;
            \`;
            container.appendChild(div);
          }
        })();

        // ─── FOOTER CLOCK ───
        function updateClock() {
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = String(now.getSeconds()).padStart(2, '0');
          const ms = String(now.getMilliseconds()).padStart(3, '0');
          document.getElementById('footer-clock').textContent = \`\${hours}:\${minutes}:\${seconds}.\${ms}\`;
        }
        updateClock();
        setInterval(updateClock, 50);

        // ─── FOOTER YEAR ───
        document.getElementById('footer-year').textContent = new Date().getFullYear();
      `}</script>
    </>
  );
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
}
