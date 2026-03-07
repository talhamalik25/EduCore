import { useState } from "react";

const ROLE_CONFIG = {
  admin: {
    accent:      "#0a3d1f",
    accentHover: "#145a2e",
    accentLight: "rgba(10,61,31,0.06)",
    accentRing:  "rgba(10,61,31,0.2)",
    placeholder: "principal@school.edu.pk",
    label:       "Admin Portal",
  },
  teacher: {
    accent:      "#1d4ed8",
    accentHover: "#1e40af",
    accentLight: "rgba(29,78,216,0.06)",
    accentRing:  "rgba(29,78,216,0.2)",
    placeholder: "teacher@school.edu.pk",
    label:       "Teacher Portal",
  },
  parent: {
    accent:      "#7c3aed",
    accentHover: "#6d28d9",
    accentLight: "rgba(124,58,237,0.06)",
    accentRing:  "rgba(124,58,237,0.2)",
    placeholder: "parent@gmail.com",
    label:       "Parent Portal",
  },
};

export default function LoginForm({ role }) {
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus]   = useState(false);

  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.admin;

  function validate() {
    if (!email.trim())    return "Please enter your email address.";
    if (!email.includes("@")) return "Please enter a valid email.";
    if (!password)        return "Please enter your password.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    // Simulate API call — replace with real axios call
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    // TODO: navigate to dashboard based on role
    // navigate(`/${role}/dashboard`);
    alert(`✅ Logged in as ${role} — connect your API here!`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>

      {/* ── EMAIL ── */}
      <div className="mb-5">
        <label
          className="block text-[13px] font-semibold text-[#2d5a3d] mb-2"
        >
          Email Address
        </label>
        <div className="relative">
          {/* Icon */}
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2
              text-[16px] pointer-events-none transition-opacity duration-200"
            style={{ opacity: emailFocus ? 1 : 0.4 }}
          >
            ✉️
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            placeholder={cfg.placeholder}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl text-[14px]
              font-medium text-[#0a3d1f] outline-none
              placeholder:text-[#6b9e7e]/50
              transition-all duration-200"
            style={{
              background: emailFocus ? "white" : cfg.accentLight,
              border: `1.5px solid ${emailFocus ? cfg.accent : "rgba(40,167,85,0.15)"}`,
              boxShadow: emailFocus ? `0 0 0 3px ${cfg.accentRing}` : "none",
            }}
          />
        </div>
      </div>

      {/* ── PASSWORD ── */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[13px] font-semibold text-[#2d5a3d]">
            Password
          </label>
          <a
            href="#"
            className="text-[12px] font-semibold no-underline
              hover:underline transition-colors duration-200"
            style={{ color: cfg.accent }}
          >
            Forgot password?
          </a>
        </div>

        <div className="relative">
          {/* Icon */}
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2
              text-[16px] pointer-events-none transition-opacity duration-200"
            style={{ opacity: passFocus ? 1 : 0.4 }}
          >
            🔒
          </div>

          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            onFocus={() => setPassFocus(true)}
            onBlur={() => setPassFocus(false)}
            placeholder="Enter your password"
            className="w-full pl-11 pr-12 py-3.5 rounded-xl text-[14px]
              font-medium text-[#0a3d1f] outline-none
              placeholder:text-[#6b9e7e]/50
              transition-all duration-200"
            style={{
              background: passFocus ? "white" : cfg.accentLight,
              border: `1.5px solid ${passFocus ? cfg.accent : "rgba(40,167,85,0.15)"}`,
              boxShadow: passFocus ? `0 0 0 3px ${cfg.accentRing}` : "none",
            }}
          />

          {/* Show/hide toggle */}
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2
              text-[16px] cursor-pointer border-0 bg-transparent p-0
              opacity-40 hover:opacity-80 transition-opacity duration-200"
            tabIndex={-1}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* ── ERROR MESSAGE ── */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: error ? "40px" : "0px", marginBottom: error ? "16px" : "0px" }}
      >
        <div
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl
            text-[12px] font-semibold"
          style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.15)" }}
        >
          <span>⚠️</span> {error}
        </div>
      </div>

      {/* ── REMEMBER ME ── */}
      <div className="flex items-center gap-2.5 mb-6">
        <div
          className="w-4 h-4 rounded-[4px] border-2 flex items-center
            justify-center cursor-pointer flex-shrink-0 transition-all duration-200"
          style={{ borderColor: cfg.accent, background: cfg.accentLight }}
        >
          <span className="text-[9px]" style={{ color: cfg.accent }}>✓</span>
        </div>
        <span className="text-[13px] text-[#6b9e7e] font-medium">
          Keep me signed in
        </span>
      </div>

      {/* ── SUBMIT BUTTON ── */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl text-[15px] font-bold
          text-white relative overflow-hidden
          transition-all duration-200 cursor-pointer border-0
          hover:-translate-y-0.5
          disabled:opacity-70 disabled:cursor-not-allowed
          disabled:transform-none"
        style={{
          background: loading
            ? cfg.accent
            : `linear-gradient(135deg, ${cfg.accent}, ${cfg.accentHover})`,
          boxShadow: `0 4px 20px ${cfg.accentRing}`,
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2.5">
            <LoadingSpinner />
            Signing in…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Sign In →
          </span>
        )}
      </button>

      {/* ── DIVIDER ── */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-[rgba(40,167,85,0.12)]" />
        <span className="text-[12px] text-[#6b9e7e] font-medium">or</span>
        <div className="flex-1 h-px bg-[rgba(40,167,85,0.12)]" />
      </div>

      {/* ── DEMO ACCESS ── */}
      <button
        type="button"
        onClick={() => {
          setEmail(cfg.placeholder);
          setPassword("demo1234");
        }}
        className="w-full py-3.5 rounded-xl text-[14px] font-semibold
          text-[#2d5a3d] border-0 cursor-pointer
          hover:-translate-y-0.5 hover:shadow-sm
          transition-all duration-200"
        style={{
          background: cfg.accentLight,
          border: `1.5px solid rgba(40,167,85,0.15)`,
        }}
      >
        🎓 Use Demo Credentials
      </button>

    </form>
  );
}

// ── spinner ──
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin"
      width="18" height="18"
      viewBox="0 0 24 24" fill="none"
    >
      <circle
        cx="12" cy="12" r="10"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}