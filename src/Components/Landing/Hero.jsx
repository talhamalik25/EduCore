import { useEffect } from "react";

// ── inject keyframes once into <head> ──
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px) scale(0.97); }
    to   { opacity: 1; transform: translateX(0)    scale(1);    }
  }
  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1);    }
    50%      { opacity: 0.5; transform: scale(0.7); }
  }
  @keyframes floatCard {
    0%, 100% { transform: translateY(0px);  }
    50%      { transform: translateY(-8px); }
  }
  @keyframes barGrow {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  .hero-badge    { animation: fadeUp 0.6s 0.1s ease both; }
  .hero-heading  { animation: fadeUp 0.7s 0.25s ease both; }
  .hero-sub      { animation: fadeUp 0.7s 0.4s ease both; }
  .hero-btns     { animation: fadeUp 0.7s 0.55s ease both; }
  .hero-stats    { animation: fadeUp 0.7s 0.7s ease both; }
  .hero-mockup   { animation: fadeInRight 0.9s 0.5s ease both; }
  .mock-float    { animation: floatCard 4s 1.4s ease-in-out infinite; }
  .pulse-dot     { animation: pulseDot 2s infinite; }

  .bar-animate {
    transform-origin: bottom;
    animation: barGrow 0.8s ease both;
  }
  .bar-animate:nth-child(1) { animation-delay: 1.0s; }
  .bar-animate:nth-child(2) { animation-delay: 1.1s; }
  .bar-animate:nth-child(3) { animation-delay: 1.2s; }
  .bar-animate:nth-child(4) { animation-delay: 1.3s; }
  .bar-animate:nth-child(5) { animation-delay: 1.4s; }
  .bar-animate:nth-child(6) { animation-delay: 1.5s; }

  .student-row { animation: fadeSlideUp 0.5s ease both; }
  .student-row:nth-child(1) { animation-delay: 1.3s;  }
  .student-row:nth-child(2) { animation-delay: 1.45s; }
  .student-row:nth-child(3) { animation-delay: 1.6s;  }

  .stat-card-mock { animation: fadeSlideUp 0.5s ease both; }
  .stat-card-mock:nth-child(1) { animation-delay: 0.8s; }
  .stat-card-mock:nth-child(2) { animation-delay: 0.9s; }
  .stat-card-mock:nth-child(3) { animation-delay: 1.0s; }
  .stat-card-mock:nth-child(4) { animation-delay: 1.1s; }

  /* vertical dividers between stats */
  .hero-stat-item {
    position: relative;
  }
  .hero-stat-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -20px;
    top: 8%;
    height: 84%;
    width: 1px;
    background: rgba(40,167,85,0.2);
  }
`;

function useInjectStyles(css) {
  useEffect(() => {
    const id = "hero-styles";
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.innerHTML = css;
    document.head.appendChild(tag);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
}

// ── data ──
const MOCK_STATS = [
  { label: "Total Students",   val: "847", sub: "↑ 12 this week",     red: false },
  { label: "Attendance Today", val: "94%", sub: "↑ Above average",    red: false },
  { label: "Fee Collected",    val: "87%", sub: "↑ 5% vs last month", red: false },
  { label: "At-Risk Students", val: "3",   sub: "⚠ Needs attention",  red: true  },
];

const MOCK_BARS = [
  { h: "80%", op: 1    },
  { h: "65%", op: 0.75 },
  { h: "90%", op: 0.9  },
  { h: "55%", op: 0.6  },
  { h: "85%", op: 0.85 },
  { h: "75%", op: 0.7  },
];

const MOCK_STUDENTS = [
  { av:"AK", name:"Ahmad Khan",  detail:"Class 9-A · Fee paid",    bg:"#1e7a40", badge:"Present",  bBg:"#dcfce7", bClr:"#15803d" },
  { av:"SR", name:"Sara Raza",   detail:"Class 8-B · Fee pending", bg:"#c2410c", badge:"Absent",   bBg:"#fff7ed", bClr:"#c2410c" },
  { av:"ZM", name:"Zain Malik",  detail:"Class 10-A · All clear",  bg:"#1d4ed8", badge:"On Track", bBg:"#dbeafe", bClr:"#1d4ed8" },
];

// ── exact stats from original landing page ──
const HERO_STATS = [
  { num: "10+", label: "Modules in one platform" },
  { num: "AI",  label: "Powered analytics"       },
  { num: "PKR", label: "Local pricing available" },
];

// ─────────────────────────────────────────────
export default function Hero() {
  useInjectStyles(CSS);

  return (
    <section
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20
        pt-32 pb-24 relative overflow-hidden bg-[#f7fdf9]"
    >
      {/* ── BG GLOWS ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 80% 20%, rgba(78,202,120,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 10% 80%, rgba(20,90,46,0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── GRID PATTERN ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(40,167,85,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(40,167,85,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── LEFT CONTENT ── */}
      <div className="max-w-[640px] relative z-10 w-full">

        {/* Badge */}
        <div
          className="hero-badge inline-flex items-center gap-2 px-4 py-1.5
            rounded-full text-[13px] font-semibold text-[#145a2e] mb-7
            border border-[rgba(0,255,136,0.3)]"
          style={{ background: "rgba(0,255,136,0.15)" }}
        >
          <span className="pulse-dot w-[7px] h-[7px] rounded-full bg-[#28a755] shrink-0" />
          Now available for Pakistan schools
        </div>

        {/* Heading */}
        <h1
          className="hero-heading font-extrabold leading-[1.05] text-[#0a3d1f] mb-6"
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(42px, 6vw, 80px)",
          }}
        >
          The{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#1e7a40,#4eca78)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Operating System
          </span>{" "}
          for Modern Schools
        </h1>

        {/* Sub */}
        <p
          className="hero-sub text-[18px] leading-[1.7] text-[#2d5a3d]
            mb-10 max-w-[560px]"
        >
          Replace paper registers, WhatsApp groups, Excel sheets and manual
          attendance with one AI-powered platform. Built for schools in
          Pakistan and South Asia.
        </p>

        {/* Buttons */}
        <div className="hero-btns flex gap-4 flex-wrap">
          <a
            href="#"
            className="bg-[#0a3d1f] text-white px-8 py-[15px] rounded-full
              text-[16px] font-semibold no-underline
              inline-flex items-center gap-2
              hover:bg-[#145a2e] hover:-translate-y-0.5
              hover:shadow-[0_8px_32px_rgba(10,61,31,0.3)]
              transition-all duration-200"
            style={{ boxShadow: "0 4px 24px rgba(10,61,31,0.2)" }}
          >
            Start Free Trial →
          </a>
          <a
            href="#features"
            className="bg-transparent text-[#0a3d1f] px-8 py-[15px] rounded-full
              text-[16px] font-semibold no-underline
              border-2 border-[rgba(10,61,31,0.2)]
              inline-flex items-center gap-2
              hover:border-[#1e7a40] hover:bg-[#f3fdf6] hover:-translate-y-0.5
              transition-all duration-200"
          >
            Explore Features
          </a>
        </div>

        {/* ── STATS ROW ── */}
        <div
          className="hero-stats flex gap-10 mt-14 pt-10
            border-t border-[rgba(40,167,85,0.15)]"
        >
          {HERO_STATS.map(({ num, label }) => (
            <div key={label} className="hero-stat-item">
              <div
                className="font-extrabold text-[32px] text-[#1e7a40] leading-none"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {num}
              </div>
              <div className="text-[13px] text-[#6b9e7e] mt-1">{label}</div>
            </div>
          ))}
        </div>

      </div>

      {/* ── RIGHT — DASHBOARD MOCKUP ── */}
      <div
        className="hero-mockup absolute right-0 top-1/2 -translate-y-1/2
          w-[46%] p-10 z-10 hidden lg:block"
      >
        <div
          className="mock-float bg-white rounded-3xl overflow-hidden"
          style={{
            boxShadow:
              "0 32px 80px rgba(10,61,31,0.15), 0 0 0 1px rgba(40,167,85,0.1)",
          }}
        >
          {/* Topbar */}
          <div className="bg-[#0a3d1f] px-6 py-4 flex items-center gap-3">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
            <span className="text-white/70 text-[13px] font-medium ml-2">
              EduCore OS — Principal Dashboard
            </span>
          </div>

          {/* Body */}
          <div className="p-6 bg-[#f3fdf6]">

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {MOCK_STATS.map((s) => (
                <div
                  key={s.label}
                  className="stat-card-mock bg-white rounded-2xl p-4
                    border border-[rgba(40,167,85,0.1)]
                    hover:shadow-md hover:-translate-y-0.5
                    transition-all duration-200"
                >
                  <div className="text-[11px] text-[#6b9e7e] mb-1.5">{s.label}</div>
                  <div
                    className="font-bold text-2xl leading-none"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: s.red ? "#e55" : "#0a3d1f",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="text-[11px] mt-0.5 font-medium"
                    style={{ color: s.red ? "#e55" : "#4eca78" }}
                  >
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-2xl p-4 border border-[rgba(40,167,85,0.1)] mb-3">
              <div className="text-[12px] font-semibold text-[#2d5a3d] mb-3">
                📊 Weekly Attendance Trend
              </div>
              <div className="flex items-end gap-2 h-[60px]">
                {MOCK_BARS.map((bar, i) => (
                  <div
                    key={i}
                    className="bar-animate flex-1 rounded-t-[4px]"
                    style={{
                      height: bar.h,
                      opacity: bar.op,
                      background: "linear-gradient(180deg,#4eca78,#1e7a40)",
                    }}
                  />
                ))}
              </div>
              {/* X-axis labels */}
              <div className="flex gap-2 mt-1.5">
                {["M","T","W","T","F","S"].map((d, i) => (
                  <div
                    key={i}
                    className="flex-1 text-center text-[9px] font-semibold text-[#6b9e7e]"
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>

            {/* Student Rows */}
            <div className="flex flex-col gap-2">
              {MOCK_STUDENTS.map((s) => (
                <div
                  key={s.name}
                  className="student-row bg-white rounded-[10px] px-3.5 py-2.5
                    flex items-center gap-2.5
                    border border-[rgba(40,167,85,0.08)]
                    hover:border-[rgba(40,167,85,0.25)]
                    hover:shadow-sm transition-all duration-150"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center
                      justify-center text-[12px] font-bold text-white flex-shrink-0"
                    style={{ background: s.bg }}
                  >
                    {s.av}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#0a1f12] text-[12px] truncate">
                      {s.name}
                    </div>
                    <div className="text-[#6b9e7e] text-[11px]">{s.detail}</div>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5
                      rounded-full flex-shrink-0"
                    style={{ background: s.bBg, color: s.bClr }}
                  >
                    {s.badge}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}