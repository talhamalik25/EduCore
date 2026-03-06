import { useState } from 'react';

const students = [
  { initials: 'AK', name: 'Ahmad Khan', roll: '01', color: '#16a34a', status: 'present' },
  { initials: 'SR', name: 'Sara Raza', roll: '02', color: '#dc2626', status: 'absent' },
  { initials: 'ZM', name: 'Zain Malik', roll: '03', color: '#1d4ed8', status: 'present' },
  { initials: 'NB', name: 'Nadia Baig', roll: '04', color: '#a16207', status: 'late' },
  { initials: 'FA', name: 'Farhan Ali', roll: '05', color: '#7c3aed', status: 'present' },
  { initials: 'HQ', name: 'Hira Qureshi', roll: '06', color: '#0e7490', status: 'present' },
];

const homeworkData = [
  { title: 'Chapter 5 — Derivatives', sub: '10 questions · PDF', cls: '9-A', due: 'Today', submitted: '26/38', pct: 72, status: 'Pending', statusColor: 'bg-orange-100 text-orange-700' },
  { title: 'Integration Practice Set', sub: '15 questions · Doc', cls: '10-A', due: 'Mar 7', submitted: '18/40', pct: 45, status: 'In Progress', statusColor: 'bg-yellow-100 text-yellow-700' },
  { title: 'Algebra Quiz Prep', sub: 'MCQ · 20 questions', cls: '9-A', due: 'Mar 4', submitted: '38/38', pct: 100, status: 'Complete', statusColor: 'bg-green-100 text-green-700' },
  { title: 'Statistics Problem Set', sub: '8 questions · Manual', cls: '10-A', due: 'Mar 3', submitted: '35/40', pct: 88, status: 'Grading', statusColor: 'bg-green-100 text-green-700' },
];

const submissions = [
  { initials: 'ZM', name: 'Zain Malik', detail: 'Chapter 5 — Derivatives · Class 9-A', color: '#16a34a', badge: 'New', badgeColor: 'bg-blue-100 text-blue-700', time: '10 min ago' },
  { initials: 'HQ', name: 'Hira Qureshi', detail: 'Chapter 5 — Derivatives · Class 9-A', color: '#1d4ed8', badge: 'New', badgeColor: 'bg-blue-100 text-blue-700', time: '32 min ago' },
  { initials: 'FA', name: 'Farhan Ali', detail: 'Integration Practice · Class 10-A', color: '#7c3aed', badge: 'Late', badgeColor: 'bg-orange-100 text-orange-700', time: '1 hr ago' },
  { initials: 'NB', name: 'Nadia Baig', detail: 'Chapter 5 — Derivatives · Class 9-A', color: '#0e7490', badge: 'Graded', badgeColor: 'bg-green-100 text-green-700', time: '2 hr ago' },
  { initials: 'BI', name: 'Bilal Iqbal', detail: 'Statistics Problem Set · Class 10-A', color: '#a16207', badge: 'New', badgeColor: 'bg-blue-100 text-blue-700', time: '3 hr ago' },
];

const gradeStudents = [
  { initials: 'AK', name: 'Ahmad Khan', roll: '01', color: '#16a34a', score: 88 },
  { initials: 'ZM', name: 'Zain Malik', roll: '03', color: '#1d4ed8', score: 95 },
  { initials: 'FA', name: 'Farhan Ali', roll: '05', color: '#7c3aed', score: 72 },
  { initials: 'HQ', name: 'Hira Qureshi', roll: '06', color: '#0e7490', score: 91 },
  { initials: 'SR', name: 'Sara Raza', roll: '02', color: '#dc2626', score: 41 },
];

const topStudents = [
  { rank: '01', initials: 'ZM', name: 'Zain Malik', color: '#1d4ed8', score: '95%', attendance: 100, status: 'Excellent', statusColor: 'bg-emerald-500/10 text-emerald-400', rankColor: 'text-green-600' },
  { rank: '02', initials: 'HQ', name: 'Hira Qureshi', color: '#0e7490', score: '91%', attendance: 97, status: 'Excellent', statusColor: 'bg-emerald-500/10 text-emerald-400', rankColor: 'text-green-600' },
  { rank: '03', initials: 'AK', name: 'Ahmad Khan', color: '#16a34a', score: '88%', attendance: 95, status: 'Good', statusColor: 'bg-blue-100 text-blue-700', rankColor: 'text-green-600' },
  { rank: '04', initials: 'FA', name: 'Farhan Ali', color: '#7c3aed', score: '72%', attendance: 88, status: 'Average', statusColor: 'bg-yellow-100 text-yellow-700', rankColor: 'text-gray-400', progGradient: 'linear-gradient(90deg, #eab308, #fde047)' },
  { rank: '05', initials: 'SR', name: 'Sara Raza', color: '#dc2626', score: '41%', attendance: 61, status: 'At Risk ⚠️', statusColor: 'bg-red-100 text-red-600', rankColor: 'text-red-500', progGradient: 'linear-gradient(90deg, #ef4444, #f87171)' },
];

const scheduleItems = [
  { time: '07:30 AM', subject: 'Mathematics — Algebra', cls: 'Class 8-B · 32 students', room: 'Room 204', color: '#86efac', current: false },
  { time: '09:00 AM', subject: 'Mathematics — Calculus ▶ Now', cls: 'Class 9-A · 38 students', room: 'Room 301', color: '#22c55e', current: true },
  { time: '11:00 AM', subject: 'Mathematics — Statistics', cls: 'Class 10-A · 40 students', room: 'Room 105', color: '#93c5fd', current: false },
  { time: '01:00 PM', subject: 'Mathematics — Geometry', cls: 'Class 11-A · 35 students', room: 'Room 402', color: '#fde68a', current: false },
  { time: '03:00 PM', subject: 'Staff Meeting', cls: 'All departments', room: 'Hall A', color: '#d8b4fe', current: false },
];

const navItems = [
  { label: '📊 My Dashboard', section: 'Main', dot: null },
  { label: '📋 Attendance', section: null, dot: { text: '✓', color: 'bg-green-600' } },
  { label: '📚 Homework', section: null, dot: { text: '3', color: 'bg-yellow-500 text-black' } },
  { label: '📝 Grades & Results', section: null, dot: null },
  { label: '🗓️ My Timetable', section: null, dot: null },
  { label: '👨‍🎓 My Students', section: 'Students', dot: null },
  { label: '🤖 AI Performance', section: null, dot: null },
  { label: '📩 Submissions', section: null, dot: { text: '5', color: 'bg-red-500' } },
  { label: '💬 Messages', section: 'Communication', dot: { text: '2', color: 'bg-red-500' } },
  { label: '📣 Announcements', section: null, dot: null },
  { label: '⚙️ Settings', section: null, dot: null },
];

function getGradeLetter(val) {
  if (val >= 90) return { letter: 'A', bg: 'bg-green-100', color: 'text-green-700' };
  if (val >= 80) return { letter: 'B+', bg: 'bg-green-100', color: 'text-green-700' };
  if (val >= 70) return { letter: 'C+', bg: 'bg-yellow-100', color: 'text-yellow-700' };
  if (val >= 60) return { letter: 'C', bg: 'bg-yellow-100', color: 'text-yellow-700' };
  return { letter: 'F', bg: 'bg-red-100', color: 'text-red-600' };
}

export default function TeacherDashboard() {
  const [activeNav, setActiveNav] = useState(0);
  const [activeClass, setActiveClass] = useState(0);
  const [attendance, setAttendance] = useState(students.map(s => s.status));
  const [grades, setGrades] = useState(gradeStudents.map(s => s.score));

  const classes = ['Class 9-A', 'Class 10-A', 'Class 11-B'];

  const toggleAttendance = (idx) => {
    const states = ['present', 'absent', 'late'];
    setAttendance(prev => {
      const next = [...prev];
      const currentIdx = states.indexOf(next[idx]);
      next[idx] = states[(currentIdx + 1) % 3];
      return next;
    });
  };

  const presentCount = attendance.filter(s => s === 'present').length;
  const absentCount = attendance.filter(s => s === 'absent').length;
  const lateCount = attendance.filter(s => s === 'late').length;

  const attRowStyle = (status) => {
    if (status === 'present') return 'border-green-300 bg-green-50';
    if (status === 'absent') return 'border-red-300 bg-red-50';
    if (status === 'late') return 'border-yellow-300 bg-amber-50';
    return 'border-emerald-200 bg-green-50/50';
  };

  return (
    <div className="flex min-h-screen bg-green-50 font-['Plus_Jakarta_Sans',sans-serif] text-[#0f2d1a]">
      {/* SIDEBAR */}
      <aside className="w-[250px] bg-[#0f2d1a] flex flex-col fixed top-0 left-0 bottom-0 z-50">
        {/* Logo */}
        <div className="px-5 py-[22px] border-b border-white/[0.06] flex items-center gap-2.5">
          <div className="w-[38px] h-[38px] bg-gradient-to-br from-green-600 to-green-400 rounded-[11px] flex items-center justify-center text-[19px]">🎓</div>
          <div>
            <div className="text-[15px] font-bold text-white">EduCore OS</div>
            <div className="text-[10px] text-white/35 tracking-[0.1em] uppercase">Teacher Portal</div>
          </div>
        </div>

        {/* Teacher Card */}
        <div className="mx-3.5 my-3.5 bg-green-400/[0.08] border border-green-400/15 rounded-xl p-3.5 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-800 to-green-500 flex items-center justify-center text-[15px] font-extrabold text-white shrink-0">AH</div>
          <div>
            <div className="text-[13px] font-bold text-white">Amina Hassan</div>
            <div className="text-[11px] text-white/40">Mathematics · Class 9-A, 10-A</div>
          </div>
          <div className="ml-auto bg-green-400/15 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-[5px] h-[5px] rounded-full bg-green-400 animate-pulse-dot" />Active
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-1.5 overflow-y-auto">
          {navItems.map((item, i) => (
            <div key={i}>
              {item.section && (
                <div className="px-5 pt-2.5 pb-1 text-[10px] font-bold text-white/20 uppercase tracking-[0.12em]">{item.section}</div>
              )}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveNav(i); }}
                className={`flex items-center gap-2.5 py-2 px-5 mx-2 rounded-lg text-[13.5px] font-medium transition-all duration-150 no-underline
                  ${activeNav === i ? 'text-green-400 bg-green-400/[0.12] font-semibold' : 'text-white/50 hover:text-white/[0.85] hover:bg-white/[0.06]'}`}
              >
                {item.label}
                {item.dot && (
                  <span className={`ml-auto w-[18px] h-[18px] ${item.dot.color} text-white text-[10px] font-bold rounded-full flex items-center justify-center`}>
                    {item.dot.text}
                  </span>
                )}
              </a>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3.5 border-t border-white/[0.06] flex gap-2">
          <button className="flex-1 py-2 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/45 text-xs font-semibold cursor-pointer font-['Plus_Jakarta_Sans'] transition-all hover:bg-white/[0.08] hover:text-white text-center">🔔 Alerts</button>
          <button className="flex-1 py-2 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/45 text-xs font-semibold cursor-pointer font-['Plus_Jakarta_Sans'] transition-all hover:bg-white/[0.08] hover:text-white text-center">🚪 Logout</button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ml-[250px] flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="bg-white border-b border-emerald-200 px-7 h-[62px] flex items-center justify-between sticky top-0 z-40">
          <div>
            <div className="text-lg font-extrabold text-[#0f2d1a]">Teacher Dashboard</div>
            <div className="text-xs text-[#86b898] mt-px">Wednesday, 5 March 2025 · Al-Noor Academy</div>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold cursor-pointer border border-green-200 bg-white text-[#3d6b4f] hover:bg-emerald-50 transition-all font-['Plus_Jakarta_Sans']">📤 Export</button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold cursor-pointer border-none bg-green-600 text-white hover:bg-green-800 transition-all font-['Plus_Jakarta_Sans']">+ Upload Homework</button>
            <div className="w-[38px] h-[38px] bg-white border border-emerald-200 rounded-lg flex items-center justify-center text-base cursor-pointer relative hover:bg-emerald-50 transition-colors">
              🔔
              <div className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full bg-red-500 border-2 border-white" />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-[22px_28px] flex-1">
          {/* TODAY STRIP */}
          <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl px-6 py-5 flex items-center justify-between mb-5 relative overflow-hidden animate-fade-up">
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[64px] opacity-[0.08]">🎓</div>
            <div>
              <h3 className="text-lg font-extrabold text-white mb-1">Good Morning, Ms. Amina! 👋</h3>
              <p className="text-[13px] text-white/55">You have 4 classes today · 2 homework deadlines · 5 new submissions</p>
            </div>
            <div className="flex gap-2.5">
              {[
                { icon: '📋', label: 'Attendance', value: '✓', suffix: 'Marked' },
                { icon: '📚', label: 'Homework due', value: 'Today', suffix: '' },
                { icon: '📩', label: 'Submissions', value: '5', suffix: 'New' },
              ].map((pill, i) => (
                <div key={i} className="bg-white/10 border border-white/[0.12] text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5">
                  {pill.icon} {pill.label} <span className="text-green-400 text-base font-extrabold">{pill.value}</span> {pill.suffix}
                </div>
              ))}
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="grid grid-cols-4 gap-3.5 mb-5">
            {[
              { icon: '👨‍🎓', bg: 'bg-green-100', val: '76', label: 'My Students', change: '↑ 2 new this week', up: true },
              { icon: '📋', bg: 'bg-blue-100', val: '94%', label: 'Avg Attendance', change: '↑ Above school avg', up: true },
              { icon: '📚', bg: 'bg-orange-100', val: '5', label: 'Pending Submissions', change: '↓ Need grading', up: false },
              { icon: '⭐', bg: 'bg-yellow-100', val: '78%', label: 'Class Avg Score', change: '↑ +3% this month', up: true },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-emerald-200 rounded-[14px] p-4 flex items-center gap-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,80,40,0.07)] cursor-default animate-fade-up" style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${card.bg}`}>{card.icon}</div>
                <div>
                  <div className="text-[26px] font-extrabold text-[#0f2d1a] leading-none font-['JetBrains_Mono',monospace]">{card.val}</div>
                  <div className="text-xs text-[#86b898] mt-0.5">{card.label}</div>
                  <div className={`text-[11px] mt-0.5 ${card.up ? 'text-green-600' : 'text-red-500'}`}>{card.change}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ROW 1: ATTENDANCE + SCHEDULE */}
          <div className="grid grid-cols-[1.3fr_1fr] gap-4 mb-4">
            {/* ATTENDANCE TAKER */}
            <div className="bg-white border border-emerald-200 rounded-2xl overflow-hidden animate-fade-up">
              <div className="px-[18px] py-3.5 border-b border-emerald-200 flex items-center justify-between">
                <div className="text-sm font-bold text-[#0f2d1a] flex items-center gap-[7px]">📋 Mark Attendance</div>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2.5">
                    <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">✅ {presentCount} P</div>
                    <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-600">❌ {absentCount} A</div>
                    <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">⏰ {lateCount} L</div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg border-none bg-green-600 text-white text-xs font-semibold cursor-pointer font-['Plus_Jakarta_Sans'] hover:bg-green-800 transition-all">Submit</button>
                </div>
              </div>
              <div className="p-[18px]">
                <div className="flex gap-1.5 mb-3.5">
                  {classes.map((cls, i) => (
                    <button key={i} onClick={() => setActiveClass(i)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border-[1.5px] transition-all font-['Plus_Jakarta_Sans']
                        ${activeClass === i ? 'bg-green-600 text-white border-green-600' : 'bg-white text-[#3d6b4f] border-green-200'}`}>
                      {cls}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {students.map((student, i) => (
                    <div key={i} onClick={() => toggleAttendance(i)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-[10px] border-[1.5px] cursor-pointer transition-all hover:border-green-200 ${attRowStyle(attendance[i])}`}>
                      <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: student.color }}>{student.initials}</div>
                      <div>
                        <div className="text-xs font-semibold text-[#0f2d1a]">{student.name}</div>
                        <div className="text-[10px] text-[#86b898]">Roll #{student.roll}</div>
                      </div>
                      <div className="flex gap-[3px] ml-auto">
                        <div className={`w-6 h-6 rounded-md border-[1.5px] border-green-200 bg-white text-[11px] flex items-center justify-center cursor-pointer transition-all ${attendance[i] === 'present' ? 'bg-green-500 border-green-500' : ''}`}>✓</div>
                        <div className={`w-6 h-6 rounded-md border-[1.5px] border-green-200 bg-white text-[11px] flex items-center justify-center cursor-pointer transition-all ${attendance[i] === 'absent' ? 'bg-red-500 border-red-500' : ''}`}>✗</div>
                        <div className={`w-6 h-6 rounded-md border-[1.5px] border-green-200 bg-white text-[11px] flex items-center justify-center cursor-pointer transition-all ${attendance[i] === 'late' ? 'bg-yellow-500 border-yellow-500' : ''}`}>⏰</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SCHEDULE */}
            <div className="bg-white border border-emerald-200 rounded-2xl overflow-hidden animate-fade-up">
              <div className="px-[18px] py-3.5 border-b border-emerald-200 flex items-center justify-between">
                <div className="text-sm font-bold text-[#0f2d1a] flex items-center gap-[7px]">🗓️ Today's Schedule</div>
                <button className="text-xs text-green-600 font-bold cursor-pointer bg-transparent border-none font-['Plus_Jakarta_Sans']">Full timetable →</button>
              </div>
              <div className="p-[18px]">
                <div className="flex flex-col gap-2">
                  {scheduleItems.map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 px-3.5 py-[11px] rounded-[10px] border cursor-pointer transition-all
                      ${item.current
                        ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'
                        : 'border-emerald-200 bg-green-50/50 hover:border-green-200 hover:bg-emerald-50'}`}>
                      <div className={`font-['JetBrains_Mono',monospace] text-[11px] font-semibold w-[70px] shrink-0 ${item.current ? 'text-green-800' : 'text-[#86b898]'}`}>{item.time}</div>
                      <div className="w-1 h-9 rounded-full shrink-0" style={{ background: item.color }} />
                      <div className="flex-1">
                        <div className="text-[13px] font-bold text-[#0f2d1a]">{item.subject}</div>
                        <div className="text-[11px] text-[#86b898]">{item.cls}</div>
                      </div>
                      <div className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border
                        ${item.current ? 'bg-green-600 text-white border-green-600' : 'bg-white text-[#3d6b4f] border-emerald-200'}`}>{item.room}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2: HOMEWORK + SUBMISSIONS */}
          <div className="grid grid-cols-[1.3fr_1fr] gap-4 mb-4">
            {/* HOMEWORK TABLE */}
            <div className="bg-white border border-emerald-200 rounded-2xl overflow-hidden animate-fade-up">
              <div className="px-[18px] py-3.5 border-b border-emerald-200 flex items-center justify-between">
                <div className="text-sm font-bold text-[#0f2d1a] flex items-center gap-[7px]">📚 Homework Assignments</div>
                <button className="text-xs text-green-600 font-bold cursor-pointer bg-transparent border-none font-['Plus_Jakarta_Sans']">+ New →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {['Assignment', 'Class', 'Due', 'Submitted', 'Status'].map(h => (
                        <th key={h} className="text-[11px] font-semibold text-[#86b898] text-left px-3.5 pb-2.5 uppercase tracking-wider border-b border-emerald-200">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {homeworkData.map((hw, i) => (
                      <tr key={i} className="border-b border-emerald-200 last:border-b-0 hover:bg-green-50/50 transition-colors cursor-pointer">
                        <td className="px-3.5 py-[11px]">
                          <div className="font-semibold text-[13px] text-[#0f2d1a]">{hw.title}</div>
                          <div className="text-[11px] text-[#86b898]">{hw.sub}</div>
                        </td>
                        <td className="px-3.5 py-[11px]"><span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{hw.cls}</span></td>
                        <td className="px-3.5 py-[11px]"><span className="font-['JetBrains_Mono',monospace] text-xs">{hw.due}</span></td>
                        <td className="px-3.5 py-[11px]">
                          <div className="flex items-center gap-1.5">
                            <div className="flex-1 h-[5px] bg-emerald-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400" style={{ width: `${hw.pct}%` }} />
                            </div>
                            <div className="text-[11px] font-['JetBrains_Mono',monospace] text-[#86b898] w-[30px] text-right">{hw.submitted}</div>
                          </div>
                        </td>
                        <td className="px-3.5 py-[11px]"><span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full ${hw.statusColor}`}>{hw.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RECENT SUBMISSIONS */}
            <div className="bg-white border border-emerald-200 rounded-2xl overflow-hidden animate-fade-up">
              <div className="px-[18px] py-3.5 border-b border-emerald-200 flex items-center justify-between">
                <div className="text-sm font-bold text-[#0f2d1a] flex items-center gap-[7px]">📩 Recent Submissions</div>
                <button className="text-xs text-green-600 font-bold cursor-pointer bg-transparent border-none font-['Plus_Jakarta_Sans']">Grade all →</button>
              </div>
              <div className="p-[18px]">
                <div className="flex flex-col gap-2">
                  {submissions.map((sub, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] border border-emerald-200 bg-green-50/50 cursor-pointer transition-all hover:bg-emerald-50 hover:border-green-200">
                      <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: sub.color }}>{sub.initials}</div>
                      <div>
                        <div className="text-[13px] font-semibold text-[#0f2d1a]">{sub.name}</div>
                        <div className="text-[11px] text-[#86b898]">{sub.detail}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1 ml-auto">
                        <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full ${sub.badgeColor}`}>{sub.badge}</span>
                        <div className="text-[11px] text-[#86b898] font-['JetBrains_Mono',monospace] whitespace-nowrap">{sub.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: GRADE INPUT + TOP STUDENTS */}
          <div className="grid grid-cols-[1fr_1.6fr] gap-4 mb-4">
            {/* GRADE INPUT */}
            <div className="bg-white border border-emerald-200 rounded-2xl overflow-hidden animate-fade-up">
              <div className="px-[18px] py-3.5 border-b border-emerald-200 flex items-center justify-between">
                <div className="text-sm font-bold text-[#0f2d1a] flex items-center gap-[7px]">✏️ Quick Grade Entry — Algebra Quiz (9-A)</div>
                <button className="text-xs text-green-600 font-bold cursor-pointer bg-transparent border-none font-['Plus_Jakarta_Sans']">Save All →</button>
              </div>
              <div className="p-[18px]">
                {gradeStudents.map((student, i) => {
                  const grade = getGradeLetter(grades[i]);
                  return (
                    <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] border border-emerald-200 bg-green-50/50 mb-2 hover:bg-emerald-50 transition-colors">
                      <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: student.color }}>{student.initials}</div>
                      <div className="flex-1">
                        <div className="text-[13px] font-semibold text-[#0f2d1a]">{student.name}</div>
                        <div className="text-[11px] text-[#86b898]">Roll #{student.roll}</div>
                      </div>
                      <input
                        className="w-[52px] px-2 py-1 border-[1.5px] border-green-200 rounded-[7px] text-[13px] font-bold text-green-800 text-center font-['JetBrains_Mono',monospace] bg-white outline-none focus:border-green-400 transition-colors"
                        value={grades[i]}
                        onChange={(e) => {
                          const val = e.target.value;
                          setGrades(prev => {
                            const next = [...prev];
                            next[i] = val === '' ? '' : parseInt(val) || 0;
                            return next;
                          });
                        }}
                      />
                      <div className={`w-7 h-7 rounded-[7px] flex items-center justify-center text-[13px] font-extrabold ${grade.bg} ${grade.color}`}>{grade.letter}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOP STUDENTS */}
            <div className="bg-white border border-emerald-200 rounded-2xl overflow-hidden animate-fade-up">
              <div className="px-[18px] py-3.5 border-b border-emerald-200 flex items-center justify-between">
                <div className="text-sm font-bold text-[#0f2d1a] flex items-center gap-[7px]">🏆 Top Students — Class 9-A</div>
                <button className="text-xs text-green-600 font-bold cursor-pointer bg-transparent border-none font-['Plus_Jakarta_Sans']">All students →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {['#', 'Student', 'Avg Score', 'Attendance', 'Status'].map(h => (
                        <th key={h} className="text-[11px] font-semibold text-[#86b898] text-left px-3.5 pb-2.5 uppercase tracking-wider border-b border-emerald-200">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topStudents.map((s, i) => (
                      <tr key={i} className="border-b border-emerald-200 last:border-b-0 hover:bg-green-50/50 transition-colors cursor-pointer">
                        <td className={`px-3.5 py-[11px] font-['JetBrains_Mono',monospace] font-bold ${s.rankColor}`}>{s.rank}</td>
                        <td className="px-3.5 py-[11px]">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: s.color }}>{s.initials}</div>
                            <div className="font-semibold text-[13px]">{s.name}</div>
                          </div>
                        </td>
                        <td className="px-3.5 py-[11px]"><span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.statusColor}`}>{s.score}</span></td>
                        <td className="px-3.5 py-[11px]">
                          <div className="flex items-center gap-1.5">
                            <div className="flex-1 h-[5px] bg-emerald-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${s.attendance}%`, background: s.progGradient || 'linear-gradient(90deg, #16a34a, #4ade80)' }} />
                            </div>
                            <div className="text-[11px] font-['JetBrains_Mono',monospace] text-[#86b898] w-[30px] text-right">{s.attendance}%</div>
                          </div>
                        </td>
                        <td className="px-3.5 py-[11px]"><span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.statusColor}`}>{s.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}