const FEATURES = [
  { icon: "📋", text: "Smart Attendance & QR Check-in"   },
  { icon: "💰", text: "Fee Management & Online Payments" },
  { icon: "🤖", text: "AI Performance Analyzer"          },
  { icon: "📱", text: "Parent App & Notifications"       },
];

export default function LoginLeftPanel({ role }) {
  const roleConfig = {
    admin: {
      greeting: "Welcome back,",
      title: "Principal",
      desc: "Manage your entire school from one powerful dashboard.",
      color: "#1e7a40",
      lightColor: "rgba(30,122,64,0.12)",
    },
    teacher: {
      greeting: "Welcome back,",
      title: "Teacher",
      desc: "Mark attendance, upload homework and track student progress.",
      color: "#1d4ed8",
      lightColor: "rgba(29,78,216,0.12)",
    },
    parent: {
      greeting: "Welcome back,",
      title: "Parent",
      desc: "Stay connected with your child's school life in real time.",
      color: "#7c3aed",
      lightColor: "rgba(124,58,237,0.12)",
    },
  };

  const cfg = roleConfig[role] || roleConfig.admin;

  return (
    <div
      className="hidden lg:flex flex-col justify-between
        w-[45%] min-h-screen p-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0a3d1f 0%, #145a2e 50%, #1e7a40 100%)",
      }}
    >
      {/* ── BG PATTERN ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── GLOW ORBS ── */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(78,202,120,0.2) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(78,202,120,0.12) 0%, transparent 60%)",
        }}
      />

      {/* ── TOP — LOGO ── */}
      <div className="relative z-10">
        <a href="/" className="inline-flex items-center gap-2.5 no-underline mb-16">
          <div
            className="w-9 h-9 rounded-[10px] flex items-center
              justify-center text-lg"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.08))",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            🎓
          </div>
          <span
            className="font-extrabold text-[20px] text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            EduCore <span style={{ color: "#4eca78" }}>OS</span>
          </span>
        </a>

        {/* Dynamic greeting based on role */}
        <div
          className="panel-greeting text-[13px] font-semibold mb-2"
          style={{ color: "#4eca78" }}
        >
          {cfg.greeting}
        </div>
        <h2
          className="panel-title font-extrabold text-white mb-4 leading-tight"
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(32px, 3vw, 48px)",
          }}
        >
          {cfg.title}
        </h2>
        <p className="panel-desc text-white/50 text-[15px] leading-[1.7] max-w-[320px]">
          {cfg.desc}
        </p>
      </div>

      {/* ── MIDDLE — FEATURE LIST ── */}
      <div className="relative z-10 my-8">
        <div className="text-[11px] font-bold tracking-[0.12em] uppercase
          text-white/30 mb-5">
          Platform Features
        </div>
        <div className="flex flex-col gap-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.text}
              className="panel-feature flex items-center gap-3"
              style={{ animationDelay: `${0.6 + i * 0.1}s` }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center
                  justify-center text-[14px] flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {f.icon}
              </div>
              <span className="text-[13px] text-white/60 font-medium">
                {f.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM — STATS ── */}
      <div className="relative z-10">
        <div
          className="panel-stats-card rounded-2xl p-5"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[12px] text-white/40 font-semibold">
              Platform Overview
            </span>
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(78,202,120,0.15)", color: "#4eca78" }}
            >
              ● LIVE
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ["10+", "Modules"],
              ["AI",  "Powered"],
              ["PKR", "Pricing"],
            ].map(([n, l]) => (
              <div key={l} className="text-center">
                <div
                  className="font-extrabold text-[20px] text-white leading-none mb-0.5"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {n}
                </div>
                <div className="text-[10px] text-white/35">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[12px] text-white/25 mt-6 text-center">
          © {new Date().getFullYear()} CoreCraft Technologies
        </p>
      </div>
    </div>
  );
}