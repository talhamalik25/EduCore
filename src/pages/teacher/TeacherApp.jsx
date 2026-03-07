import { useEffect, useState } from "react";
import TopBar from "../../Components/teacher/TopBar";
import BottomNav from "../../Components/teacher/Bottomnav";
import ScheduleScreen from "../../Components/teacher/screens/Schedulescreen";
import AttendanceScreen from "../../Components/teacher/screens/Attendancescreen";
import HomeworkScreen from "../../Components/teacher/screens/Homeworkscreen";
import StudentsScreen from "../../Components/teacher/screens/Studentsscreen";
import HomeScreen from "../../Components/teacher/screens/Homescreen";
// ── global styles ──
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #060e08;
    color: white;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: rgba(78,202,120,0.3); color: white; }

  /* hide scrollbar */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* screen transitions */
  @keyframes screenIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .screen-enter {
    animation: screenIn 0.3s ease both;
  }

  /* app shell */
  @keyframes appIn {
    from { opacity: 0; transform: scale(0.98); }
    to   { opacity: 1; transform: scale(1);    }
  }
  .app-shell {
    animation: appIn 0.4s ease both;
  }
`;

function useInjectStyles(css) {
  useEffect(() => {
    const id = "teacher-app-styles";
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id  = id;
    tag.innerHTML = css;
    document.head.appendChild(tag);
    return () => document.getElementById(id)?.remove();
  }, []);
}

const SCREENS = {
  home:       HomeScreen,
  schedule:   ScheduleScreen,
  attendance: AttendanceScreen,
  homework:   HomeworkScreen,
  students:   StudentsScreen,
};

export default function TeacherApp() {
  useInjectStyles(CSS);
  const [screen, setScreen] = useState("home");
  const [screenKey, setScreenKey] = useState(0);

  function navigate(s) {
    setScreen(s);
    setScreenKey((k) => k + 1);
  }

  const ActiveScreen = SCREENS[screen];

  return (
    // ── outer centering wrapper (desktop) ──
    <div
      className="min-h-screen flex items-start justify-center"
      style={{ background: "#060e08" }}
    >
      {/* ── PHONE SHELL ── */}
      <div
        className="app-shell relative flex flex-col bg-[#0a1a0f]"
        style={{
          width: "min(430px, 100vw)",
          minHeight: "100vh",
        }}
      >

        {/* ── STICKY TOP BAR ── */}
        <TopBar screen={screen} onNotif={() => {}} />

        {/* ── SCROLLABLE SCREEN CONTENT ── */}
        <main
          key={screenKey}
          className="screen-enter flex-1 overflow-y-auto no-scrollbar"
          style={{ paddingBottom: "80px" }}
        >
          <ActiveScreen onNavigate={navigate} />
        </main>

        {/* ── BOTTOM NAV ── */}
        <BottomNav active={screen} onChange={navigate} />

      </div>
    </div>
  );
}