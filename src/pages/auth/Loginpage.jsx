import { useEffect, useState } from "react";
import LoginForm from "../../Components/auth/LoginForm";
import RoleSelector from "../../Components/auth/RoleSelector";
import LoginLeftPanel from "../../Components/auth/LoginLeftPanel";

// ── inject styles ──
// const CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   html { scroll-behavior: smooth; }
//   body {
//     font-family: 'DM Sans', sans-serif;
//     background: #f7fdf9;
//     overflow-x: hidden;
//     -webkit-font-smoothing: antialiased;
//   }
//   ::selection { background: rgba(78,202,120,0.25); color: #0a3d1f; }

//   /* ── page entry ── */
//   @keyframes loginPageIn {
//     from { opacity: 0; }
//     to   { opacity: 1; }
//   }
//   @keyframes rightPanelIn {
//     from { opacity: 0; transform: translateX(24px); }
//     to   { opacity: 1; transform: translateX(0);    }
//   }
//   @keyframes leftPanelIn {
//     from { opacity: 0; transform: translateX(-24px); }
//     to   { opacity: 1; transform: translateX(0);     }
//   }
//   @keyframes formFadeUp {
//     from { opacity: 0; transform: translateY(16px); }
//     to   { opacity: 1; transform: translateY(0);    }
//   }
//   @keyframes panelSwitch {
//     0%   { opacity: 0; transform: translateY(8px);  }
//     100% { opacity: 1; transform: translateY(0);    }
//   }
//   @keyframes pulseDot {
//     0%,100% { opacity: 1; transform: scale(1);    }
//     50%     { opacity: 0.5; transform: scale(0.7); }
//   }

//   .login-page    { animation: loginPageIn 0.4s ease both;   }
//   .left-panel    { animation: leftPanelIn 0.7s 0.1s ease both; }
//   .right-panel   { animation: rightPanelIn 0.7s 0.15s ease both; }
//   .form-header   { animation: formFadeUp 0.6s 0.3s ease both; }
//   .role-selector { animation: formFadeUp 0.6s 0.4s ease both; }
//   .form-body     { animation: formFadeUp 0.6s 0.5s ease both; }

//   .panel-greeting,
//   .panel-title,
//   .panel-desc    { animation: panelSwitch 0.4s ease both; }
//   .panel-feature { animation: panelSwitch 0.4s ease both; }

//   .panel-stats-card {
//     animation: panelSwitch 0.5s 0.2s ease both;
//   }

//   .pulse-dot { animation: pulseDot 2s infinite; }

//   /* role transition — re-animate form on role change */
//   .form-role-transition {
//     animation: panelSwitch 0.3s ease both;
//   }

//   /* input autofill override */
//   input:-webkit-autofill,
//   input:-webkit-autofill:hover,
//   input:-webkit-autofill:focus {
//     -webkit-text-fill-color: #0a3d1f;
//     -webkit-box-shadow: 0 0 0 1000px #f0faf4 inset;
//     transition: background-color 5000s ease-in-out 0s;
//   }
// `;

function useInjectStyles(css) {
  useEffect(() => {
    const id = "login-styles";
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.innerHTML = css;
    document.head.appendChild(tag);
    return () => document.getElementById(id)?.remove();
  }, []);
}

// role display names & meta
const ROLE_META = {
  admin: {
    heading:  "Sign in to your school",
    sub:      "Access the principal dashboard and manage everything.",
    badge:    "Admin Portal",
    badgeBg:  "rgba(10,61,31,0.08)",
    badgeClr: "#0a3d1f",
    dot:      "#1e7a40",
  },
  teacher: {
    heading:  "Welcome back, Teacher",
    sub:      "Mark attendance, manage homework and track your students.",
    badge:    "Teacher Portal",
    badgeBg:  "rgba(29,78,216,0.08)",
    badgeClr: "#1d4ed8",
    dot:      "#1d4ed8",
  },
  parent: {
    heading:  "Stay close to your child",
    sub:      "Check attendance, pay fees and get instant school updates.",
    badge:    "Parent Portal",
    badgeBg:  "rgba(124,58,237,0.08)",
    badgeClr: "#7c3aed",
    dot:      "#7c3aed",
  },
};

export default function LoginPage() {
  useInjectStyles(CSS);
  const [role, setRole] = useState("admin");
  const [formKey, setFormKey] = useState(0);

  function handleRoleChange(r) {
    setRole(r);
    setFormKey((k) => k + 1); // remount form to reset fields
  }

  const meta = ROLE_META[role];

  return (
    <div className="login-page flex min-h-screen">

      {/* ── LEFT DECORATIVE PANEL ── */}
      <div className="left-panel">
        <LoginLeftPanel role={role} />
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div
        className="right-panel flex-1 flex flex-col justify-center
          px-8 md:px-16 lg:px-20 py-12 relative overflow-hidden
          min-h-screen bg-[#f7fdf9]"
      >
        {/* Subtle BG */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(78,202,120,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Mobile logo — only shown when left panel is hidden */}
        <div className="flex lg:hidden items-center gap-2.5 mb-10 relative z-10">
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center text-base"
            style={{ background: "linear-gradient(135deg,#1e7a40,#4eca78)" }}
          >
            🎓
          </div>
          <span
            className="font-extrabold text-[18px] text-[#0a3d1f]"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            EduCore <span className="text-[#1e7a40]">OS</span>
          </span>
        </div>

        {/* ── FORM CONTAINER ── */}
        <div className="relative z-10 w-full max-w-[420px]">

          {/* Form header */}
          <div className="form-header mb-8">
            {/* Portal badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5
                rounded-full text-[12px] font-bold mb-4
                border border-[rgba(40,167,85,0.12)]"
              style={{ background: meta.badgeBg, color: meta.badgeClr }}
            >
              <span
                className="pulse-dot w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ background: meta.dot }}
              />
              {meta.badge}
            </div>

            <h1
              className="font-extrabold text-[#0a3d1f] leading-[1.1] mb-2"
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(26px, 3vw, 36px)",
              }}
            >
              {meta.heading}
            </h1>
            <p className="text-[14px] text-[#6b9e7e] leading-[1.6]">
              {meta.sub}
            </p>
          </div>

          {/* Role selector */}
          <div className="role-selector">
            <RoleSelector role={role} onChange={handleRoleChange} />
          </div>

          {/* Form body — key forces remount on role change */}
          <div key={formKey} className="form-body form-role-transition">
            <LoginForm role={role} />
          </div>

          {/* Back to landing */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-[13px] text-[#6b9e7e] no-underline
                hover:text-[#1e7a40] transition-colors duration-200
                inline-flex items-center gap-1.5 font-medium"
            >
              ← Back to EduCore OS
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}