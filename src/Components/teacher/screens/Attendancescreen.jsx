import { useState } from "react";

const CLASSES = ["9-A", "8-B", "10-A", "7-C"];

const STUDENTS = {
  "9-A": [
    { id:1, name:"Ahmad Khan",    roll:"01" },
    { id:2, name:"Sara Raza",     roll:"02" },
    { id:3, name:"Zain Malik",    roll:"03" },
    { id:4, name:"Fatima Noor",   roll:"04" },
    { id:5, name:"Bilal Ahmed",   roll:"05" },
    { id:6, name:"Ayesha Tariq",  roll:"06" },
    { id:7, name:"Hassan Ali",    roll:"07" },
    { id:8, name:"Mariam Khan",   roll:"08" },
  ],
  "8-B": [
    { id:9,  name:"Omar Farooq",   roll:"01" },
    { id:10, name:"Zara Sheikh",   roll:"02" },
    { id:11, name:"Ali Raza",      roll:"03" },
    { id:12, name:"Nadia Baig",    roll:"04" },
    { id:13, name:"Saad Hussain",  roll:"05" },
    { id:14, name:"Hira Javed",    roll:"06" },
  ],
  "10-A": [
    { id:15, name:"Usman Ghani",   roll:"01" },
    { id:16, name:"Maham Tariq",   roll:"02" },
    { id:17, name:"Daniyal Shah",  roll:"03" },
    { id:18, name:"Layla Ahmed",   roll:"04" },
    { id:19, name:"Faisal Iqbal",  roll:"05" },
  ],
  "7-C": [
    { id:20, name:"Rida Malik",    roll:"01" },
    { id:21, name:"Hamza Riaz",    roll:"02" },
    { id:22, name:"Sana Mirza",    roll:"03" },
    { id:23, name:"Talha Baig",    roll:"04" },
  ],
};

const INITIALS_COLORS = ["#1e7a40","#1d4ed8","#7c3aed","#c2410c","#d97706","#0891b2"];

export default function AttendanceScreen() {
  const [activeClass, setActiveClass] = useState("9-A");
  const students = STUDENTS[activeClass];
  const [status, setStatus] = useState(() => {
    const s = {};
    Object.values(STUDENTS).flat().forEach((st) => { s[st.id] = "present"; });
    return s;
  });
  const [submitted, setSubmitted] = useState({});
  const [saving, setSaving] = useState(false);

  const toggle = (id) => {
    if (submitted[activeClass]) return;
    setStatus((prev) => ({
      ...prev,
      [id]: prev[id] === "present" ? "absent" : "present",
    }));
  };

  const markAll = (val) => {
    if (submitted[activeClass]) return;
    const updated = { ...status };
    students.forEach((s) => { updated[s.id] = val; });
    setStatus(updated);
  };

  async function handleSubmit() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setSubmitted((p) => ({ ...p, [activeClass]: true }));
  }

  const presentCount = students.filter((s) => status[s.id] === "present").length;
  const absentCount  = students.length - presentCount;
  const isSubmitted  = !!submitted[activeClass];

  return (
    <div className="pb-4">

      {/* ── CLASS SELECTOR ── */}
      <div className="px-4 pt-5 pb-4">
        <p className="text-[11px] font-bold tracking-[0.1em] uppercase
          text-white/30 mb-3">
          Select Class
        </p>
        <div className="grid grid-cols-4 gap-2">
          {CLASSES.map((cls) => {
            const isActive = cls === activeClass;
            const isDone   = !!submitted[cls];
            return (
              <button
                key={cls}
                onClick={() => setActiveClass(cls)}
                className="py-3 rounded-2xl text-[13px] font-bold
                  border-0 cursor-pointer transition-all duration-200
                  relative"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg,#1e7a40,#4eca78)"
                    : "rgba(255,255,255,0.05)",
                  color: isActive ? "white" : "rgba(255,255,255,0.4)",
                  fontFamily: "Syne, sans-serif",
                  boxShadow: isActive ? "0 3px 12px rgba(30,122,64,0.35)" : "none",
                }}
              >
                {cls}
                {isDone && (
                  <span className="absolute -top-1 -right-1 text-[10px]">✅</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SUMMARY ── */}
      <div className="px-4 mb-4">
        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl"
          style={{ background: "rgba(30,122,64,0.08)", border: "1px solid rgba(30,122,64,0.15)" }}
        >
          <div className="flex gap-4">
            <div>
              <div className="text-[18px] font-extrabold text-[#4eca78]"
                style={{ fontFamily:"Syne,sans-serif" }}>
                {presentCount}
              </div>
              <div className="text-[10px] text-white/30">Present</div>
            </div>
            <div>
              <div className="text-[18px] font-extrabold text-red-400"
                style={{ fontFamily:"Syne,sans-serif" }}>
                {absentCount}
              </div>
              <div className="text-[10px] text-white/30">Absent</div>
            </div>
            <div>
              <div className="text-[18px] font-extrabold text-white/60"
                style={{ fontFamily:"Syne,sans-serif" }}>
                {students.length}
              </div>
              <div className="text-[10px] text-white/30">Total</div>
            </div>
          </div>

          {/* Mark all buttons */}
          {!isSubmitted && (
            <div className="flex gap-1.5">
              <button
                onClick={() => markAll("present")}
                className="px-2.5 py-1.5 rounded-xl text-[10px] font-bold
                  border-0 cursor-pointer"
                style={{ background:"rgba(30,122,64,0.2)", color:"#4eca78" }}
              >
                All ✅
              </button>
              <button
                onClick={() => markAll("absent")}
                className="px-2.5 py-1.5 rounded-xl text-[10px] font-bold
                  border-0 cursor-pointer"
                style={{ background:"rgba(239,68,68,0.15)", color:"#f87171" }}
              >
                All ❌
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── STUDENT LIST ── */}
      <div className="px-4 flex flex-col gap-2">
        {students.map((s, i) => {
          const isPresent = status[s.id] === "present";
          const color     = INITIALS_COLORS[i % INITIALS_COLORS.length];
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl
                w-full text-left border-0 cursor-pointer
                transition-all duration-200 active:scale-[0.98]"
              style={{
                background: isPresent
                  ? "rgba(30,122,64,0.08)"
                  : "rgba(239,68,68,0.06)",
                border: isPresent
                  ? "1px solid rgba(30,122,64,0.2)"
                  : "1px solid rgba(239,68,68,0.2)",
                opacity: isSubmitted ? 0.7 : 1,
              }}
            >
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-xl flex items-center
                  justify-center text-[12px] font-bold text-white flex-shrink-0"
                style={{ background: color }}
              >
                {s.name.split(" ").map((n) => n[0]).join("").slice(0,2)}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-white/80 truncate">
                  {s.name}
                </div>
                <div className="text-[10px] text-white/30">Roll #{s.roll}</div>
              </div>

              {/* Toggle */}
              <div
                className="w-8 h-8 rounded-xl flex items-center
                  justify-center text-[15px] flex-shrink-0
                  transition-all duration-200"
                style={{
                  background: isPresent
                    ? "rgba(30,122,64,0.25)"
                    : "rgba(239,68,68,0.2)",
                }}
              >
                {isPresent ? "✅" : "❌"}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── SUBMIT BUTTON ── */}
      <div className="px-4 mt-5">
        {isSubmitted ? (
          <div
            className="w-full py-4 rounded-2xl text-[14px] font-bold
              text-center"
            style={{ background:"rgba(30,122,64,0.15)", color:"#4eca78" }}
          >
            ✅ Attendance Submitted for Class {activeClass}
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full py-4 rounded-2xl text-[15px] font-bold
              text-white border-0 cursor-pointer
              transition-all duration-200 active:scale-[0.98]
              disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg,#1e7a40,#4eca78)",
              boxShadow: "0 4px 20px rgba(30,122,64,0.35)",
            }}
          >
            {saving ? "Submitting…" : `Submit Attendance · Class ${activeClass}`}
          </button>
        )}
      </div>

    </div>
  );
}