const STATS = [
  { icon: "👥", label: "My Students",  val: "38",  sub: "2 classes",       color: "#1e7a40", bg: "rgba(30,122,64,0.1)"   },
  { icon: "✅", label: "Attendance",   val: "94%", sub: "Today",            color: "#1d4ed8", bg: "rgba(29,78,216,0.1)"   },
  { icon: "📚", label: "Homework",     val: "3",   sub: "Pending review",   color: "#7c3aed", bg: "rgba(124,58,237,0.1)"  },
  { icon: "📋", label: "Classes Today",val: "4",   sub: "Next at 11:00 AM", color: "#d97706", bg: "rgba(217,119,6,0.1)"   },
];

const ACTIVITY = [
  { icon: "✅", text: "Attendance marked for 9-A",   time: "8:30 AM",  color: "#1e7a40" },
  { icon: "📚", text: "Homework uploaded — Maths",   time: "Yesterday",color: "#7c3aed" },
  { icon: "📝", text: "Result entry due tomorrow",   time: "Reminder", color: "#d97706" },
  { icon: "💬", text: "Parent message from Zain's dad", time: "2h ago", color: "#1d4ed8" },
];

const TODAY_CLASSES = [
  { time: "08:00", subject: "Mathematics", class: "9-A", room: "R-12", status: "done"    },
  { time: "09:30", subject: "Mathematics", class: "8-B", room: "R-08", status: "done"    },
  { time: "11:00", subject: "Mathematics", class: "10-A",room: "R-15", status: "next"    },
  { time: "13:30", subject: "Mathematics", class: "7-C", room: "R-04", status: "upcoming"},
];

export default function HomeScreen({ onNavigate }) {
  return (
    <div className="pb-4">

      {/* ── STAT CARDS ── */}
      <div className="px-4 pt-5 pb-2">
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4 border border-white/[0.06]"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center
                  justify-center text-[16px] mb-3"
                style={{ background: s.bg }}
              >
                {s.icon}
              </div>
              <div
                className="font-extrabold text-[26px] text-white leading-none mb-0.5"
                style={{ fontFamily: "Syne, sans-serif", color: s.color }}
              >
                {s.val}
              </div>
              <div className="text-[12px] font-semibold text-white/60">{s.label}</div>
              <div className="text-[10px] text-white/30 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUICK ACTIONS ── */}
      <div className="px-4 mt-5">
        <p
          className="text-[11px] font-bold tracking-[0.1em] uppercase
            text-white/30 mb-3"
        >
          Quick Actions
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon:"✅", label:"Attendance", screen:"attendance", color:"#1e7a40" },
            { icon:"📚", label:"Homework",   screen:"homework",   color:"#7c3aed" },
            { icon:"👥", label:"Students",   screen:"students",   color:"#1d4ed8" },
            { icon:"🗓", label:"Schedule",   screen:"schedule",   color:"#d97706" },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => onNavigate(a.screen)}
              className="flex flex-col items-center gap-1.5 py-3 px-1
                rounded-2xl border-0 cursor-pointer
                transition-all duration-200 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center
                  justify-center text-[18px]"
                style={{ background: `${a.color}22` }}
              >
                {a.icon}
              </div>
              <span className="text-[10px] font-semibold text-white/50 leading-tight text-center">
                {a.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TODAY'S CLASSES ── */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/30">
            Today's Classes
          </p>
          <button
            onClick={() => onNavigate("schedule")}
            className="text-[11px] font-semibold text-[#4eca78]
              border-0 bg-transparent cursor-pointer"
          >
            View all →
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {TODAY_CLASSES.map((c) => (
            <div
              key={c.time + c.class}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: c.status === "next"
                  ? "rgba(30,122,64,0.12)"
                  : "rgba(255,255,255,0.03)",
                border: c.status === "next"
                  ? "1px solid rgba(30,122,64,0.25)"
                  : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Time */}
              <div className="w-14 flex-shrink-0">
                <div
                  className="text-[12px] font-bold"
                  style={{
                    color: c.status === "done" ? "rgba(255,255,255,0.25)" :
                           c.status === "next" ? "#4eca78" : "rgba(255,255,255,0.6)"
                  }}
                >
                  {c.time}
                </div>
              </div>

              {/* Subject + class */}
              <div className="flex-1 min-w-0">
                <div
                  className="text-[13px] font-semibold truncate"
                  style={{
                    color: c.status === "done" ? "rgba(255,255,255,0.3)" : "white"
                  }}
                >
                  {c.subject}
                </div>
                <div className="text-[11px] text-white/30">
                  Class {c.class} · Room {c.room}
                </div>
              </div>

              {/* Status badge */}
              <div
                className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{
                  background:
                    c.status === "done"     ? "rgba(255,255,255,0.05)" :
                    c.status === "next"     ? "rgba(30,122,64,0.2)"    :
                                              "rgba(217,119,6,0.15)",
                  color:
                    c.status === "done"     ? "rgba(255,255,255,0.2)"  :
                    c.status === "next"     ? "#4eca78"                 :
                                              "#d97706",
                }}
              >
                {c.status === "done" ? "Done" : c.status === "next" ? "Next ↑" : "Later"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RECENT ACTIVITY ── */}
      <div className="px-4 mt-6">
        <p className="text-[11px] font-bold tracking-[0.1em] uppercase
          text-white/30 mb-3">
          Recent Activity
        </p>
        <div className="flex flex-col gap-2">
          {ACTIVITY.map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center
                  justify-center text-[13px] flex-shrink-0 mt-0.5"
                style={{ background: `${a.color}22` }}
              >
                {a.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-white/70 leading-snug">
                  {a.text}
                </div>
                <div className="text-[10px] text-white/25 mt-0.5">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}