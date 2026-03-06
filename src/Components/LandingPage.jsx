<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>EduCore OS — AI Powered School Operating System</title>
<link href="https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
  :root {
    --green-1: #0a3d1f;
    --green-2: #145a2e;
    --green-3: #1e7a40;
    --green-4: #28a755;
    --green-5: #4eca78;
    --green-6: #a3f0bc;
    --green-light: #e8faf0;
    --green-pale: #f3fdf6;
    --white: #ffffff;
    --off-white: #f7fdf9;
    --text-dark: #0a1f12;
    --text-mid: #2d5a3d;
    --text-light: #6b9e7e;
    --accent: #00ff88;
    --accent-dim: rgba(0,255,136,0.15);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--text-dark);
    overflow-x: hidden;
  }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 64px;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(40,167,85,0.12);
  }

  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 22px;
    color: var(--green-1);
    text-decoration: none;
  }

  .nav-logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--green-3), var(--green-5));
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }

  .nav-links {
    display: flex; align-items: center; gap: 36px;
    list-style: none;
  }

  .nav-links a {
    font-size: 15px; font-weight: 500;
    color: var(--text-mid);
    text-decoration: none;
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--green-3); }

  .nav-cta {
    background: var(--green-1);
    color: white !important;
    padding: 10px 24px;
    border-radius: 100px;
    font-weight: 600 !important;
    transition: background 0.2s, transform 0.2s !important;
  }

  .nav-cta:hover { background: var(--green-2) !important; transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 120px 64px 80px;
    position: relative;
    overflow: hidden;
    background: var(--off-white);
  }

  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 60% at 80% 20%, rgba(78,202,120,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 40% 50% at 10% 80%, rgba(20,90,46,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(40,167,85,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(40,167,85,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .hero-content {
    max-width: 680px;
    position: relative; z-index: 2;
    animation: fadeUp 0.8s ease both;
  }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent-dim);
    border: 1px solid rgba(0,255,136,0.3);
    color: var(--green-2);
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 13px; font-weight: 600;
    margin-bottom: 28px;
    animation: fadeUp 0.6s ease both;
  }

  .hero-badge-dot {
    width: 7px; height: 7px;
    background: var(--green-4);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 800;
    line-height: 1.05;
    color: var(--green-1);
    margin-bottom: 24px;
    animation: fadeUp 0.7s 0.1s ease both;
  }

  .hero h1 span {
    background: linear-gradient(135deg, var(--green-3), var(--green-5));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: 18px; line-height: 1.7;
    color: var(--text-mid);
    margin-bottom: 40px;
    max-width: 560px;
    animation: fadeUp 0.7s 0.2s ease both;
  }

  .hero-actions {
    display: flex; gap: 16px; flex-wrap: wrap;
    animation: fadeUp 0.7s 0.3s ease both;
  }

  .btn-primary {
    background: var(--green-1);
    color: white;
    padding: 15px 32px;
    border-radius: 100px;
    font-size: 16px; font-weight: 600;
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(10,61,31,0.2);
  }

  .btn-primary:hover {
    background: var(--green-2);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(10,61,31,0.3);
  }

  .btn-outline {
    background: transparent;
    color: var(--green-1);
    padding: 15px 32px;
    border-radius: 100px;
    font-size: 16px; font-weight: 600;
    text-decoration: none;
    border: 2px solid rgba(10,61,31,0.2);
    display: inline-flex; align-items: center; gap: 8px;
    transition: border-color 0.2s, transform 0.2s, background 0.2s;
  }

  .btn-outline:hover {
    border-color: var(--green-3);
    background: var(--green-pale);
    transform: translateY(-2px);
  }

  .hero-stats {
    display: flex; gap: 40px;
    margin-top: 56px;
    padding-top: 40px;
    border-top: 1px solid rgba(40,167,85,0.15);
    animation: fadeUp 0.7s 0.4s ease both;
  }

  .hero-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 32px; font-weight: 800;
    color: var(--green-3);
    line-height: 1;
  }

  .hero-stat-label {
    font-size: 13px; color: var(--text-light);
    margin-top: 4px;
  }

  .hero-visual {
    position: absolute;
    right: 0; top: 50%;
    transform: translateY(-50%);
    width: 46%;
    padding: 40px;
    z-index: 2;
    animation: fadeIn 1s 0.3s ease both;
  }

  .dashboard-mock {
    background: white;
    border-radius: 24px;
    box-shadow: 0 32px 80px rgba(10,61,31,0.15), 0 0 0 1px rgba(40,167,85,0.1);
    overflow: hidden;
  }

  .mock-topbar {
    background: var(--green-1);
    padding: 16px 24px;
    display: flex; align-items: center; gap: 12px;
  }

  .mock-dot { width: 10px; height: 10px; border-radius: 50%; }

  .mock-title {
    color: rgba(255,255,255,0.7);
    font-size: 13px; font-weight: 500;
    margin-left: 8px;
  }

  .mock-body { padding: 24px; background: var(--green-pale); }

  .mock-cards {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px; margin-bottom: 16px;
  }

  .mock-card {
    background: white;
    border-radius: 14px;
    padding: 16px;
    border: 1px solid rgba(40,167,85,0.1);
  }

  .mock-card-label { font-size: 11px; color: var(--text-light); margin-bottom: 6px; }
  .mock-card-val { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; color: var(--green-1); }
  .mock-card-sub { font-size: 11px; color: var(--green-4); margin-top: 2px; }

  .mock-chart {
    background: white;
    border-radius: 14px;
    padding: 16px;
    border: 1px solid rgba(40,167,85,0.1);
    margin-bottom: 12px;
  }

  .mock-chart-label { font-size: 12px; font-weight: 600; color: var(--text-mid); margin-bottom: 12px; }

  .mock-bars {
    display: flex; align-items: flex-end; gap: 8px; height: 60px;
  }

  .mock-bar {
    flex: 1; border-radius: 4px 4px 0 0;
    background: linear-gradient(180deg, var(--green-5), var(--green-3));
    transition: opacity 0.2s;
  }

  .mock-bar:nth-child(2) { opacity: 0.75; }
  .mock-bar:nth-child(3) { opacity: 0.9; }
  .mock-bar:nth-child(4) { opacity: 0.6; }
  .mock-bar:nth-child(5) { opacity: 0.85; }
  .mock-bar:nth-child(6) { opacity: 0.7; }

  .mock-list { display: flex; flex-direction: column; gap: 8px; }

  .mock-item {
    background: white;
    border-radius: 10px;
    padding: 10px 14px;
    display: flex; align-items: center; gap: 10px;
    border: 1px solid rgba(40,167,85,0.08);
    font-size: 12px;
  }

  .mock-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: white;
    flex-shrink: 0;
  }

  .mock-item-info { flex: 1; }
  .mock-item-name { font-weight: 600; color: var(--text-dark); font-size: 12px; }
  .mock-item-detail { color: var(--text-light); font-size: 11px; }

  .mock-badge {
    font-size: 10px; font-weight: 600; padding: 2px 8px;
    border-radius: 100px;
  }

  .badge-green { background: #dcfce7; color: #15803d; }
  .badge-orange { background: #fff7ed; color: #c2410c; }
  .badge-blue { background: #dbeafe; color: #1d4ed8; }

  /* ── PROBLEMS ── */
  .problems {
    padding: 100px 64px;
    background: var(--green-1);
    position: relative;
    overflow: hidden;
  }

  .problems::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 50% 80% at 100% 50%, rgba(78,202,120,0.1) 0%, transparent 60%);
    pointer-events: none;
  }

  .section-eyebrow {
    font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--green-5);
    margin-bottom: 16px;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 4vw, 56px);
    font-weight: 800;
    line-height: 1.1;
    color: white;
    margin-bottom: 20px;
  }

  .section-title.dark { color: var(--green-1); }

  .section-desc {
    font-size: 17px; line-height: 1.7;
    color: rgba(255,255,255,0.6);
    max-width: 520px;
    margin-bottom: 56px;
  }

  .section-desc.dark { color: var(--text-mid); }

  .problems-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    background: rgba(255,255,255,0.06);
    border-radius: 20px;
    overflow: hidden;
  }

  .problem-item {
    background: rgba(255,255,255,0.04);
    padding: 28px 24px;
    border: 1px solid rgba(255,255,255,0.04);
    transition: background 0.2s;
  }

  .problem-item:hover { background: rgba(78,202,120,0.08); }

  .problem-icon {
    font-size: 28px; margin-bottom: 12px;
    display: block;
  }

  .problem-title {
    font-weight: 700; font-size: 15px;
    color: white; margin-bottom: 6px;
  }

  .problem-desc {
    font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.5;
  }

  /* ── FEATURES ── */
  .features {
    padding: 100px 64px;
    background: var(--off-white);
  }

  .features-header { max-width: 600px; margin-bottom: 64px; }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .feature-card {
    background: white;
    border-radius: 20px;
    padding: 32px;
    border: 1px solid rgba(40,167,85,0.1);
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--green-3), var(--green-5));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s;
  }

  .feature-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(10,61,31,0.1);
    border-color: rgba(40,167,85,0.25);
  }

  .feature-card:hover::before { transform: scaleX(1); }

  .feature-card.featured {
    background: var(--green-1);
    border-color: transparent;
    grid-row: span 2;
  }

  .feature-icon {
    width: 52px; height: 52px;
    background: var(--green-pale);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    margin-bottom: 20px;
    flex-shrink: 0;
  }

  .feature-card.featured .feature-icon {
    background: rgba(255,255,255,0.1);
  }

  .feature-num {
    font-family: 'Syne', sans-serif;
    font-size: 12px; font-weight: 700;
    color: var(--green-5);
    margin-bottom: 8px;
    letter-spacing: 0.08em;
  }

  .feature-card.featured .feature-num { color: var(--green-6); }

  .feature-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px; font-weight: 700;
    color: var(--green-1);
    margin-bottom: 10px;
    line-height: 1.2;
  }

  .feature-card.featured .feature-title { color: white; }

  .feature-desc {
    font-size: 14px; line-height: 1.6;
    color: var(--text-light);
  }

  .feature-card.featured .feature-desc { color: rgba(255,255,255,0.55); }

  .feature-list {
    margin-top: 20px;
    display: flex; flex-direction: column; gap: 8px;
  }

  .feature-list-item {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: rgba(255,255,255,0.7);
  }

  .feature-check {
    width: 18px; height: 18px;
    background: rgba(78,202,120,0.2);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; flex-shrink: 0;
    color: var(--green-5);
  }

  /* ── HOW IT WORKS ── */
  .how {
    padding: 100px 64px;
    background: white;
  }

  .how-header { max-width: 560px; margin-bottom: 72px; }

  .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    position: relative;
  }

  .steps::before {
    content: '';
    position: absolute;
    top: 36px; left: 10%; right: 10%;
    height: 2px;
    background: linear-gradient(90deg, var(--green-3), var(--green-5));
  }

  .step {
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
    padding: 0 24px;
  }

  .step-num {
    width: 72px; height: 72px;
    background: var(--green-1);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 22px; font-weight: 800;
    color: white;
    margin-bottom: 24px;
    position: relative; z-index: 1;
    box-shadow: 0 0 0 8px var(--green-light);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .step:hover .step-num {
    transform: scale(1.1);
    box-shadow: 0 0 0 12px var(--green-light);
  }

  .step-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px; font-weight: 700;
    color: var(--green-1);
    margin-bottom: 10px;
  }

  .step-desc {
    font-size: 14px; line-height: 1.6;
    color: var(--text-light);
  }

  /* ── PRICING ── */
  .pricing {
    padding: 100px 64px;
    background: var(--off-white);
  }

  .pricing-header { max-width: 560px; margin-bottom: 64px; }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 900px;
  }

  .pricing-card {
    background: white;
    border-radius: 24px;
    padding: 36px 32px;
    border: 1px solid rgba(40,167,85,0.1);
    position: relative;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .pricing-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(10,61,31,0.1);
  }

  .pricing-card.popular {
    background: var(--green-1);
    border-color: transparent;
    transform: scale(1.04);
  }

  .pricing-card.popular:hover { transform: scale(1.04) translateY(-4px); }

  .popular-tag {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--green-5);
    color: var(--green-1);
    font-size: 11px; font-weight: 800;
    padding: 4px 16px; border-radius: 100px;
    letter-spacing: 0.08em; text-transform: uppercase;
    white-space: nowrap;
  }

  .pricing-tier {
    font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--green-4);
    margin-bottom: 8px;
  }

  .pricing-card.popular .pricing-tier { color: var(--green-6); }

  .pricing-price {
    font-family: 'Syne', sans-serif;
    font-size: 44px; font-weight: 800;
    color: var(--green-1);
    line-height: 1;
    margin-bottom: 4px;
  }

  .pricing-card.popular .pricing-price { color: white; }

  .pricing-period {
    font-size: 13px; color: var(--text-light);
    margin-bottom: 28px;
  }

  .pricing-card.popular .pricing-period { color: rgba(255,255,255,0.5); }

  .pricing-divider {
    height: 1px;
    background: rgba(40,167,85,0.1);
    margin-bottom: 24px;
  }

  .pricing-card.popular .pricing-divider { background: rgba(255,255,255,0.1); }

  .pricing-features {
    display: flex; flex-direction: column; gap: 12px;
    margin-bottom: 32px;
  }

  .pricing-feature {
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; color: var(--text-mid);
  }

  .pricing-card.popular .pricing-feature { color: rgba(255,255,255,0.75); }

  .pricing-check {
    width: 20px; height: 20px;
    background: var(--green-pale);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; flex-shrink: 0;
    color: var(--green-4);
  }

  .pricing-card.popular .pricing-check {
    background: rgba(78,202,120,0.2);
    color: var(--green-5);
  }

  .btn-pricing {
    display: block; text-align: center;
    padding: 14px;
    border-radius: 100px;
    font-size: 15px; font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    background: var(--green-pale);
    color: var(--green-1);
    border: 2px solid transparent;
  }

  .btn-pricing:hover {
    background: var(--green-light);
  }

  .pricing-card.popular .btn-pricing {
    background: white;
    color: var(--green-1);
  }

  .pricing-card.popular .btn-pricing:hover {
    background: var(--green-6);
  }

  /* ── TESTIMONIAL / TRUST ── */
  .trust {
    padding: 80px 64px;
    background: white;
    text-align: center;
  }

  .trust-label {
    font-size: 13px; color: var(--text-light);
    letter-spacing: 0.1em; text-transform: uppercase;
    font-weight: 600; margin-bottom: 36px;
  }

  .trust-logos {
    display: flex; justify-content: center; gap: 48px; flex-wrap: wrap;
    align-items: center;
  }

  .trust-logo {
    font-family: 'Syne', sans-serif;
    font-size: 18px; font-weight: 800;
    color: rgba(10,61,31,0.2);
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }

  .trust-logo:hover { color: var(--green-3); }

  /* ── CTA ── */
  .cta-section {
    padding: 100px 64px;
    background: var(--green-1);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .cta-section::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 60% at 50% 0%, rgba(78,202,120,0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  .cta-section .section-eyebrow { color: var(--green-5); }

  .cta-section .section-title { color: white; max-width: 640px; margin: 0 auto 20px; }

  .cta-section .section-desc {
    color: rgba(255,255,255,0.55);
    max-width: 500px; margin: 0 auto 48px;
  }

  .cta-buttons {
    display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;
  }

  .btn-cta-white {
    background: white;
    color: var(--green-1);
    padding: 16px 36px;
    border-radius: 100px;
    font-size: 16px; font-weight: 700;
    text-decoration: none;
    transition: all 0.2s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }

  .btn-cta-white:hover {
    background: var(--green-6);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }

  .btn-cta-outline {
    background: transparent;
    color: white;
    padding: 16px 36px;
    border-radius: 100px;
    font-size: 16px; font-weight: 600;
    text-decoration: none;
    border: 2px solid rgba(255,255,255,0.25);
    transition: all 0.2s;
  }

  .btn-cta-outline:hover {
    border-color: rgba(255,255,255,0.6);
    background: rgba(255,255,255,0.05);
  }

  /* ── FOOTER ── */
  footer {
    padding: 48px 64px;
    background: var(--text-dark);
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 24px;
  }

  .footer-brand {
    font-family: 'Syne', sans-serif;
    font-size: 20px; font-weight: 800;
    color: white;
  }

  .footer-brand span { color: var(--green-5); }

  .footer-links {
    display: flex; gap: 28px; list-style: none;
  }

  .footer-links a {
    font-size: 14px; color: rgba(255,255,255,0.4);
    text-decoration: none; transition: color 0.2s;
  }

  .footer-links a:hover { color: var(--green-5); }

  .footer-copy {
    font-size: 13px; color: rgba(255,255,255,0.25);
    width: 100%;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.85); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 1024px) {
    nav { padding: 16px 32px; }
    .hero { padding: 120px 32px 80px; }
    .hero-visual { display: none; }
    .hero-content { max-width: 100%; }
    .problems { padding: 80px 32px; }
    .problems-grid { grid-template-columns: repeat(2, 1fr); }
    .features { padding: 80px 32px; }
    .features-grid { grid-template-columns: 1fr 1fr; }
    .feature-card.featured { grid-row: auto; }
    .how { padding: 80px 32px; }
    .steps { grid-template-columns: repeat(2, 1fr); gap: 40px; }
    .steps::before { display: none; }
    .pricing { padding: 80px 32px; }
    .pricing-grid { grid-template-columns: 1fr; max-width: 400px; }
    .pricing-card.popular { transform: none; }
    .cta-section { padding: 80px 32px; }
    footer { padding: 40px 32px; }
  }
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">
    <div class="nav-logo-icon">🎓</div>
    EduCore OS
  </a>
  <ul class="nav-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#how">How It Works</a></li>
    <li><a href="#pricing">Pricing</a></li>
    <li><a href="#" class="nav-cta">Get Started →</a></li>
  </ul>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="hero-content">
    <div class="hero-badge">
      <span class="hero-badge-dot"></span>
      Now available for Pakistan schools
    </div>
    <h1>The <span>Operating System</span> for Modern Schools</h1>
    <p class="hero-sub">Replace paper registers, WhatsApp groups, Excel sheets and manual attendance with one AI-powered platform. Built for schools in Pakistan and South Asia.</p>
    <div class="hero-actions">
      <a href="#" class="btn-primary">Start Free Trial →</a>
      <a href="#features" class="btn-outline">Explore Features</a>
    </div>
    <div class="hero-stats">
      <div>
        <div class="hero-stat-num">10+</div>
        <div class="hero-stat-label">Modules in one platform</div>
      </div>
      <div>
        <div class="hero-stat-num">AI</div>
        <div class="hero-stat-label">Powered analytics</div>
      </div>
      <div>
        <div class="hero-stat-num">PKR</div>
        <div class="hero-stat-label">Local pricing available</div>
      </div>
    </div>
  </div>

  <!-- Dashboard Mockup -->
  <div class="hero-visual">
    <div class="dashboard-mock">
      <div class="mock-topbar">
        <div class="mock-dot" style="background:#ff5f57"></div>
        <div class="mock-dot" style="background:#febc2e"></div>
        <div class="mock-dot" style="background:#28c840"></div>
        <span class="mock-title">EduCore OS — Principal Dashboard</span>
      </div>
      <div class="mock-body">
        <div class="mock-cards">
          <div class="mock-card">
            <div class="mock-card-label">Total Students</div>
            <div class="mock-card-val">847</div>
            <div class="mock-card-sub">↑ 12 this week</div>
          </div>
          <div class="mock-card">
            <div class="mock-card-label">Attendance Today</div>
            <div class="mock-card-val">94%</div>
            <div class="mock-card-sub">↑ Above average</div>
          </div>
          <div class="mock-card">
            <div class="mock-card-label">Fee Collected</div>
            <div class="mock-card-val">87%</div>
            <div class="mock-card-sub">↑ 5% vs last month</div>
          </div>
          <div class="mock-card">
            <div class="mock-card-label">At-Risk Students</div>
            <div class="mock-card-val" style="color:#e55;">3</div>
            <div class="mock-card-sub" style="color:#e55;">⚠ Needs attention</div>
          </div>
        </div>
        <div class="mock-chart">
          <div class="mock-chart-label">📊 Weekly Attendance Trend</div>
          <div class="mock-bars">
            <div class="mock-bar" style="height:80%"></div>
            <div class="mock-bar" style="height:65%"></div>
            <div class="mock-bar" style="height:90%"></div>
            <div class="mock-bar" style="height:55%"></div>
            <div class="mock-bar" style="height:85%"></div>
            <div class="mock-bar" style="height:75%"></div>
          </div>
        </div>
        <div class="mock-list">
          <div class="mock-item">
            <div class="mock-avatar" style="background:#1e7a40">AK</div>
            <div class="mock-item-info">
              <div class="mock-item-name">Ahmad Khan</div>
              <div class="mock-item-detail">Class 9-A · Fee paid</div>
            </div>
            <span class="mock-badge badge-green">Present</span>
          </div>
          <div class="mock-item">
            <div class="mock-avatar" style="background:#c2410c">SR</div>
            <div class="mock-item-info">
              <div class="mock-item-name">Sara Raza</div>
              <div class="mock-item-detail">Class 8-B · Fee pending</div>
            </div>
            <span class="mock-badge badge-orange">Absent</span>
          </div>
          <div class="mock-item">
            <div class="mock-avatar" style="background:#1d4ed8">ZM</div>
            <div class="mock-item-info">
              <div class="mock-item-name">Zain Malik</div>
              <div class="mock-item-detail">Class 10-A · All clear</div>
            </div>
            <span class="mock-badge badge-blue">On Track</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PROBLEMS -->
<section class="problems">
  <div class="section-eyebrow">The Problem</div>
  <div class="section-title">Schools are stuck<br/>in the stone age</div>
  <div class="section-desc">Most schools in Pakistan still rely on paper, WhatsApp, and Excel. EduCore OS replaces all of it.</div>
  <div class="problems-grid reveal">
    <div class="problem-item">
      <span class="problem-icon">📋</span>
      <div class="problem-title">Manual Attendance</div>
      <div class="problem-desc">Paper registers, human errors, no parent alerts</div>
    </div>
    <div class="problem-item">
      <span class="problem-icon">💸</span>
      <div class="problem-title">Messy Fee Tracking</div>
      <div class="problem-desc">Fee notebooks and Excel sheets cause revenue loss</div>
    </div>
    <div class="problem-item">
      <span class="problem-icon">📱</span>
      <div class="problem-title">WhatsApp Chaos</div>
      <div class="problem-desc">Unstructured communication, missed messages</div>
    </div>
    <div class="problem-item">
      <span class="problem-icon">📉</span>
      <div class="problem-title">Zero Analytics</div>
      <div class="problem-desc">No performance data, decisions made blindly</div>
    </div>
    <div class="problem-item">
      <span class="problem-icon">📚</span>
      <div class="problem-title">No Homework System</div>
      <div class="problem-desc">Verbal assignments with no tracking or accountability</div>
    </div>
    <div class="problem-item">
      <span class="problem-icon">🗓️</span>
      <div class="problem-title">Clash Timetables</div>
      <div class="problem-desc">Manual schedules with teacher conflicts and errors</div>
    </div>
    <div class="problem-item">
      <span class="problem-icon">😟</span>
      <div class="problem-title">Mental Health Blind Spot</div>
      <div class="problem-desc">Student stress goes undetected until it's too late</div>
    </div>
    <div class="problem-item">
      <span class="problem-icon">🚌</span>
      <div class="problem-title">No Transport Tracking</div>
      <div class="problem-desc">Parents have no idea where the school van is</div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="features" id="features">
  <div class="features-header reveal">
    <div class="section-eyebrow" style="color:var(--green-3)">Features</div>
    <div class="section-title dark">Everything your school<br/>needs in one place</div>
    <div class="section-desc dark">10 powerful modules working together seamlessly — built for Pakistani schools, powered by AI.</div>
  </div>
  <div class="features-grid reveal">
    <div class="feature-card featured">
      <div class="feature-icon">🤖</div>
      <div class="feature-num">FEATURE 02</div>
      <div class="feature-title">AI Performance Analyzer</div>
      <div class="feature-desc">The brain of EduCore OS. Continuously monitors marks, attendance, and behavior to predict at-risk students weeks before they fail.</div>
      <div class="feature-list">
        <div class="feature-list-item"><div class="feature-check">✓</div>Predicts failure risk weeks in advance</div>
        <div class="feature-list-item"><div class="feature-check">✓</div>Identifies weak subjects per student</div>
        <div class="feature-list-item"><div class="feature-check">✓</div>Auto-generates improvement plans</div>
        <div class="feature-list-item"><div class="feature-check">✓</div>Sends early warning alerts to teachers</div>
        <div class="feature-list-item"><div class="feature-check">✓</div>Visual class performance rankings</div>
      </div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📋</div>
      <div class="feature-num">FEATURE 01</div>
      <div class="feature-title">Smart Attendance</div>
      <div class="feature-desc">QR code-based attendance with instant SMS to parents when a student is absent. Monthly analytics included.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">💰</div>
      <div class="feature-num">FEATURE 03</div>
      <div class="feature-title">Fee Management</div>
      <div class="feature-desc">Online payments, auto late fines, digital receipts and installment tracking. Defaulter list auto-generated.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📱</div>
      <div class="feature-num">FEATURE 04</div>
      <div class="feature-title">Parent Mobile App</div>
      <div class="feature-desc">Parents can check attendance, pay fees, view results, message teachers and track the school van — all in one app.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📚</div>
      <div class="feature-num">FEATURE 05</div>
      <div class="feature-title">Homework Tracker</div>
      <div class="feature-desc">Teachers upload assignments, students submit online. Late submissions tracked automatically with MCQ auto-grading.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🗓️</div>
      <div class="feature-num">FEATURE 06</div>
      <div class="feature-title">Smart Timetable</div>
      <div class="feature-desc">AI creates clash-free timetables automatically, balancing teacher workload and optimizing classroom allocation.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🚌</div>
      <div class="feature-num">FEATURE 08</div>
      <div class="feature-title">Transport Tracking</div>
      <div class="feature-desc">Live GPS tracking of school vans. Parents see live map and get pickup/drop alerts on their phone.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🧠</div>
      <div class="feature-num">FEATURE 09</div>
      <div class="feature-title">Mental Health Monitor</div>
      <div class="feature-desc">Weekly mood check-ins. AI detects stress patterns and alerts the school counselor before a crisis develops.</div>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📊</div>
      <div class="feature-num">FEATURE 10</div>
      <div class="feature-title">Principal Dashboard</div>
      <div class="feature-desc">Real-time command center. Attendance, fees, performance, complaints and teacher metrics — all in one view.</div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how" id="how">
  <div class="how-header reveal">
    <div class="section-eyebrow" style="color:var(--green-3)">How It Works</div>
    <div class="section-title dark">Up and running<br/>in 4 simple steps</div>
  </div>
  <div class="steps reveal">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-title">Sign Up Your School</div>
      <div class="step-desc">Register your school and choose your plan. Setup takes less than 10 minutes.</div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-title">Import Your Data</div>
      <div class="step-desc">Upload student and teacher lists. We help migrate everything from Excel or paper records.</div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-title">Invite Your Team</div>
      <div class="step-desc">Add teachers, admin staff and send parent app invitations in one click.</div>
    </div>
    <div class="step">
      <div class="step-num">4</div>
      <div class="step-title">Go Live 🚀</div>
      <div class="step-desc">Your school is fully digital. Attendance, fees, communication and AI analytics all active.</div>
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="pricing" id="pricing">
  <div class="pricing-header reveal">
    <div class="section-eyebrow" style="color:var(--green-3)">Pricing</div>
    <div class="section-title dark">Simple, transparent<br/>pricing for every school</div>
    <div class="section-desc dark">All plans include a 3-month free trial. No credit card required.</div>
  </div>
  <div class="pricing-grid reveal">
    <div class="pricing-card">
      <div class="pricing-tier">Starter</div>
      <div class="pricing-price">15K</div>
      <div class="pricing-period">PKR / month · up to 200 students</div>
      <div class="pricing-divider"></div>
      <div class="pricing-features">
        <div class="pricing-feature"><div class="pricing-check">✓</div> Attendance System</div>
        <div class="pricing-feature"><div class="pricing-check">✓</div> Fee Management</div>
        <div class="pricing-feature"><div class="pricing-check">✓</div> Parent Notifications</div>
        <div class="pricing-feature"><div class="pricing-check">✓</div> Basic Reports</div>
      </div>
      <a href="#" class="btn-pricing">Get Started</a>
    </div>
    <div class="pricing-card popular">
      <div class="popular-tag">⭐ Most Popular</div>
      <div class="pricing-tier">Growth</div>
      <div class="pricing-price" style="color:white">35K</div>
      <div class="pricing-period">PKR / month · up to 500 students</div>
      <div class="pricing-divider"></div>
      <div class="pricing-features">
        <div class="pricing-feature"><div class="pricing-check">✓</div> Everything in Starter</div>
        <div class="pricing-feature"><div class="pricing-check">✓</div> Homework Tracker</div>
        <div class="pricing-feature"><div class="pricing-check">✓</div> Smart Timetable</div>
        <div class="pricing-feature"><div class="pricing-check">✓</div> Parent Mobile App</div>
        <div class="pricing-feature"><div class="pricing-check">✓</div> Advanced Analytics</div>
      </div>
      <a href="#" class="btn-pricing">Get Started</a>
    </div>
    <div class="pricing-card">
      <div class="pricing-tier">Pro</div>
      <div class="pricing-price">75K</div>
      <div class="pricing-period">PKR / month · up to 1000 students</div>
      <div class="pricing-divider"></div>
      <div class="pricing-features">
        <div class="pricing-feature"><div class="pricing-check">✓</div> Everything in Growth</div>
        <div class="pricing-feature"><div class="pricing-check">✓</div> AI Performance Analyzer</div>
        <div class="pricing-feature"><div class="pricing-check">✓</div> Mental Health Monitor</div>
        <div class="pricing-feature"><div class="pricing-check">✓</div> Transport GPS Tracking</div>
      </div>
      <a href="#" class="btn-pricing">Get Started</a>
    </div>
  </div>
</section>

<!-- TRUST -->
<section class="trust">
  <div class="trust-label">Designed for schools across Pakistan</div>
  <div class="trust-logos">
    <div class="trust-logo">KARACHI</div>
    <div class="trust-logo">LAHORE</div>
    <div class="trust-logo">ISLAMABAD</div>
    <div class="trust-logo">PESHAWAR</div>
    <div class="trust-logo">QUETTA</div>
    <div class="trust-logo">FAISALABAD</div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="section-eyebrow">Get Started Today</div>
  <div class="section-title">Ready to modernize<br/>your school?</div>
  <div class="section-desc">Join the schools already running on EduCore OS. 3-month free trial, full setup support included.</div>
  <div class="cta-buttons">
    <a href="#" class="btn-cta-white">Start Free Trial →</a>
    <a href="#" class="btn-cta-outline">Book a Demo</a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-brand">EduCore <span>OS</span></div>
  <ul class="footer-links">
    <li><a href="#">Features</a></li>
    <li><a href="#">Pricing</a></li>
    <li><a href="#">Contact</a></li>
    <li><a href="#">Privacy Policy</a></li>
  </ul>
  <div class="footer-copy">© 2025 CoreCraft. All rights reserved. Built in Pakistan 🇵🇰</div>
</footer>

<script>
  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 24px rgba(10,61,31,0.08)'
      : 'none';
  });
</script>
</body>
</html>