import { useState } from "react";

const EXISTING = [
  {
    id:1, subject:"Mathematics", class:"9-A",
    title:"Chapter 5 Exercises", due:"Tomorrow",
    submitted:12, total:28, color:"#1e7a40",
  },
  {
    id:2, subject:"Mathematics", class:"10-A",
    title:"Quadratic Equations Practice", due:"In 2 days",
    submitted:8, total:25, color:"#1d4ed8",
  },
  {
    id:3, subject:"Mathematics", class:"8-B",
    title:"Fractions Worksheet", due:"Overdue",
    submitted:18, total:22, color:"#dc2626",
  },
];

const CLASSES   = ["9-A", "8-B", "10-A", "7-C"];
const SUBJECTS  = ["Mathematics", "Science", "English", "Urdu"];

export default function HomeworkScreen() {
  const [tab, setTab]               = useState("existing");
  const [cls, setCls]               = useState("9-A");
  const [subject, setSubject]       = useState("Mathematics");
  const [title, setTitle]           = useState("");
  const [desc, setDesc]             = useState("");
  const [dueDate, setDueDate]       = useState("");
  const [fileAdded, setFileAdded]   = useState(false);
  const [saving, setSaving]         = useState(false);
  const [saved, setSaved]           = useState(false);

  async function handleUpload() {
    if (!title || !dueDate) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setTitle(""); setDesc(""); setDueDate(""); setFileAdded(false);
      setTab("existing");
    }, 2000);
  }

  return (
    <div className="pb-4">

      {/* ── TABS ── */}
      <div className="px-4 pt-5 pb-4">
        <div
          className="grid grid-cols-2 p-1.5 rounded-2xl gap-1.5"
          style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}
        >
          {[["existing","📋 Assigned"],["new","➕ New"]].map(([key,label])=>(
            <button
              key={key}
              onClick={() => setTab(key)}
              className="py-2.5 rounded-xl text-[13px] font-bold
                border-0 cursor-pointer transition-all duration-200"
              style={{
                background: tab===key ? "linear-gradient(135deg,#1e7a40,#4eca78)" : "transparent",
                color: tab===key ? "white" : "rgba(255,255,255,0.35)",
                fontFamily: "Syne,sans-serif",
                boxShadow: tab===key ? "0 2px 10px rgba(30,122,64,0.3)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── EXISTING ── */}
      {tab === "existing" && (
        <div className="px-4 flex flex-col gap-3">
          {EXISTING.map((hw) => {
            const pct = Math.round((hw.submitted / hw.total) * 100);
            const isOverdue = hw.due === "Overdue";
            return (
              <div
                key={hw.id}
                className="rounded-2xl p-4"
                style={{
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background:`${hw.color}22`, color:hw.color }}
                      >
                        Class {hw.class}
                      </div>
                      <div
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: isOverdue?"rgba(220,38,38,0.15)":"rgba(255,255,255,0.06)",
                          color: isOverdue?"#f87171":"rgba(255,255,255,0.35)",
                        }}
                      >
                        {hw.due}
                      </div>
                    </div>
                    <div className="text-[14px] font-bold text-white/80">
                      {hw.title}
                    </div>
                    <div className="text-[11px] text-white/30 mt-0.5">{hw.subject}</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-white/35">Submissions</span>
                    <span style={{ color: hw.color }}>
                      {hw.submitted}/{hw.total} ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width:`${pct}%`, background:`linear-gradient(90deg,${hw.color},${hw.color}88)` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-2 rounded-xl text-[11px] font-semibold
                      border-0 cursor-pointer"
                    style={{ background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.4)" }}
                  >
                    👁 View All
                  </button>
                  <button
                    className="flex-1 py-2 rounded-xl text-[11px] font-semibold
                      border-0 cursor-pointer"
                    style={{ background:`${hw.color}22`, color: hw.color==="#dc2626"?"#f87171":"#4eca78" }}
                  >
                    📝 Grade
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── NEW HOMEWORK ── */}
      {tab === "new" && (
        <div className="px-4 flex flex-col gap-4">

          {/* Class select */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em]
              text-white/30 mb-2">Class</p>
            <div className="grid grid-cols-4 gap-2">
              {CLASSES.map((c)=>(
                <button key={c} onClick={()=>setCls(c)}
                  className="py-2.5 rounded-xl text-[12px] font-bold
                    border-0 cursor-pointer"
                  style={{
                    background: cls===c?"linear-gradient(135deg,#1e7a40,#4eca78)":"rgba(255,255,255,0.05)",
                    color: cls===c?"white":"rgba(255,255,255,0.35)",
                    fontFamily:"Syne,sans-serif",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em]
              text-white/30 mb-2">Subject</p>
            <div className="grid grid-cols-2 gap-2">
              {SUBJECTS.map((s)=>(
                <button key={s} onClick={()=>setSubject(s)}
                  className="py-2.5 rounded-xl text-[12px] font-semibold
                    border-0 cursor-pointer text-left px-3"
                  style={{
                    background: subject===s?"rgba(30,122,64,0.2)":"rgba(255,255,255,0.04)",
                    color: subject===s?"#4eca78":"rgba(255,255,255,0.35)",
                    border: subject===s?"1px solid rgba(30,122,64,0.3)":"1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em]
              text-white/30 mb-2">Title *</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chapter 5 Exercises"
              className="w-full px-4 py-3 rounded-xl text-[13px]
                font-medium text-white outline-none
                placeholder:text-white/20"
              style={{
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>

          {/* Description */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em]
              text-white/30 mb-2">Instructions</p>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Add any instructions for students..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-[13px]
                font-medium text-white outline-none resize-none
                placeholder:text-white/20"
              style={{
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>

          {/* Due date */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em]
              text-white/30 mb-2">Due Date *</p>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-[13px]
                font-medium text-white/70 outline-none"
              style={{
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.1)",
                colorScheme:"dark",
              }}
            />
          </div>

          {/* File attach */}
          <button
            onClick={() => setFileAdded(!fileAdded)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl
              border-0 cursor-pointer transition-all duration-200
              w-full text-left"
            style={{
              background: fileAdded?"rgba(30,122,64,0.12)":"rgba(255,255,255,0.04)",
              border: fileAdded?"1px solid rgba(30,122,64,0.25)":"1px dashed rgba(255,255,255,0.12)",
            }}
          >
            <span className="text-[20px]">{fileAdded ? "📎" : "📁"}</span>
            <span
              className="text-[13px] font-semibold"
              style={{ color: fileAdded?"#4eca78":"rgba(255,255,255,0.35)" }}
            >
              {fileAdded ? "worksheet.pdf attached" : "Attach a file (optional)"}
            </span>
            {fileAdded && (
              <span className="ml-auto text-[11px] text-white/25">✕ Remove</span>
            )}
          </button>

          {/* Submit */}
          <button
            onClick={handleUpload}
            disabled={!title || !dueDate || saving || saved}
            className="w-full py-4 rounded-2xl text-[15px] font-bold
              text-white border-0 cursor-pointer
              transition-all duration-200 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: saved
                ? "rgba(30,122,64,0.4)"
                : "linear-gradient(135deg,#1e7a40,#4eca78)",
              boxShadow: "0 4px 20px rgba(30,122,64,0.3)",
            }}
          >
            {saved ? "✅ Homework Assigned!" : saving ? "Uploading…" : "📚 Assign Homework"}
          </button>

        </div>
      )}
    </div>
  );
}