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
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50
      bg-white/85 backdrop-blur-xl border-b border-green-500/10
      transition-shadow duration-300
      ${scrolled ? "shadow-[0_4px_24px_rgba(10,61,31,0.08)]" : ""}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 lg:px-12">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-[10px] flex items-center justify-center text-base
            shadow-[0_4px_12px_rgba(30,122,64,0.3)]
            group-hover:scale-105 transition-transform duration-200"
            style={{ background: "linear-gradient(135deg,#1e7a40,#4eca78)" }}
          >
            🎓
          </div>

          <span
            className="font-extrabold text-[20px] text-[#0a3d1f] leading-none
            group-hover:text-[#1e7a40] transition-colors"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            EduCore OS
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-[15px] font-medium text-[#2d5a3d]
                hover:text-[#1e7a40] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#"
              className="text-[15px] font-semibold text-white
              bg-[#0a3d1f] px-5 py-2 rounded-full
              hover:bg-[#145a2e] hover:-translate-y-px
              transition-all duration-200
              shadow-[0_4px_14px_rgba(10,61,31,0.2)]"
            >
              Get Started →
            </a>
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#0a3d1f] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#0a3d1f] transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#0a3d1f] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-green-100 shadow-lg px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[15px] font-medium text-[#2d5a3d] hover:text-[#1e7a40]"
            >
              {l.label}
            </a>
          ))}

          <a
            href="#"
            className="text-center text-[15px] font-semibold text-white
            bg-[#0a3d1f] px-6 py-2.5 rounded-full
            hover:bg-[#145a2e]"
          >
            Get Started →
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;