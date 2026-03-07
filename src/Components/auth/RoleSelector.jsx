const ROLES = [
  { key: "admin",   label: "Admin",   icon: "🏫", desc: "Principal / Staff"  },
  { key: "teacher", label: "Teacher", icon: "👨‍🏫", desc: "Class Teacher"      },
  { key: "parent",  label: "Parent",  icon: "👨‍👧", desc: "Guardian / Parent"  },
];

const ROLE_ACCENT = {
  admin:   { active: "#0a3d1f", ring: "rgba(10,61,31,0.15)",   text: "text-[#0a3d1f]"  },
  teacher: { active: "#1d4ed8", ring: "rgba(29,78,216,0.15)",  text: "text-[#1d4ed8]"  },
  parent:  { active: "#7c3aed", ring: "rgba(124,58,237,0.15)", text: "text-[#7c3aed]"  },
};

export default function RoleSelector({ role, onChange }) {
  return (
    <div className="mb-8">
      <p className="text-[12px] font-bold tracking-[0.1em] uppercase
        text-[#6b9e7e] mb-3">
        Sign in as
      </p>

      <div
        className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl"
        style={{ background: "#f0faf4", border: "1px solid rgba(40,167,85,0.12)" }}
      >
        {ROLES.map((r) => {
          const isActive = role === r.key;
          const cfg = ROLE_ACCENT[r.key];
          return (
            <button
              key={r.key}
              onClick={() => onChange(r.key)}
              className={`relative flex flex-col items-center gap-1
                py-3 px-2 rounded-xl text-center
                transition-all duration-250 cursor-pointer border-0 outline-none
                ${isActive ? "shadow-md" : "hover:bg-white/60"}`}
              style={{
                background: isActive ? "white" : "transparent",
                boxShadow: isActive
                  ? `0 2px 12px ${cfg.ring}, 0 0 0 1px ${cfg.ring}`
                  : "none",
              }}
            >
              <span className="text-[20px] leading-none">{r.icon}</span>
              <span
                className={`font-bold text-[13px] leading-none transition-colors duration-200
                  ${isActive ? cfg.text : "text-[#6b9e7e]"}`}
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {r.label}
              </span>
              <span
                className={`text-[10px] font-medium transition-colors duration-200
                  ${isActive ? "text-[#6b9e7e]" : "text-[#6b9e7e]/60"}`}
              >
                {r.desc}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <span
                  className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                  style={{ background: cfg.active }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}