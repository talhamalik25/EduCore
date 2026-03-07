import { useState } from "react";

const ALL_STUDENTS = [
  { id:1,  name:"Ahmad Khan",    class:"9-A",  roll:"01", att:94, fee:"Paid",    status:"good"    },
  { id:2,  name:"Sara Raza",     class:"9-A",  roll:"02", att:72, fee:"Pending", status:"warning" },
  { id:3,  name:"Zain Malik",    class:"9-A",  roll:"03", att:88, fee:"Paid",    status:"good"    },
  { id:4,  name:"Fatima Noor",   class:"9-A",  roll:"04", att:96, fee:"Paid",    status:"good"    },
  { id:5,  name:"Bilal Ahmed",   class:"9-A",  roll:"05", att:55, fee:"Overdue", status:"risk"    },
  { id:6,  name:"Ayesha Tariq",  class:"9-A",  roll:"06", att:91, fee:"Paid",    status:"good"    },
  { id:7,  name:"Hassan Ali",    class:"9-A",  roll:"07", att:83, fee:"Pending", status:"warning" },
  { id:8,  name:"Mariam Khan",   class:"9-A",  roll:"08", att:99, fee:"Paid",    status:"good"    },
  { id:9,  name:"Omar Farooq",   class:"8-B",  roll:"01", att:78, fee:"Paid",    status:"good"    },
  { id:10, name:"Zara Sheikh",   class:"8-B",  roll:"02", att:65, fee:"Pending", status:"warning" },
  { id:11, name:"Ali Raza",      class:"8-B",  roll:"03", att:90, fee:"Paid",    status:"good"    },
  { id:12, name:"Nadia Baig",    class:"8-B",  roll:"04", att:88, fee:"Paid",    status:"good"    },
  { id:13, name:"Saad Hussain",  class:"8-B",  roll:"05", att:45, fee:"Overdue", status:"risk"    },
  { id:14, name:"Hira Javed",    class:"8-B",  roll:"06", att:92, fee:"Paid",    status:"good"    },
  { id:15, name:"Usman Ghani",   class:"10-A", roll:"01", att:87, fee:"Paid",    status:"good"    },
  { id:16, name:"Maham Tariq",   class:"10-A", roll:"02", att:94, fee:"Paid",    status:"good"    },
  { id:17, name:"Daniyal Shah",  class:"10-A", roll:"03", att:71, fee:"Pending", status:"warning" },
  { id:18, name:"Layla Ahmed",   class:"10-A", roll:"04", att:98, fee:"Paid",    status:"good"    },
  { id:19, name:"Faisal Iqbal",  class:"10-A", roll:"05", att:60, fee:"Overdue", status:"risk"    },
  { id:20, name:"Rida Malik",    class:"7-C",  roll:"01", att:89, fee:"Paid",    status:"good"    },
  { id:21, name:"Hamza Riaz",    class:"7-C",  roll:"02", att:93, fee:"Paid",    status:"good"    },
  { id:22, name:"Sana Mirza",    class:"7-C",  roll:"03", att:77, fee:"Pending", status:"warning" },
  { id:23, name:"Talha Baig",    class:"7-C",  roll:"04", att:85, fee:"Paid",    status:"good"    },
];

const CLASSES  = ["All", "9-A", "8-B", "10-A", "7-C"];
const FILTERS  = ["All", "At Risk", "Warning", "Good"];

const AVATAR_COLORS = ["#1e7a40","#1d4ed8","#7c3aed","#c2410c","#d97706","#0891b2","#be185d"];

function statusStyle(s) {
  if (s === "risk")    return { bg:"rgba(220,38,38,0.1)",   color:"#f87171",  label:"At Risk"  };
  if (s === "warning") return { bg:"rgba(217,119,6,0.1)",   color:"#fbbf24",  label:"Warning"  };
  return                      { bg:"rgba(30,122,64,0.1)",   color:"#4eca78",  label:"Good"     };
}

export default function StudentsScreen() {
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch]           = useState("");
  const [selected, setSelected]       = useState(null);

  const filtered = ALL_STUDENTS.filter((s) => {
    const matchClass  = classFilter === "All" || s.class === classFilter;
    const matchStatus =
      statusFilter === "All"      ? true :
      statusFilter === "At Risk"  ? s.status === "risk"    :
      statusFilter === "Warning"  ? s.status === "warning" :
      s.status === "good";
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchStatus && matchSearch;
  });

  if (selected) {
    return <StudentDetail student={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="pb-4">

      {/* ── SEARCH ── */}
      <div className="px-4 pt-5 pb-3">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] opacity-40">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-[13px]
              font-medium text-white outline-none
              placeholder:text-white/20"
            style={{
              background:"rgba(255,255,255,0.06)",
              border:"1px solid rgba(255,255,255,0.09)",
            }}
          />
        </div>
      </div>

      {/* ── CLASS FILTER ── */}
      <div className="px-4 mb-3">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CLASSES.map((c) => (
            <button
              key={c}
              onClick={() => setClassFilter(c)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-xl
                text-[12px] font-bold border-0 cursor-pointer"
              style={{
                background: classFilter===c
                  ? "linear-gradient(135deg,#1e7a40,#4eca78)"
                  : "rgba(255,255,255,0.05)",
                color: classFilter===c ? "white" : "rgba(255,255,255,0.35)",
                fontFamily:"Syne,sans-serif",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── STATUS FILTER ── */}
      <div className="px-4 mb-4">
        <div className="flex gap-2">
          {FILTERS.map((f) => {
            const colors = {
              "At Risk": { a:"rgba(220,38,38,0.2)", c:"#f87171" },
              "Warning": { a:"rgba(217,119,6,0.2)", c:"#fbbf24" },
              "Good":    { a:"rgba(30,122,64,0.2)", c:"#4eca78" },
              "All":     { a:"rgba(255,255,255,0.1)", c:"rgba(255,255,255,0.6)" },
            };
            const isActive = statusFilter === f;
            return (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className="flex-1 py-1.5 rounded-xl text-[11px] font-bold
                  border-0 cursor-pointer"
                style={{
                  background: isActive ? colors[f].a : "rgba(255,255,255,0.04)",
                  color: isActive ? colors[f].c : "rgba(255,255,255,0.25)",
                  border: isActive ? `1px solid ${colors[f].c}44` : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── COUNT ── */}
      <div className="px-4 mb-3">
        <span className="text-[11px] text-white/25 font-medium">
          {filtered.length} student{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── LIST ── */}
      <div className="px-4 flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-white/25 text-[13px]">
            No students found
          </div>
        ) : (
          filtered.map((s, i) => {
            const st = statusStyle(s.status);
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl
                  w-full text-left border-0 cursor-pointer
                  transition-all duration-150 active:scale-[0.98]"
                style={{
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center
                    justify-center text-[13px] font-bold text-white flex-shrink-0"
                  style={{ background: color }}
                >
                  {s.name.split(" ").map((n)=>n[0]).join("").slice(0,2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white/80 truncate">
                    {s.name}
                  </div>
                  <div className="text-[10px] text-white/30">
                    Class {s.class} · Roll #{s.roll}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background:st.bg, color:st.color }}
                  >
                    {st.label}
                  </div>
                  <div className="text-[10px] text-white/25">{s.att}% att.</div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

// ── student detail view ──
function StudentDetail({ student, onBack }) {
  const st = statusStyle(student.status);
  return (
    <div className="pb-4">
      <div className="px-4 pt-5 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[13px] font-semibold
            text-white/40 border-0 bg-transparent cursor-pointer mb-6"
        >
          ← Back to Students
        </button>

        {/* Profile card */}
        <div
          className="rounded-3xl p-6 text-center mb-5"
          style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center
              text-[22px] font-bold text-white mx-auto mb-4"
            style={{ background:"linear-gradient(135deg,#1e7a40,#4eca78)" }}
          >
            {student.name.split(" ").map((n)=>n[0]).join("").slice(0,2)}
          </div>
          <div className="text-[18px] font-extrabold text-white mb-1"
            style={{ fontFamily:"Syne,sans-serif" }}>
            {student.name}
          </div>
          <div className="text-[12px] text-white/35 mb-3">
            Class {student.class} · Roll #{student.roll}
          </div>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5
              rounded-full text-[12px] font-bold"
            style={{ background:st.bg, color:st.color }}
          >
            {st.label}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label:"Attendance", val:`${student.att}%`, color: student.att>80?"#4eca78":student.att>60?"#fbbf24":"#f87171" },
            { label:"Fee Status", val:student.fee, color: student.fee==="Paid"?"#4eca78":student.fee==="Pending"?"#fbbf24":"#f87171" },
            { label:"Class",      val:student.class, color:"rgba(255,255,255,0.6)" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-3 text-center"
              style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="text-[16px] font-extrabold mb-0.5"
                style={{ color:item.color, fontFamily:"Syne,sans-serif" }}>
                {item.val}
              </div>
              <div className="text-[10px] text-white/30">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {[
            { icon:"💬", label:"Message Parent", color:"#1d4ed8" },
            { icon:"📋", label:"View Attendance", color:"#1e7a40" },
            { icon:"📚", label:"View Homework",   color:"#7c3aed" },
          ].map((a) => (
            <button
              key={a.label}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl
                w-full text-left border-0 cursor-pointer"
              style={{ background:`${a.color}14`, border:`1px solid ${a.color}22` }}
            >
              <span className="text-[17px]">{a.icon}</span>
              <span className="text-[13px] font-semibold" style={{ color:a.color }}>
                {a.label}
              </span>
              <span className="ml-auto text-white/20 text-[12px]">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}