import { useEffect, useRef, useState } from "react";

// ── inject keyframes ──
const CSS = `
  @keyframes footerFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes footerLinkHover {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes socialPop {
    0%   { transform: scale(1);    }
    40%  { transform: scale(1.2);  }
    100% { transform: scale(1.05); }
  }
  @keyframes madeInPak {
    0%,100% { transform: rotate(0deg);   }
    25%     { transform: rotate(-10deg); }
    75%     { transform: rotate(10deg);  }
  }

  .footer-col-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .footer-col-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .footer-link {
    position: relative;
    display: inline-block;
    transition: color 0.2s ease;
  }
  .footer-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: #4eca78;
    transition: width 0.25s ease;
  }
  .footer-link:hover::after { width: 100%; }
  .footer-link:hover { color: #4eca78 !important; }

  .social-icon {
    transition: transform 0.2s ease, background 0.2s ease;
  }
  .social-icon:hover {
    background: rgba(78,202,120,0.15) !important;
    transform: translateY(-3px);
  }

  .flag-wave {
    display: inline-block;
    animation: madeInPak 2.5s ease-in-out infinite;
    transform-origin: bottom center;
  }

  .footer-divider-line {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1s ease;
  }
  .footer-divider-line.visible {
    transform: scaleX(1);
  }

  .logo-glow:hover {
    text-shadow: 0 0 20px rgba(78,202,120,0.4);
    transition: text-shadow 0.3s ease;
  }
`;

function useInjectStyles(id, css) {
  useEffect(() => {
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.innerHTML = css;
    document.head.appendChild(tag);
    return () => document.getElementById(id)?.remove();
  }, []);
}

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

// ── data ──
const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { label: "Features",      href: "#features" },
      { label: "How It Works",  href: "#how"      },
      { label: "Pricing",       href: "#pricing"  },
      { label: "Roadmap",       href: "#"         },
    ],
  },
  {
    heading: "Modules",
    links: [
      { label: "Attendance",     href: "#" },
      { label: "Fee Management", href: "#" },
      { label: "Homework",       href: "#" },
      { label: "AI Analyzer",    href: "#" },
      { label: "Parent App",     href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About CoreCraft", href: "#" },
      { label: "Contact Us",      href: "#" },
      { label: "Blog",            href: "#" },
      { label: "Careers",         href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",  href: "#" },
      { label: "Terms of Service",href: "#" },
      { label: "Cookie Policy",   href: "#" },
      { label: "Refund Policy",   href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: "𝕏",  label: "Twitter",   href: "#" },
  { icon: "in", label: "LinkedIn",  href: "#" },
  { icon: "f",  label: "Facebook",  href: "#" },
  { icon: "▶",  label: "YouTube",   href: "#" },
];

// ─────────────────────────────────────────────
export default function Footer() {
  useInjectStyles("footer-styles", CSS);

  const [divRef, divVisible] = useReveal(0);

  return (
    <footer className="bg-[#0a1f12] relative overflow-hidden">

      {/* ── SUBTLE TOP GLOW ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600, height: 200,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(78,202,120,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── TOP SECTION ── */}
      <div className="px-6 md:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">

          {/* Brand col — spans 2 */}
          <BrandCol />

          {/* Link cols */}
          {FOOTER_LINKS.map((col, i) => (
            <LinkCol key={col.heading} col={col} delay={100 + i * 80} />
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="px-6 md:px-16 overflow-hidden" ref={divRef}>
        <div
          className={`footer-divider-line h-px bg-white/[0.07]
            ${divVisible ? "visible" : ""}`}
        />
      </div>

      {/* ── BOTTOM BAR ── */}
      <BottomBar />

    </footer>
  );
}

// ── brand column ──
function BrandCol() {
  const [ref, visible] = useReveal(0);
  return (
    <div
      ref={ref}
      className={`footer-col-reveal lg:col-span-2
        ${visible ? "visible" : ""}`}
    >
      {/* Logo */}
      <a href="#" className="inline-flex items-center gap-2.5 no-underline mb-5 group">
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center
            text-lg group-hover:scale-105 transition-transform duration-200"
          style={{ background: "linear-gradient(135deg,#1e7a40,#4eca78)" }}
        >
          🎓
        </div>
        <span
          className="logo-glow font-extrabold text-[20px] text-white"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          EduCore <span className="text-[#4eca78]">OS</span>
        </span>
      </a>

      {/* Tagline */}
      <p className="text-[14px] leading-[1.7] text-white/40 mb-6 max-w-[220px]">
        The AI-powered operating system for modern schools in Pakistan and South Asia.
      </p>

      {/* Social icons */}
      <div className="flex gap-2 mb-6">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="social-icon w-9 h-9 rounded-xl flex items-center
              justify-center text-[13px] font-bold text-white/50
              no-underline border border-white/[0.08]"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Pakistan badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
          text-[12px] font-semibold text-white/50
          border border-white/[0.07]"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <span className="flag-wave">🇵🇰</span>
        Built with ❤️ in Pakistan
      </div>
    </div>
  );
}

// ── link column ──
function LinkCol({ col, delay }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`footer-col-reveal ${visible ? "visible" : ""}`}
    >
      <div
        className="text-[12px] font-bold tracking-[0.1em] uppercase
          text-white/30 mb-5"
      >
        {col.heading}
      </div>
      <ul className="flex flex-col gap-3 list-none">
        {col.links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="footer-link text-[14px] text-white/45 no-underline"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── bottom bar ──
function BottomBar() {
  const [ref, visible] = useReveal(300);
  const year = new Date().getFullYear();
  return (
    <div
      ref={ref}
      className={`footer-col-reveal px-6 md:px-16 py-6
        flex flex-col sm:flex-row items-center
        justify-between gap-4
        ${visible ? "visible" : ""}`}
    >
      {/* Copyright */}
      <div className="text-[13px] text-white/25 text-center sm:text-left">
        © {year} CoreCraft Technologies. All rights reserved.
      </div>

      {/* Middle — version badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full
          text-[11px] font-semibold text-[#4eca78]/60
          border border-[rgba(78,202,120,0.1)]"
        style={{ background: "rgba(78,202,120,0.04)" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#4eca78]"
          style={{ animation: "ctaGlowPulse 2s infinite" }}
        />
        EduCore OS v1.0 — Phase 1
      </div>

      {/* Right links */}
      <div className="flex gap-5">
        {["Privacy", "Terms", "Contact"].map((l) => (
          <a
            key={l}
            href="#"
            className="footer-link text-[13px] text-white/25 no-underline"
          >
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}