import { useEffect, useRef, useState } from "react";

// ── inject keyframes ──
const CSS = `
  .feature-card-animated {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s ease, transform 0.55s ease,
                box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .feature-card-animated.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .feature-card-animated:not(.featured-card):hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 20px 60px rgba(10,61,31,0.1);
    border-color: rgba(40,167,85,0.25) !important;
  }
  .feature-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg,#1e7a40,#4eca78);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
    border-radius: 20px 20px 0 0;
  }
  .feature-card-animated:not(.featured-card):hover .feature-bar {
    transform: scaleX(1);
  }
  .featured-card {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .featured-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .check-bounce {
    transition: transform 0.2s ease;
  }
  .feature-list-item:hover .check-bounce {
    transform: scale(1.2);
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
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

// ── data ──
const FEATURES = [
  {
    icon: "📋",
    num: "FEATURE 01",
    title: "Smart Attendance",
    desc: "QR code-based attendance with instant SMS to parents when a student is absent. Monthly analytics included.",
    featured: false,
  },
  {
    icon: "🤖",
    num: "FEATURE 02",
    title: "AI Performance Analyzer",
    desc: "The brain of EduCore OS. Continuously monitors marks, attendance, and behavior to predict at-risk students weeks before they fail.",
    featured: true,
    list: [
      "Predicts failure risk weeks in advance",
      "Identifies weak subjects per student",
      "Auto-generates improvement plans",
      "Sends early warning alerts to teachers",
      "Visual class performance rankings",
    ],
  },
  {
    icon: "💰",
    num: "FEATURE 03",
    title: "Fee Management",
    desc: "Online payments, auto late fines, digital receipts and installment tracking. Defaulter list auto-generated.",
    featured: false,
  },
  {
    icon: "📱",
    num: "FEATURE 04",
    title: "Parent Mobile App",
    desc: "Parents can check attendance, pay fees, view results, message teachers and track the school van — all in one app.",
    featured: false,
  },
  {
    icon: "📚",
    num: "FEATURE 05",
    title: "Homework Tracker",
    desc: "Teachers upload assignments, students submit online. Late submissions tracked automatically with MCQ auto-grading.",
    featured: false,
  },
  {
    icon: "🗓️",
    num: "FEATURE 06",
    title: "Smart Timetable",
    desc: "AI creates clash-free timetables automatically, balancing teacher workload and optimizing classroom allocation.",
    featured: false,
  },
  {
    icon: "🚌",
    num: "FEATURE 08",
    title: "Transport Tracking",
    desc: "Live GPS tracking of school vans. Parents see live map and get pickup/drop alerts on their phone.",
    featured: false,
  },
  {
    icon: "🧠",
    num: "FEATURE 09",
    title: "Mental Health Monitor",
    desc: "Weekly mood check-ins. AI detects stress patterns and alerts the school counselor before a crisis develops.",
    featured: false,
  },
  {
    icon: "📊",
    num: "FEATURE 10",
    title: "Principal Dashboard",
    desc: "Real-time command center. Attendance, fees, performance, complaints and teacher metrics — all in one view.",
    featured: false,
  },
];

// ── featured card (spans 2 rows) ──
function FeaturedCard({ feature, delay }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`featured-card row-span-2 rounded-[20px] p-8
        bg-[#0a3d1f] border-transparent border
        ${visible ? "visible" : ""}`}
    >
      {/* Icon */}
      <div
        className="w-[52px] h-[52px] rounded-2xl flex items-center
          justify-center text-2xl mb-5 flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
        {feature.icon}
      </div>

      {/* Num */}
      <div className="text-[12px] font-bold tracking-[0.08em] text-[#a3f0bc] mb-2">
        {feature.num}
      </div>

      {/* Title */}
      <h3
        className="font-bold text-[20px] text-white mb-2.5 leading-[1.2]"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {feature.title}
      </h3>

      {/* Desc */}
      <p className="text-[14px] leading-[1.6] text-white/55">
        {feature.desc}
      </p>

      {/* List */}
      {feature.list && (
        <ul className="mt-5 flex flex-col gap-2 list-none">
          {feature.list.map((item, i) => (
            <li
              key={i}
              className="feature-list-item flex items-center gap-2.5
                text-[13px] text-white/70 cursor-default"
            >
              <div
                className="check-bounce w-[18px] h-[18px] rounded-full flex-shrink-0
                  flex items-center justify-center text-[10px] text-[#4eca78]"
                style={{ background: "rgba(78,202,120,0.2)" }}
              >
                ✓
              </div>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── regular card ──
function FeatureCard({ feature, delay }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`feature-card-animated rounded-[20px] p-8 bg-white
        border border-[rgba(40,167,85,0.1)] relative overflow-hidden
        cursor-default
        ${visible ? "visible" : ""}`}
    >
      <div className="feature-bar" />

      {/* Icon */}
      <div
        className="w-[52px] h-[52px] rounded-2xl flex items-center
          justify-center text-2xl mb-5 bg-[#f3fdf6] flex-shrink-0"
      >
        {feature.icon}
      </div>

      {/* Num */}
      <div className="text-[12px] font-bold tracking-[0.08em] text-[#4eca78] mb-2">
        {feature.num}
      </div>

      {/* Title */}
      <h3
        className="font-bold text-[20px] text-[#0a3d1f] mb-2.5 leading-[1.2]"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {feature.title}
      </h3>

      {/* Desc */}
      <p className="text-[14px] leading-[1.6] text-[#6b9e7e]">
        {feature.desc}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
export default function Features() {
  useInjectStyles("features-styles", CSS);

  const [headRef, headVisible] = useReveal(0);

  // split featured from regular
  const featured = FEATURES.find((f) => f.featured);
  const regular  = FEATURES.filter((f) => !f.featured);

  return (
    <section
      id="features"
      className="px-6 md:px-16 py-[100px] bg-[#f7fdf9]"
    >
      {/* ── HEADER ── */}
      <div ref={headRef} className="max-w-[600px] mb-16">
        <div
          className={`text-[12px] font-bold tracking-[0.12em] uppercase
            text-[#1e7a40] mb-4 transition-all duration-600
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          Features
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
          Everything your school
          <br />
          needs in one place
        </h2>
        <p
          className={`text-[17px] leading-[1.7] text-[#2d5a3d]
            transition-all duration-700 delay-200
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          10 powerful modules working together seamlessly — built for
          Pakistani schools, powered by AI.
        </p>
      </div>

      {/* ── GRID ── */}
      {/*
        Layout:
        Col 1        | Col 2              | Col 3
        Card 01      | Featured (row 1–2) | Card 03
        Card 04      |                    | Card 05
        Card 06      | Card 08            | Card 09
        Card 10      |                    |
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Card 01 — Smart Attendance */}
        <FeatureCard feature={regular[0]} delay={100} />

        {/* Featured — AI Analyzer (spans 2 rows on desktop) */}
        <div className="lg:row-span-2">
          <FeaturedCard feature={featured} delay={150} />
        </div>

        {/* Card 03 — Fee Management */}
        <FeatureCard feature={regular[1]} delay={200} />

        {/* Card 04 — Parent App */}
        <FeatureCard feature={regular[2]} delay={250} />

        {/* Card 05 — Homework */}
        <FeatureCard feature={regular[3]} delay={300} />

        {/* Card 06 — Timetable */}
        <FeatureCard feature={regular[4]} delay={350} />

        {/* Card 08 — Transport */}
        <FeatureCard feature={regular[5]} delay={400} />

        {/* Card 09 — Mental Health */}
        <FeatureCard feature={regular[6]} delay={450} />

        {/* Card 10 — Dashboard */}
        <FeatureCard feature={regular[7]} delay={500} />

      </div>
    </section>
  );
}