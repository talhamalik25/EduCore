const SCREEN_TITLES = {
  home:       null,            // home shows greeting instead
  schedule:   "My Schedule",
  attendance: "Mark Attendance",
  homework:   "Homework",
  students:   "My Students",
};

export default function TopBar({ screen, onNotif }) {
  const title = SCREEN_TITLES[screen];
  const hour  = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 17 ? "Good afternoon" :
                "Good evening";

  return (
    <header
      className="sticky top-0 z-40 bg-[#0a1a0f]
        border-b border-white/[0.06]"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="flex items-center justify-between px-5 py-4">

        {/* Left — greeting or screen title */}
        <div>
          {screen === "home" ? (
            <>
              <p className="text-[12px] text-white/40 font-medium mb-0.5">
                {greeting} 👋
              </p>
              <h1
                className="text-[20px] font-extrabold text-white leading-none"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Mr. Ali Hassan
              </h1>
            </>
          ) : (
            <>
              <p className="text-[11px] text-white/35 font-medium mb-0.5">
                EduCore OS
              </p>
              <h1
                className="text-[18px] font-extrabold text-white leading-none"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {title}
              </h1>
            </>
          )}
        </div>

        {/* Right — notif + avatar */}
        <div className="flex items-center gap-3">

          {/* Notification bell */}
          <button
            onClick={onNotif}
            className="relative w-9 h-9 rounded-xl flex items-center
              justify-center text-[16px] border-0 cursor-pointer
              transition-all duration-200 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            🔔
            {/* Red dot */}
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2
                rounded-full bg-red-500 border-2 border-[#0a1a0f]"
            />
          </button>

          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-xl flex items-center
              justify-center text-[13px] font-bold text-white
              flex-shrink-0"
            style={{
              background: "linear-gradient(135deg,#1e7a40,#4eca78)",
              boxShadow: "0 2px 8px rgba(30,122,64,0.4)",
            }}
          >
            AH
          </div>
        </div>
      </div>
    </header>
  );
}