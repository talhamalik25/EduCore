import { useEffect, useState } from "react";

 function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features",     href: "#features" },
    { label: "How It Works", href: "#how"      },
    { label: "Pricing",      href: "#pricing"  },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-16 py-[18px] bg-white/85 backdrop-blur-xl
        border-b border-green-500/10 transition-shadow duration-300
        ${scrolled ? "shadow-[0_4px_24px_rgba(10,61,31,0.08)]" : "shadow-none"}`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2.5 no-underline group">
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center
            text-lg shadow-[0_4px_12px_rgba(30,122,64,0.3)]
            group-hover:scale-105 transition-transform duration-200"
          style={{ background: "linear-gradient(135deg,#1e7a40,#4eca78)" }}
        >
          🎓
        </div>
        <span
          className="font-extrabold text-[22px] text-[#0a3d1f] leading-none"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          EduCore OS
        </span>
      </a>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-9 list-none">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-[15px] font-medium text-[#2d5a3d] no-underline
                hover:text-[#1e7a40] transition-colors duration-200"
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            className="text-[15px] font-semibold text-white no-underline
              bg-[#0a3d1f] px-6 py-2.5 rounded-full
              hover:bg-[#145a2e] hover:-translate-y-px
              transition-all duration-200
              shadow-[0_4px_14px_rgba(10,61,31,0.2)]"
          >
            Get Started →
          </a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-[#0a3d1f] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#0a3d1f] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#0a3d1f] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-green-100
          shadow-lg px-6 py-4 flex flex-col gap-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[15px] font-medium text-[#2d5a3d] no-underline
                hover:text-[#1e7a40] transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            className="text-center text-[15px] font-semibold text-white no-underline
              bg-[#0a3d1f] px-6 py-2.5 rounded-full mt-1
              hover:bg-[#145a2e] transition-colors"
          >
            Get Started →
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;