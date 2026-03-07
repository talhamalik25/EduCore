import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SCHEDULE = {
  Mon: [
    { time:"08:00–09:00", subject:"Mathematics", class:"9-A",  room:"R-12", color:"#1e7a40" },
    { time:"09:30–10:30", subject:"Mathematics", class:"8-B",  room:"R-08", color:"#1e7a40" },
    { time:"11:00–12:00", subject:"Mathematics", class:"10-A", room:"R-15", color:"#1e7a40" },
    { time:"13:30–14:30", subject:"Mathematics", class:"7-C",  room:"R-04", color:"#1e7a40" },
  ],
  Tue: [
    { time:"08:00–09:00", subject:"Mathematics", class:"10-A", room:"R-15", color:"#1e7a40" },
    { time:"10:00–11:00", subject:"Mathematics", class:"9-A",  room:"R-12", color:"#1e7a40" },
    { time:"12:00–13:00", subject:"Mathematics", class:"7-C",  room:"R-04", color:"#1e7a40" },
  ],
  Wed: [
    { time:"08:00–09:00", subject:"Mathematics", class:"8-B",  room:"R-08", color:"#1e7a40" },
    { time:"11:00–12:00", subject:"Mathematics", class:"9-A",  room:"R-12", color:"#1e7a40" },
    { time:"14:00–15:00", subject:"Mathematics", class:"10-A", room:"R-15", color:"#1e7a40" },
  ],
  Thu: [
    { time:"09:00–10:00", subject:"Mathematics", class:"7-C",  room:"R-04", color:"#1e7a40" },
    { time:"11:30–12:30", subject:"Mathematics", class:"8-B",  room:"R-08", color:"#1e7a40" },
  ],
  Fri: [
    { time:"08:00–09:00", subject:"Mathematics", class:"9-A",  room:"R-12", color:"#1e7a40" },
    { time:"10:00–11:00", subject:"Mathematics", class:"10-A", room:"R-15", color:"#1e7a40" },
  ],
  Sat: [],
};

const TODAY_IDX = Math.min(new Date().getDay() === 0 ? 5 : new Date().getDay() - 1, 5);

export default function ScheduleScreen() {
  const [activeDay, setActiveDay] = useState(DAYS[TODAY_IDX]);
  const classes = SCHEDULE[activeDay] || [];

  return (
    <div className="pb-4">

      {/* ── DAY SELECTOR ── */}
      <div className="px-4 pt-5 pb-2">
        <div
          className="flex gap-1.5 p-1.5 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {DAYS.map((d) => {
            const isActive = d === activeDay;
            const isToday  = d === DAYS[TODAY_IDX];
            return (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className="flex-1 py-2.5 rounded-xl text-[12px] font-bold
                  border-0 cursor-pointer transition-all duration-200"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg,#1e7a40,#4eca78)"
                    : "transparent",
                  color: isActive ? "white" : isToday ? "#4eca78" : "rgba(255,255,255,0.35)",
                  fontFamily: "Syne, sans-serif",
                  boxShadow: isActive ? "0 2px 10px rgba(30,122,64,0.35)" : "none",
                }}
              >
                {d}
                {isToday && !isActive && (
                  <div className="w-1 h-1 rounded-full bg-[#4eca78] mx-auto mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SUMMARY STRIP ── */}
      <div className="px-4 mb-4">
        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl"
          style={{ background: "rgba(30,122,64,0.08)", border: "1px solid rgba(30,122,64,0.15)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[14px]">📅</span>
            <span className="text-[13px] font-semibold text-white/70">
              {activeDay}{activeDay === DAYS[TODAY_IDX] ? " (Today)" : ""}
            </span>
          </div>
          <span
            className="text-[12px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(30,122,64,0.2)", color: "#4eca78" }}
          >
            {classes.length} {classes.length === 1 ? "class" : "classes"}
          </span>
        </div>
      </div>

      {/* ── CLASSES LIST ── */}
      <div className="px-4">
        {classes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="text-5xl">🎉</div>
            <div className="text-[15px] font-semibold text-white/40">No classes today</div>
            <div className="text-[12px] text-white/20">Enjoy your day off!</div>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-[19px] top-4 bottom-4 w-[2px]"
              style={{ background: "rgba(30,122,64,0.2)" }}
            />
            <div className="flex flex-col gap-3">
              {classes.map((c, i) => (
                <div key={i} className="flex gap-3 items-start">
                  {/* Timeline dot */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center
                      justify-center text-[11px] font-bold text-white
                      flex-shrink-0 relative z-10"
                    style={{
                      background: `linear-gradient(135deg,${c.color},${c.color}aa)`,
                      boxShadow: `0 2px 8px ${c.color}44`,
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-2xl p-4 mb-1"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div
                          className="text-[15px] font-bold text-white"
                          style={{ fontFamily: "Syne, sans-serif" }}
                        >
                          {c.subject}
                        </div>
                        <div className="text-[11px] text-white/35 mt-0.5">
                          Class {c.class} · Room {c.room}
                        </div>
                      </div>
                      <div
                        className="text-[10px] font-bold px-2.5 py-1
                          rounded-full flex-shrink-0"
                        style={{
                          background: `${c.color}22`,
                          color: "#4eca78",
                        }}
                      >
                        {c.time}
                      </div>
                    </div>

                    {/* Action row */}
                    <div className="flex gap-2 mt-3">
                      <button
                        className="flex-1 py-2 rounded-xl text-[11px] font-semibold
                          border-0 cursor-pointer transition-all duration-200
                          active:scale-95"
                        style={{
                          background: "rgba(30,122,64,0.15)",
                          color: "#4eca78",
                        }}
                      >
                        ✅ Attendance
                      </button>
                      <button
                        className="flex-1 py-2 rounded-xl text-[11px] font-semibold
                          border-0 cursor-pointer transition-all duration-200
                          active:scale-95"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        📚 Homework
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}