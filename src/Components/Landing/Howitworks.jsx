import { useEffect, useRef, useState } from "react";

// ── inject keyframes ──
const CSS = `
  @keyframes drawLine {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.6); }
    70%  { transform: scale(1.12); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes fadeUpStep {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes ringPulse {
    0%   { box-shadow: 0 0 0 8px #e8faf0;  }
    50%  { box-shadow: 0 0 0 14px #e8faf0; }
    100% { box-shadow: 0 0 0 8px #e8faf0;  }
  }

  .connector-line {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.8s ease;
  }
  .connector-line.visible {
    transform: scaleX(1);
  }

  .step-num-circle {
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 0.5s ease, transform 0.5s ease;
    box-shadow: 0 0 0 8px #e8faf0;
  }
  .step-num-circle.visible {
    opacity: 1;
    transform: scale(1);
    animation: ringPulse 3s 0.5s ease-in-out infinite;
  }
  .step-num-circle:hover {
    transform: scale(1.1) !important;
    box-shadow: 0 0 0 14px #e8faf0 !important;
  }

  .step-content {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .step-content.visible {
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

// ── data ──
const STEPS = [
  {
    num: "1",
    title: "Sign Up Your School",
    desc: "Register your school and choose your plan. Setup takes less than 10 minutes.",
    icon: "🏫",
  },
  {
    num: "2",
    title: "Import Your Data",
    desc: "Upload student and teacher lists. We help migrate everything from Excel or paper records.",
    icon: "📂",
  },
  {
    num: "3",
    title: "Invite Your Team",
    desc: "Add teachers, admin staff and send parent app invitations in one click.",
    icon: "👥",
  },
  {
    num: "4",
    title: "Go Live 🚀",
    desc: "Your school is fully digital. Attendance, fees, communication and AI analytics all active.",
    icon: "✅",
  },
];

// ── single step ──
function Step({ step, index, totalSteps }) {
  const [circleRef, circleVisible] = useReveal(index * 150);
  const [contentRef, contentVisible] = useReveal(index * 150 + 200);

  return (
    <div className="flex flex-col items-center text-center px-4 md:px-6 relative">

      {/* Connector line — shown between steps (not after last) */}
      {index < totalSteps - 1 && (
        <ConnectorLine delay={index * 150 + 300} />
      )}

      {/* Circle */}
      <div
        ref={circleRef}
        className={`step-num-circle relative z-10 w-[72px] h-[72px]
          bg-[#0a3d1f] rounded-full flex items-center justify-center
          font-extrabold text-[22px] text-white mb-6 cursor-default
          ${circleVisible ? "visible" : ""}`}
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {step.num}

        {/* Emoji badge */}
        <div
          className="absolute -top-1 -right-1 w-7 h-7 rounded-full
            bg-white border-2 border-[#e8faf0]
            flex items-center justify-center text-[13px]
            shadow-sm"
        >
          {step.icon}
        </div>
      </div>

      {/* Text */}
      <div
        ref={contentRef}
        className={`step-content ${contentVisible ? "visible" : ""}`}
      >
        <h3
          className="font-bold text-[18px] text-[#0a3d1f] mb-2.5"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {step.title}
        </h3>
        <p className="text-[14px] leading-[1.6] text-[#6b9e7e] max-w-[200px] mx-auto">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

// ── connector line between steps ──
function ConnectorLine({ delay }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className="hidden lg:block absolute top-9 left-[calc(50%+36px)]
        right-0 h-[2px] z-0 overflow-hidden"
      style={{ width: "calc(100% - 36px)" }}
    >
      <div
        className={`connector-line h-full ${visible ? "visible" : ""}`}
        style={{
          background: "linear-gradient(90deg,#1e7a40,#4eca78)",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
export default function HowItWorks() {
  useInjectStyles("how-styles", CSS);

  const [headRef, headVisible] = useReveal(0);

  return (
    <section
      id="how"
      className="px-6 md:px-16 py-[100px] bg-white relative overflow-hidden"
    >

      {/* ── SUBTLE BG PATTERN ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, #1e7a40 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── HEADER ── */}
      <div ref={headRef} className="max-w-[560px] mb-[72px]">
        <div
          className={`text-[12px] font-bold tracking-[0.12em] uppercase
            text-[#1e7a40] mb-4 transition-all duration-600
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          How It Works
        </div>
        <h2
          className={`font-extrabold leading-[1.1] text-[#0a3d1f] mb-5
            transition-all duration-700 delay-100
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(36px, 4vw, 56px)",
          }}
        >
          Up and running
          <br />
          in 4 simple steps
        </h2>
        <p
          className={`text-[17px] leading-[1.7] text-[#2d5a3d]
            transition-all duration-700 delay-200
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          No tech expertise needed. We handle the setup — you focus on
          running your school.
        </p>
      </div>

      {/* ── STEPS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-0 relative">
        {STEPS.map((step, i) => (
          <Step
            key={step.num}
            step={step}
            index={i}
            totalSteps={STEPS.length}
          />
        ))}
      </div>

      {/* ── BOTTOM CARD ── */}
      <BottomCard />

    </section>
  );
}

// ── bottom info card ──
function BottomCard() {
  const [ref, visible] = useReveal(600);
  return (
    <div
      ref={ref}
      className={`mt-20 rounded-2xl p-8 flex flex-col md:flex-row
        items-center justify-between gap-6
        transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        background: "linear-gradient(135deg,#f3fdf6,#e8faf0)",
        border: "1px solid rgba(40,167,85,0.15)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center
            justify-center text-2xl flex-shrink-0"
          style={{ background: "rgba(10,61,31,0.06)" }}
        >
          🎓
        </div>
        <div>
          <div
            className="font-bold text-[17px] text-[#0a3d1f] mb-1"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Free onboarding support included
          </div>
          <div className="text-[14px] text-[#6b9e7e]">
            Our team helps you migrate data and train your staff — at no extra cost.
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-8 flex-shrink-0">
        {[
          ["10 min", "Average setup time"],
          ["3 months", "Free trial included"],
          ["24/7", "Support available"],
        ].map(([val, label]) => (
          <div key={label} className="text-center">
            <div
              className="font-extrabold text-[22px] text-[#1e7a40] leading-none"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {val}
            </div>
            <div className="text-[11px] text-[#6b9e7e] mt-1 whitespace-nowrap">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}