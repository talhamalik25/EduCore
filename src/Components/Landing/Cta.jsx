import { useEffect, useRef, useState } from "react";

// ── inject keyframes ──
const CSS = `
  @keyframes ctaFadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes ctaGlowPulse {
    0%,100% { opacity: 0.5; transform: scale(1);    }
    50%     { opacity: 1;   transform: scale(1.05); }
  }
  @keyframes ctaFloatDot {
    0%,100% { transform: translateY(0px)  rotate(0deg);   }
    33%     { transform: translateY(-12px) rotate(120deg); }
    66%     { transform: translateY(6px)  rotate(240deg); }
  }
  @keyframes ctaBtnShine {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes ctaArrowBounce {
    0%,100% { transform: translateX(0);  }
    50%     { transform: translateX(5px); }
  }
  @keyframes ctaRingExpand {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0;   }
  }

  .cta-eyebrow  { animation: ctaFadeUp 0.6s 0.1s ease both; }
  .cta-heading  { animation: ctaFadeUp 0.7s 0.25s ease both; }
  .cta-desc     { animation: ctaFadeUp 0.7s 0.4s ease both; }
  .cta-buttons  { animation: ctaFadeUp 0.7s 0.55s ease both; }
  .cta-features { animation: ctaFadeUp 0.7s 0.7s ease both; }

  .cta-glow-orb {
    animation: ctaGlowPulse 4s ease-in-out infinite;
  }
  .cta-float-dot {
    animation: ctaFloatDot 6s ease-in-out infinite;
  }
  .cta-float-dot:nth-child(2) { animation-delay: -2s; }
  .cta-float-dot:nth-child(3) { animation-delay: -4s; }

  .cta-btn-primary {
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .cta-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(255,255,255,0.25) !important;
  }
  .cta-btn-primary:hover .cta-arrow {
    animation: ctaArrowBounce 0.6s ease infinite;
  }
  .cta-btn-outline {
    transition: all 0.2s ease;
  }
  .cta-btn-outline:hover {
    border-color: rgba(255,255,255,0.6) !important;
    background: rgba(255,255,255,0.06) !important;
    transform: translateY(-2px);
  }

  .cta-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(78,202,120,0.3);
    animation: ctaRingExpand 3s ease-out infinite;
    pointer-events: none;
  }
  .cta-ring:nth-child(2) { animation-delay: 1s;   }
  .cta-ring:nth-child(3) { animation-delay: 2s;   }

  .cta-feature-pill {
    transition: background 0.2s ease, transform 0.2s ease;
  }
  .cta-feature-pill:hover {
    background: rgba(255,255,255,0.12) !important;
    transform: translateY(-2px);
  }

  .cta-section-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .cta-section-reveal.visible {
    opacity: 1;
    transform: translateY(0);
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
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

// ── features list ──
const FEATURES = [
  { icon: "✓", text: "3-month free trial" },
  { icon: "✓", text: "No credit card required" },
  { icon: "✓", text: "Free data migration" },
  { icon: "✓", text: "Setup in 10 minutes" },
  { icon: "✓", text: "24/7 support" },
];

// ─────────────────────────────────────────────
export default function CTA() {
  useInjectStyles("cta-styles", CSS);
  const [ref, visible] = useReveal(0);

  return (
    <section
      ref={ref}
      id="cta"
      className={`cta-section-reveal px-6 md:px-16 py-[100px]
        bg-[#0a3d1f] text-center relative overflow-hidden
        ${visible ? "visible" : ""}`}
    >

      {/* ── FLOATING DOTS ── */}
      {[
        { size: 8,  top: "15%", left: "8%",  color: "rgba(78,202,120,0.4)"  },
        { size: 12, top: "70%", left: "5%",  color: "rgba(78,202,120,0.25)" },
        { size: 6,  top: "20%", right: "6%", color: "rgba(78,202,120,0.35)" },
        { size: 10, top: "75%", right: "9%", color: "rgba(78,202,120,0.2)"  },
        { size: 5,  top: "45%", left: "15%", color: "rgba(163,240,188,0.3)" },
        { size: 7,  top: "40%", right: "14%",color: "rgba(163,240,188,0.25)"},
      ].map((d, i) => (
        <div
          key={i}
          className="cta-float-dot absolute rounded-full pointer-events-none"
          style={{
            width: d.size,
            height: d.size,
            top: d.top,
            left: d.left,
            right: d.right,
            background: d.color,
            animationDelay: `${i * -1.1}s`,
          }}
        />
      ))}

      {/* ── GLOW ORBS ── */}
      <div
        className="cta-glow-orb absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(78,202,120,0.15) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(78,202,120,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── RINGS around center ── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[200, 200, 200].map((size, i) => (
          <div
            key={i}
            className="cta-ring"
            style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
          />
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-[640px] mx-auto">

        {/* Eyebrow */}
        <div
          className="cta-eyebrow inline-flex items-center gap-2 px-4 py-1.5
            rounded-full text-[12px] font-bold tracking-[0.1em] uppercase
            text-[#4eca78] mb-6 border border-[rgba(78,202,120,0.25)]"
          style={{ background: "rgba(78,202,120,0.08)" }}
        >
          <span
            className="w-[6px] h-[6px] rounded-full bg-[#4eca78]"
            style={{ animation: "ctaGlowPulse 2s infinite" }}
          />
          Get Started Today
        </div>

        {/* Heading */}
        <h2
          className="cta-heading font-extrabold leading-[1.1] text-white mb-5"
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(36px, 4.5vw, 60px)",
          }}
        >
          Ready to modernize
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#4eca78,#a3f0bc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            your school?
          </span>
        </h2>

        {/* Description */}
        <p className="cta-desc text-[17px] leading-[1.7] text-white/55 max-w-[480px] mx-auto mb-10">
          Join the schools already running on EduCore OS.
          3-month free trial, full setup support included.
          No technical knowledge required.
        </p>

        {/* Buttons */}
        <div className="cta-buttons flex justify-center gap-4 flex-wrap mb-10">
          {/* Primary */}
          <a
            href="#"
            className="cta-btn-primary bg-white text-[#0a3d1f]
              px-9 py-4 rounded-full text-[16px] font-bold
              no-underline inline-flex items-center gap-2.5"
            style={{ boxShadow: "0 4px 20px rgba(255,255,255,0.15)" }}
          >
            Start Free Trial
            <span className="cta-arrow inline-block">→</span>
          </a>

          {/* Outline */}
          <a
            href="#"
            className="cta-btn-outline bg-transparent text-white
              px-9 py-4 rounded-full text-[16px] font-semibold
              no-underline inline-flex items-center gap-2.5
              border-2 border-white/25"
          >
            📅 Book a Demo
          </a>
        </div>

        {/* Feature Pills */}
        <div className="cta-features flex flex-wrap justify-center gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.text}
              className="cta-feature-pill inline-flex items-center gap-2
                px-4 py-2 rounded-full text-[13px] font-medium text-white/70
                border border-white/10 cursor-default"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <span className="text-[#4eca78] font-bold text-[11px]">
                {f.icon}
              </span>
              {f.text}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}