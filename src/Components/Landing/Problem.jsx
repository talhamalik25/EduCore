import { useEffect, useRef, useState } from "react";

// ── inject keyframes ──
const CSS = `
  @keyframes fadeUpItem {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeUpHead {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1;   }
  }

  .problems-heading { animation: fadeUpHead 0.7s ease both; }
  .problems-sub     { animation: fadeUpHead 0.7s 0.15s ease both; }
  .problems-desc    { animation: fadeUpHead 0.7s 0.25s ease both; }

  .problem-item-animated {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease,
                background 0.2s ease;
  }
  .problem-item-animated.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .problem-item-animated:hover {
    background: rgba(78,202,120,0.08) !important;
  }

  .glow-orb {
    animation: glowPulse 4s ease-in-out infinite;
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

// ── individual item reveal hook ──
function useItemReveal(delay = 0) {
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

// ── section header reveal ──
function useSectionReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── data ──
const PROBLEMS = [
  {
    icon: "📋",
    title: "Manual Attendance",
    desc: "Paper registers, human errors, no parent alerts",
  },
  {
    icon: "💸",
    title: "Messy Fee Tracking",
    desc: "Fee notebooks and Excel sheets cause revenue loss",
  },
  {
    icon: "📱",
    title: "WhatsApp Chaos",
    desc: "Unstructured communication, missed messages",
  },
  {
    icon: "📉",
    title: "Zero Analytics",
    desc: "No performance data, decisions made blindly",
  },
  {
    icon: "📚",
    title: "No Homework System",
    desc: "Verbal assignments with no tracking or accountability",
  },
  {
    icon: "🗓️",
    title: "Clash Timetables",
    desc: "Manual schedules with teacher conflicts and errors",
  },
  {
    icon: "😟",
    title: "Mental Health Blind Spot",
    desc: "Student stress goes undetected until it's too late",
  },
  {
    icon: "🚌",
    title: "No Transport Tracking",
    desc: "Parents have no idea where the school van is",
  },
];

// ── single problem card ──
function ProblemCard({ icon, title, desc, delay }) {
  const [ref, visible] = useItemReveal(delay);
  return (
    <div
      ref={ref}
      className={`problem-item-animated p-7 border border-white/[0.04]
        cursor-default
        ${visible ? "visible" : ""}`}
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <span className="text-[28px] mb-3 block">{icon}</span>
      <div className="font-bold text-[15px] text-white mb-1.5">{title}</div>
      <div className="text-[13px] text-white/45 leading-[1.6]">{desc}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
function Problems() {
  useInjectStyles("problems-styles", CSS);
  const [headRef, headVisible] = useSectionReveal();

  return (
    <section
      id="problems"
      className="px-6 md:px-16 py-[100px] bg-[#0a3d1f] relative overflow-hidden"
    >
      {/* ── BG GLOW ── */}
      <div
        className="glow-orb absolute top-0 right-0 w-[500px] h-[500px]
          rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 100% 50%, rgba(78,202,120,0.1) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px]
          rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(78,202,120,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── HEADER ── */}
      <div
        ref={headRef}
        className="max-w-[640px] mb-14"
      >
        {/* Eyebrow */}
        <div
          className={`text-[12px] font-bold tracking-[0.12em] uppercase
            text-[#4eca78] mb-4 transition-all duration-700
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          The Problem
        </div>

        {/* Title */}
        <h2
          className={`font-extrabold leading-[1.1] text-white mb-5
            transition-all duration-700 delay-100
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(36px, 4vw, 56px)",
          }}
        >
          Schools are stuck
          <br />
          in the stone age
        </h2>

        {/* Desc */}
        <p
          className={`text-[17px] leading-[1.7] text-white/60
            transition-all duration-700 delay-200
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          Most schools in Pakistan still rely on paper, WhatsApp, and Excel.
          EduCore OS replaces all of it.
        </p>
      </div>

      {/* ── PROBLEMS GRID ── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-[2px] bg-white/[0.06] rounded-[20px] overflow-hidden"
      >
        {PROBLEMS.map((p, i) => (
          <ProblemCard
            key={p.title}
            icon={p.icon}
            title={p.title}
            desc={p.desc}
            delay={i * 80}
          />
        ))}
      </div>

      {/* ── BOTTOM STRIP ── */}
      <div
        className={`mt-14 flex flex-wrap items-center justify-between gap-6
          pt-8 border-t border-white/[0.08]
          transition-all duration-700 delay-700
          ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        <p className="text-white/40 text-[14px] max-w-[420px] leading-relaxed">
          Every one of these problems costs schools time, money, and student outcomes.
          EduCore OS solves all 8 in a single platform.
        </p>
        <a
          href="#features"
          className="inline-flex items-center gap-2 text-[#4eca78] font-semibold
            text-[15px] no-underline group"
        >
          See how we fix it
          <span
            className="inline-block transition-transform duration-200
              group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>

    </section>
  );
}

export default Problems;