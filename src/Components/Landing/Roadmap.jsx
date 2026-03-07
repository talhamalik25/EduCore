import { useEffect, useRef, useState } from "react";

// ── inject keyframes ──
const CSS = `
  @keyframes roadmapFadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes phaseLineDraw {
    from { height: 0; }
    to   { height: 100%; }
  }
  @keyframes phaseDotPop {
    0%  { opacity: 0; transform: scale(0); }
    70% { transform: scale(1.3); }
    100%{ opacity: 1; transform: scale(1); }
  }
  @keyframes phasePulseRing {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(2.4); opacity: 0;   }
  }
  @keyframes featureTagSlide {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes shimmerBadge {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes cardGlow {
    0%,100% { box-shadow: 0 4px 24px rgba(10,61,31,0.06); }
    50%     { box-shadow: 0 8px 40px rgba(30,122,64,0.15); }
  }

  /* ── vertical timeline line ── */
  .phase-line-fill {
    height: 0;
    transition: height 1s ease;
  }
  .phase-line-fill.visible {
    height: 100%;
  }

  /* ── dot ── */
  .phase-dot {
    opacity: 0;
    transform: scale(0);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .phase-dot.visible {
    opacity: 1;
    transform: scale(1);
  }

  /* ── pulse ring ── */
  .phase-dot-ring {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px solid rgba(78,202,120,0.4);
    animation: phasePulseRing 2.5s ease-out infinite;
  }
  .phase-dot-ring-2 {
    animation-delay: 0.8s;
  }

  /* ── card ── */
  .phase-card {
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.6s ease, transform 0.6s ease,
                box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .phase-card.from-right {
    transform: translateX(20px);
  }
  .phase-card.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .phase-card:hover {
    box-shadow: 0 12px 48px rgba(10,61,31,0.1) !important;
    border-color: rgba(40,167,85,0.3) !important;
  }
  .phase-card.active-phase {
    animation: cardGlow 3s ease-in-out infinite;
  }

  /* ── feature tags ── */
  .feature-tag {
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .feature-tag.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .feature-tag:hover {
    transform: translateY(-2px) !important;
    transition: transform 0.2s ease;
  }

  /* ── status badge ── */
  .status-live {
    background: linear-gradient(90deg,#22c55e,#4eca78,#22c55e);
    background-size: 200% auto;
    animation: shimmerBadge 2s linear infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .phase-number-big {
    font-size: clamp(80px, 10vw, 120px);
    font-weight: 800;
    line-height: 1;
    position: absolute;
    right: 24px;
    top: 16px;
    opacity: 0.04;
    user-select: none;
    pointer-events: none;
    font-family: 'Syne', sans-serif;
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
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

// ── roadmap data ──
const PHASES = [
  {
    phase: "01",
    title: "Foundation",
    timeline: "Months 1–4",
    status: "building",
    statusLabel: "🔨 Building Now",
    tagColor: "#22c55e",
    tagBg: "rgba(34,197,94,0.1)",
    accent: "#1e7a40",
    accentLight: "rgba(30,122,64,0.08)",
    desc: "The core of EduCore OS. Getting schools off paper and onto a single digital platform from day one.",
    features: [
      { icon: "📋", label: "Smart Attendance" },
      { icon: "💰", label: "Fee Management" },
      { icon: "📲", label: "Parent SMS Alerts" },
      { icon: "👤", label: "Student Management" },
      { icon: "📊", label: "Basic Reports" },
      { icon: "🔐", label: "Role-Based Access" },
    ],
  },
  {
    phase: "02",
    title: "Collaboration",
    timeline: "Months 5–8",
    status: "planned",
    statusLabel: "📅 Coming Soon",
    tagColor: "#3b82f6",
    tagBg: "rgba(59,130,246,0.1)",
    accent: "#1d4ed8",
    accentLight: "rgba(29,78,216,0.06)",
    desc: "Connecting teachers, students and parents through structured digital workflows.",
    features: [
      { icon: "📚", label: "Homework Tracker" },
      { icon: "✅", label: "Online Submissions" },
      { icon: "🗓️", label: "Smart Timetable" },
      { icon: "📝", label: "Result Management" },
      { icon: "💬", label: "Teacher–Parent Chat" },
      { icon: "🔔", label: "Push Notifications" },
    ],
  },
  {
    phase: "03",
    title: "Intelligence",
    timeline: "Months 9–14",
    status: "planned",
    statusLabel: "🤖 AI Phase",
    tagColor: "#8b5cf6",
    tagBg: "rgba(139,92,246,0.1)",
    accent: "#7c3aed",
    accentLight: "rgba(124,58,237,0.06)",
    desc: "AI takes over the heavy lifting — predicting problems before they happen.",
    features: [
      { icon: "🤖", label: "AI Performance Analyzer" },
      { icon: "⚠️", label: "At-Risk Student Alerts" },
      { icon: "📈", label: "Principal Analytics" },
      { icon: "🧠", label: "Mental Health Monitor" },
      { icon: "🎯", label: "Subject-wise Predictions" },
      { icon: "📋", label: "Auto Improvement Plans" },
    ],
  },
  {
    phase: "04",
    title: "Mobility",
    timeline: "Months 15–18",
    status: "planned",
    statusLabel: "📱 Mobile Phase",
    tagColor: "#f59e0b",
    tagBg: "rgba(245,158,11,0.1)",
    accent: "#d97706",
    accentLight: "rgba(217,119,6,0.06)",
    desc: "A full native app experience for parents — real-time visibility of everything.",
    features: [
      { icon: "📱", label: "Parent Mobile App" },
      { icon: "🚌", label: "GPS Transport Tracking" },
      { icon: "🗺️", label: "Live Van Location Map" },
      { icon: "🔔", label: "Pickup/Drop Alerts" },
      { icon: "💳", label: "In-App Fee Payments" },
      { icon: "📸", label: "Photo Attendance Log" },
    ],
  },
  {
    phase: "05",
    title: "Ecosystem",
    timeline: "Months 19–24",
    status: "vision",
    statusLabel: "🔭 Vision",
    tagColor: "#ec4899",
    tagBg: "rgba(236,72,153,0.1)",
    accent: "#db2777",
    accentLight: "rgba(219,39,119,0.06)",
    desc: "EduCore becomes a full ecosystem — open to third-party developers and nationwide scale.",
    features: [
      { icon: "👁️", label: "Face Recognition Entry" },
      { icon: "🔌", label: "Public API Access" },
      { icon: "🛍️", label: "App Marketplace" },
      { icon: "🏫", label: "Multi-Branch Support" },
      { icon: "🌐", label: "International Rollout" },
      { icon: "📊", label: "Ministry-Level Reports" },
    ],
  },
];

// ── feature tag ──
function FeatureTag({ feat, delay, accent, accentLight }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`feature-tag flex items-center gap-1.5 px-3 py-1.5
        rounded-xl text-[12px] font-medium border cursor-default
        ${visible ? "visible" : ""}`}
      style={{
        background: accentLight,
        borderColor: `${accent}22`,
        color: accent,
      }}
    >
      <span className="text-[13px]">{feat.icon}</span>
      {feat.label}
    </div>
  );
}

// ── single phase row ──
function PhaseRow({ phase, index }) {
  const isEven = index % 2 === 0;

  const [dotRef, dotVisible]   = useReveal(index * 120);
  const [cardRef, cardVisible] = useReveal(index * 120 + 100);
  const [lineRef, lineVisible] = useReveal(index * 120 + 200);

  const isActive = phase.status === "building";

  return (
    <div className="grid grid-cols-[1fr_64px_1fr] gap-0 items-start">

      {/* ── LEFT SIDE ── */}
      <div className={`py-4 ${isEven ? "pr-8" : ""}`}>
        {isEven && (
          <PhaseCard
            phase={phase}
            cardRef={cardRef}
            cardVisible={cardVisible}
            isActive={isActive}
            fromRight={false}
          />
        )}
      </div>

      {/* ── CENTER TIMELINE ── */}
      <div className="flex flex-col items-center relative">

        {/* Line above dot */}
        {index > 0 && (
          <div className="w-[2px] flex-1 min-h-[24px] relative overflow-hidden"
            style={{ background: "rgba(40,167,85,0.1)" }}>
            <div
              ref={lineRef}
              className={`phase-line-fill w-full absolute top-0
                ${lineVisible ? "visible" : ""}`}
              style={{ background: `linear-gradient(180deg,${phase.accent},${phase.accent}88)` }}
            />
          </div>
        )}

        {/* Dot */}
        <div
          ref={dotRef}
          className={`phase-dot relative z-10 w-[48px] h-[48px] rounded-full
            flex items-center justify-center flex-shrink-0
            font-extrabold text-[13px] text-white
            ${dotVisible ? "visible" : ""}
            ${isActive ? "" : ""}`}
          style={{
            background: `linear-gradient(135deg,${phase.accent},${phase.accent}bb)`,
            boxShadow: `0 0 0 6px ${phase.accentLight}, 0 4px 20px ${phase.accent}40`,
            fontFamily: "Syne, sans-serif",
          }}
        >
          {isActive && (
            <>
              <div className="phase-dot-ring" style={{ borderColor: `${phase.accent}55` }} />
              <div className="phase-dot-ring phase-dot-ring-2" style={{ borderColor: `${phase.accent}33` }} />
            </>
          )}
          {phase.phase}
        </div>

        {/* Line below dot */}
        {index < PHASES.length - 1 && (
          <div className="w-[2px] flex-1 min-h-[48px]"
            style={{ background: "rgba(40,167,85,0.08)" }}
          />
        )}
      </div>

      {/* ── RIGHT SIDE ── */}
      <div className={`py-4 ${!isEven ? "pl-8" : ""}`}>
        {!isEven && (
          <PhaseCard
            phase={phase}
            cardRef={cardRef}
            cardVisible={cardVisible}
            isActive={isActive}
            fromRight={true}
          />
        )}
      </div>

    </div>
  );
}

// ── phase card ──
function PhaseCard({ phase, cardRef, cardVisible, isActive, fromRight }) {
  return (
    <div
      ref={cardRef}
      className={`phase-card relative overflow-hidden rounded-2xl p-6
        border bg-white
        ${fromRight ? "from-right" : ""}
        ${isActive ? "active-phase" : ""}
        ${cardVisible ? "visible" : ""}`}
      style={{
        borderColor: `${phase.accent}1a`,
        boxShadow: isActive
          ? `0 8px 40px ${phase.accent}22`
          : "0 4px 24px rgba(10,61,31,0.06)",
      }}
    >
      {/* Big phase number watermark */}
      <div
        className="phase-number-big"
        style={{ color: phase.accent }}
      >
        {phase.phase}
      </div>

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
        <div>
          {/* Timeline */}
          <div className="text-[11px] font-semibold text-[#6b9e7e] mb-1.5 tracking-wide uppercase">
            {phase.timeline}
          </div>
          {/* Title */}
          <h3
            className="font-extrabold text-[22px] text-[#0a3d1f] leading-none"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {phase.title}
          </h3>
        </div>

        {/* Status badge */}
        <div
          className="flex-shrink-0 px-3 py-1.5 rounded-full text-[12px]
            font-bold border whitespace-nowrap"
          style={{
            background: phase.tagBg,
            borderColor: `${phase.tagColor}30`,
            color: isActive ? undefined : phase.tagColor,
          }}
        >
          {isActive ? (
            <span className="status-live">{phase.statusLabel}</span>
          ) : (
            phase.statusLabel
          )}
        </div>
      </div>

      {/* Desc */}
      <p className="text-[13px] leading-[1.7] text-[#6b9e7e] mb-4 relative z-10">
        {phase.desc}
      </p>

      {/* Feature tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {phase.features.map((feat, i) => (
          <FeatureTag
            key={feat.label}
            feat={feat}
            delay={i * 60}
            accent={phase.accent}
            accentLight={phase.accentLight}
          />
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl"
        style={{
          background: `linear-gradient(90deg, ${phase.accent}, ${phase.accent}44)`,
          opacity: isActive ? 1 : 0.4,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
export default function Roadmap() {
  useInjectStyles("roadmap-styles", CSS);

  const [headRef, headVisible] = useReveal(0);

  return (
    <section
      id="roadmap"
      className="px-6 md:px-16 py-[100px] bg-[#f7fdf9] relative overflow-hidden"
    >

      {/* ── BG ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, #1e7a40 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 100% 0%, rgba(78,202,120,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── HEADER ── */}
      <div ref={headRef} className="max-w-[640px] mb-20">
        <div
          className={`text-[12px] font-bold tracking-[0.12em] uppercase
            text-[#1e7a40] mb-4 transition-all duration-600
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          Product Roadmap
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
          Built in phases.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#1e7a40,#4eca78)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Growing with your school.
          </span>
        </h2>
        <p
          className={`text-[17px] leading-[1.7] text-[#2d5a3d]
            transition-all duration-700 delay-200
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          We're building EduCore OS in 5 phases over 24 months — starting with
          the essentials and growing into a full AI-powered school ecosystem.
          Every school that joins now gets every future phase included.
        </p>
      </div>

      {/* ── TIMELINE ── */}
      <div className="max-w-[900px] mx-auto">

        {/* Mobile: single column */}
        <div className="flex flex-col gap-6 md:hidden">
          {PHASES.map((phase, i) => (
            <MobilePhaseCard key={phase.phase} phase={phase} index={i} />
          ))}
        </div>

        {/* Desktop: alternating timeline */}
        <div className="hidden md:block">
          {PHASES.map((phase, i) => (
            <PhaseRow key={phase.phase} phase={phase} index={i} />
          ))}
        </div>

      </div>

      {/* ── BOTTOM NOTE ── */}
      <BottomNote />

    </section>
  );
}

// ── mobile card (simplified) ──
function MobilePhaseCard({ phase, index }) {
  const [ref, visible] = useReveal(index * 100);
  const isActive = phase.status === "building";
  return (
    <div
      ref={ref}
      className={`phase-card relative overflow-hidden rounded-2xl p-5
        border bg-white
        ${isActive ? "active-phase" : ""}
        ${visible ? "visible" : ""}`}
      style={{
        borderColor: `${phase.accent}1a`,
        boxShadow: "0 4px 20px rgba(10,61,31,0.06)",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center
            font-extrabold text-[13px] text-white flex-shrink-0"
          style={{
            background: `linear-gradient(135deg,${phase.accent},${phase.accent}bb)`,
            fontFamily: "Syne, sans-serif",
          }}
        >
          {phase.phase}
        </div>
        <div>
          <div className="text-[10px] font-semibold text-[#6b9e7e] uppercase tracking-wide">
            {phase.timeline}
          </div>
          <div className="font-extrabold text-[18px] text-[#0a3d1f]"
            style={{ fontFamily: "Syne, sans-serif" }}>
            {phase.title}
          </div>
        </div>
        <div
          className="ml-auto px-2.5 py-1 rounded-full text-[11px] font-bold border"
          style={{ background: phase.tagBg, borderColor: `${phase.tagColor}30`, color: phase.tagColor }}
        >
          {phase.statusLabel}
        </div>
      </div>
      <p className="text-[13px] leading-[1.6] text-[#6b9e7e] mb-3">{phase.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {phase.features.map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg
              text-[11px] font-medium border"
            style={{ background: phase.accentLight, borderColor: `${phase.accent}22`, color: phase.accent }}
          >
            {f.icon} {f.label}
          </div>
        ))}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl"
        style={{ background: `linear-gradient(90deg,${phase.accent},${phase.accent}44)`, opacity: isActive ? 1 : 0.4 }}
      />
    </div>
  );
}

// ── bottom note ──
function BottomNote() {
  const [ref, visible] = useReveal(400);
  return (
    <div
      ref={ref}
      className={`mt-20 rounded-2xl p-8 flex flex-col md:flex-row
        items-center justify-between gap-6
        border border-[rgba(40,167,85,0.12)]
        transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ background: "linear-gradient(135deg,#f3fdf6,#e8faf0)" }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center
            text-2xl flex-shrink-0"
          style={{ background: "rgba(10,61,31,0.07)" }}
        >
          🎁
        </div>
        <div>
          <div
            className="font-bold text-[17px] text-[#0a3d1f] mb-0.5"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Early adopters get everything — forever
          </div>
          <div className="text-[13px] text-[#6b9e7e]">
            Schools that join now are locked into founding pricing and receive every
            future phase at no extra cost.
          </div>
        </div>
      </div>
      <a
        href="#pricing"
        className="flex-shrink-0 bg-[#0a3d1f] text-white px-7 py-3.5
          rounded-full text-[14px] font-semibold no-underline
          hover:bg-[#145a2e] hover:-translate-y-0.5
          transition-all duration-200 whitespace-nowrap
          shadow-[0_4px_16px_rgba(10,61,31,0.2)]"
      >
        Claim Founding Pricing →
      </a>
    </div>
  );
}