import { useEffect, useRef, useState } from "react";

// ── inject keyframes ──
const CSS = `
  @keyframes cardPopIn {
    0%   { opacity: 0; transform: translateY(32px) scale(0.97); }
    100% { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes popularPulse {
    0%,100% { box-shadow: 0 8px 40px rgba(10,61,31,0.25); }
    50%     { box-shadow: 0 16px 60px rgba(10,61,31,0.4); }
  }
  @keyframes tagBounce {
    0%,100% { transform: translateX(-50%) translateY(0);   }
    50%     { transform: translateX(-50%) translateY(-3px);}
  }
  @keyframes checkPop {
    0%   { opacity: 0; transform: scale(0); }
    70%  { transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .pricing-card-animated {
    opacity: 0;
    transition: opacity 0.55s ease, transform 0.55s ease,
                box-shadow 0.3s ease;
  }
  .pricing-card-animated.visible {
    opacity: 1;
    animation: cardPopIn 0.55s ease both;
  }
  .pricing-card-animated:not(.popular-card):hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(10,61,31,0.1);
  }
  .popular-card {
    animation: popularPulse 3s 1s ease-in-out infinite;
  }
  .popular-tag-badge {
    animation: tagBounce 2.5s ease-in-out infinite;
  }
  .check-item {
    opacity: 0;
    transform: scale(0);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .check-item.visible {
    opacity: 1;
    transform: scale(1);
    animation: checkPop 0.3s ease both;
  }
  .shimmer-btn {
    background-size: 200% auto;
    transition: background-position 0.5s ease, transform 0.2s ease;
  }
  .shimmer-btn:hover {
    background-position: right center;
    transform: translateY(-1px);
  }
`;

function useInjectStyles(id, css) {
  useEffect(() => {
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.innerHTML = css;
    document.head.appendChild(tag);
    return () => document.getElementById(id)?.remove();
  }, []);
}

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

// ── data ──
const PLANS = [
  {
    tier: "Starter",
    price: "15K",
    period: "PKR / month",
    students: "Up to 200 students",
    popular: false,
    features: [
      "Attendance System",
      "Fee Management",
      "Parent Notifications",
      "Basic Reports",
    ],
  },
  {
    tier: "Growth",
    price: "35K",
    period: "PKR / month",
    students: "Up to 500 students",
    popular: true,
    features: [
      "Everything in Starter",
      "Homework Tracker",
      "Smart Timetable",
      "Parent Mobile App",
      "Advanced Analytics",
    ],
  },
  {
    tier: "Pro",
    price: "75K",
    period: "PKR / month",
    students: "Up to 1000 students",
    popular: false,
    features: [
      "Everything in Growth",
      "AI Performance Analyzer",
      "Mental Health Monitor",
      "Transport GPS Tracking",
    ],
  },
];

// ── check item with stagger ──
function CheckItem({ text, delay, popular }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`check-item flex items-center gap-2.5 text-[14px]
        ${popular ? "text-white/75" : "text-[#2d5a3d]"}
        ${visible ? "visible" : ""}`}
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center
          text-[11px] flex-shrink-0
          ${popular
            ? "bg-[rgba(78,202,120,0.2)] text-[#4eca78]"
            : "bg-[#f3fdf6] text-[#28a755]"
          }`}
      >
        ✓
      </div>
      {text}
    </div>
  );
}

// ── single pricing card ──
function PricingCard({ plan, delay }) {
  const [cardRef, cardVisible] = useReveal(delay);

  return (
    <div
      ref={cardRef}
      className={`pricing-card-animated relative
        rounded-3xl px-8 py-9 border
        ${plan.popular
          ? "popular-card bg-[#0a3d1f] border-transparent scale-[1.04]"
          : "bg-white border-[rgba(40,167,85,0.1)]"
        }
        ${cardVisible ? "visible" : ""}`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div
          className="popular-tag-badge absolute -top-3 left-1/2
            bg-[#4eca78] text-[#0a3d1f]
            text-[11px] font-extrabold px-4 py-1 rounded-full
            tracking-[0.08em] uppercase whitespace-nowrap
            shadow-[0_4px_12px_rgba(78,202,120,0.4)]"
        >
          ⭐ Most Popular
        </div>
      )}

      {/* Tier */}
      <div
        className={`text-[13px] font-bold tracking-[0.1em] uppercase mb-2
          ${plan.popular ? "text-[#a3f0bc]" : "text-[#28a755]"}`}
      >
        {plan.tier}
      </div>

      {/* Price */}
      <div
        className={`font-extrabold text-[44px] leading-none mb-1
          ${plan.popular ? "text-white" : "text-[#0a3d1f]"}`}
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {plan.price}
      </div>

      {/* Period */}
      <div
        className={`text-[13px] mb-1
          ${plan.popular ? "text-white/50" : "text-[#6b9e7e]"}`}
      >
        {plan.period}
      </div>

      {/* Students */}
      <div
        className={`text-[12px] font-semibold mb-7
          inline-flex items-center gap-1.5
          ${plan.popular ? "text-[#4eca78]" : "text-[#1e7a40]"}`}
      >
        <span>👥</span> {plan.students}
      </div>

      {/* Divider */}
      <div
        className={`h-px mb-6
          ${plan.popular ? "bg-white/10" : "bg-[rgba(40,167,85,0.1)]"}`}
      />

      {/* Features */}
      <div className="flex flex-col gap-3 mb-8">
        {plan.features.map((f, i) => (
          <CheckItem
            key={f}
            text={f}
            delay={delay + 200 + i * 80}
            popular={plan.popular}
          />
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="#"
        className={`shimmer-btn block text-center py-3.5 rounded-full
          text-[15px] font-semibold no-underline transition-all duration-200
          ${plan.popular
            ? "bg-white text-[#0a3d1f] hover:bg-[#a3f0bc] shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
            : "bg-[#f3fdf6] text-[#0a3d1f] hover:bg-[#e8faf0]"
          }`}
      >
        Get Started →
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────
export default function Pricing() {
  useInjectStyles("pricing-styles", CSS);

  const [headRef, headVisible] = useReveal(0);
  const [noteRef, noteVisible] = useReveal(600);

  return (
    <section
      id="pricing"
      className="px-6 md:px-16 py-[100px] bg-[#f7fdf9] relative overflow-hidden"
    >
      {/* ── BG GLOW ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
          pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(78,202,120,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── HEADER ── */}
      <div ref={headRef} className="max-w-[560px] mb-16">
        <div
          className={`text-[12px] font-bold tracking-[0.12em] uppercase
            text-[#1e7a40] mb-4 transition-all duration-600
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          Pricing
        </div>
        <h2
          className={`font-extrabold leading-[1.1] text-[#0a3d1f] mb-5
            transition-all duration-700 delay-100
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(36px, 4vw, 56px)",
          }}
        >
          Simple, transparent
          <br />
          pricing for every school
        </h2>
        <p
          className={`text-[17px] leading-[1.7] text-[#2d5a3d]
            transition-all duration-700 delay-200
            ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          All plans include a 3-month free trial. No credit card required.
        </p>
      </div>

      {/* ── CARDS ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6
          max-w-[900px] items-center"
      >
        {PLANS.map((plan, i) => (
          <PricingCard
            key={plan.tier}
            plan={plan}
            delay={i * 120}
          />
        ))}
      </div>

      {/* ── BOTTOM NOTE ── */}
      <div
        ref={noteRef}
        className={`mt-14 flex flex-col sm:flex-row items-center
          justify-between gap-6 pt-10
          border-t border-[rgba(40,167,85,0.12)]
          transition-all duration-700
          ${noteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        {/* Note text */}
        <div className="flex items-center gap-3 text-[14px] text-[#6b9e7e]">
          <span className="text-xl">🇵🇰</span>
          Prices in PKR. Enterprise pricing available for 1000+ student schools.
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-4">
          {[
            ["🔒", "Secure payments"],
            ["🎓", "3-month free trial"],
            ["💬", "Free onboarding"],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-[12px] font-semibold
                text-[#2d5a3d] bg-white px-3 py-2 rounded-full
                border border-[rgba(40,167,85,0.1)]
                shadow-sm"
            >
              <span>{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}