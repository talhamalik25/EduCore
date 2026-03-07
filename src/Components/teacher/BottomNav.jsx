const TABS = [
  { key: "home",       icon: "⊞",  label: "Home"       },
  { key: "schedule",   icon: "🗓",  label: "Schedule"   },
  { key: "attendance", icon: "✅",  label: "Attendance" },
  { key: "homework",   icon: "📚",  label: "Homework"   },
  { key: "students",   icon: "👥",  label: "Students"   },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50
        flex items-center justify-around
        bg-[#0a1a0f] border-t border-white/[0.07]"
      style={{
        width: "min(430px, 100vw)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
        paddingTop: "8px",
      }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className="flex flex-col items-center gap-1 flex-1 py-1
              border-0 bg-transparent cursor-pointer outline-none
              transition-all duration-200"
          >
            {/* Icon container */}
            <div
              className="w-10 h-10 rounded-2xl flex items-center
                justify-center text-[18px] transition-all duration-250"
              style={{
                background: isActive
                  ? "linear-gradient(135deg,#1e7a40,#4eca78)"
                  : "transparent",
                boxShadow: isActive
                  ? "0 4px 14px rgba(30,122,64,0.4)"
                  : "none",
                transform: isActive ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              {tab.icon}
            </div>

            {/* Label */}
            <span
              className="text-[10px] font-semibold transition-colors duration-200"
              style={{
                color: isActive ? "#4eca78" : "rgba(255,255,255,0.3)",
                fontFamily: "Syne, sans-serif",
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}