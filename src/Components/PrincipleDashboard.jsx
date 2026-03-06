import { useState, useEffect } from 'react';

export default function PrincipalDashboard() {
    const [activeNav, setActiveNav] = useState(0);
    const [activeTab, setActiveTab] = useState('Week');
    const [dateStr, setDateStr] = useState('');

    useEffect(() => {
        const now = new Date();
        const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        setDateStr(now.toLocaleDateString('en-PK', opts));
    }, []);

    const navSections = [
        {
            label: 'Overview',
            items: [
                { icon: '📊', text: 'Dashboard', badge: null },
                { icon: '📋', text: 'Attendance', badge: { text: 'Live', green: true } },
                { icon: '💰', text: 'Fee Management', badge: { text: '4', green: false } },
            ],
        },
        {
            label: 'Academics',
            items: [
                { icon: '📚', text: 'Homework', badge: null },
                { icon: '📝', text: 'Exams & Results', badge: null },
                { icon: '🗓️', text: 'Timetable', badge: null },
                { icon: '🤖', text: 'AI Analyzer', badge: { text: '3', green: false } },
            ],
        },
        {
            label: 'People',
            items: [
                { icon: '👨‍🎓', text: 'Students', badge: null },
                { icon: '👩‍🏫', text: 'Teachers', badge: null },
                { icon: '👪', text: 'Parents', badge: null },
            ],
        },
        {
            label: 'Other',
            items: [
                { icon: '🚌', text: 'Transport', badge: null },
                { icon: '🧠', text: 'Mental Health', badge: { text: '2', green: false } },
                { icon: '📣', text: 'Complaints', badge: null },
                { icon: '⚙️', text: 'Settings', badge: null },
            ],
        },
    ];

    // Flatten nav for active index tracking
    let navIndex = 0;
    const flatNav = navSections.flatMap(s => s.items.map(item => ({ ...item, section: s.label })));

    const chartData = [
        { day: 'Mon', att: 88, fee: 72 },
        { day: 'Tue', att: 92, fee: 68 },
        { day: 'Wed', att: 85, fee: 80 },
        { day: 'Thu', att: 96, fee: 75 },
        { day: 'Fri', att: 94, fee: 87 },
        { day: 'Sat', att: 78, fee: 60 },
    ];

    return (
        <div className="pd-root">

            {/* SIDEBAR */}
            <aside className="pd-sidebar">
                <div className="pd-sidebar-logo">
                    <div className="pd-logo-icon">🎓</div>
                    <div>
                        <div className="pd-logo-text">EduCore OS</div>
                        <div className="pd-logo-sub">Admin Panel</div>
                    </div>
                </div>

                <div className="pd-sidebar-school">
                    <div className="pd-school-name">
                        <span className="pd-school-dot"></span>Al-Noor Academy
                    </div>
                    <div className="pd-school-meta">Karachi, Pakistan · Session 2024–25</div>
                </div>

                <nav className="pd-sidebar-nav">
                    {navSections.map((section) => (
                        <div key={section.label}>
                            <div className="pd-nav-section-label">{section.label}</div>
                            {section.items.map((item) => {
                                const idx = navIndex++;
                                return (
                                    <a
                                        key={item.text}
                                        href="#"
                                        className={`pd-nav-item${activeNav === idx ? ' active' : ''}`}
                                        onClick={(e) => { e.preventDefault(); setActiveNav(idx); }}
                                    >
                                        <span className="pd-nav-icon">{item.icon}</span> {item.text}
                                        {item.badge && (
                                            <span className={`pd-nav-badge${item.badge.green ? ' green' : ''}`}>
                                                {item.badge.text}
                                            </span>
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                <div className="pd-sidebar-footer">
                    <div className="pd-user-row">
                        <div className="pd-user-avatar">TM</div>
                        <div>
                            <div className="pd-user-name">Talha Malik</div>
                            <div className="pd-user-role">Principal</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <main className="pd-main">

                {/* TOPBAR */}
                <header className="pd-topbar">
                    <div className="pd-topbar-left">
                        <div className="pd-page-title">Dashboard</div>
                        <div className="pd-breadcrumb">/ Overview</div>
                    </div>
                    <div className="pd-topbar-right">
                        <div className="pd-date-chip">{dateStr}</div>
                        <div className="pd-topbar-btn" title="Search">🔍</div>
                        <div className="pd-topbar-btn" title="Notifications">
                            🔔
                            <div className="pd-notif-dot"></div>
                        </div>
                        <div className="pd-topbar-btn" title="Profile">👤</div>
                    </div>
                </header>

                {/* CONTENT */}
                <div className="pd-content">

                    {/* GREETING */}
                    <div className="pd-greeting">
                        <div className="pd-greeting-text">
                            <h2>Good Morning, <span>Principal Talha</span> 👋</h2>
                            <p>Here's what's happening at Al-Noor Academy today</p>
                        </div>
                        <div className="pd-quick-actions">
                            <button className="pd-q-btn pd-q-btn-ghost">📤 Export Report</button>
                            <button className="pd-q-btn pd-q-btn-primary">+ Add Student</button>
                        </div>
                    </div>

                    {/* STAT CARDS */}
                    <div className="pd-stats-row">
                        {[
                            { label: 'Total Students', value: '847', change: '↑ 12 enrolled this month', changeClass: 'up', icon: '👨‍🎓', color: 'green' },
                            { label: 'Attendance Today', value: '94%', change: '↑ Above average', changeClass: 'up', icon: '📋', color: 'blue' },
                            { label: 'Fee Collection', value: '87%', change: '↔ 4 pending defaults', changeClass: 'neutral', icon: '💰', color: 'orange' },
                            { label: 'At-Risk Students', value: '3', change: '↑ 1 new alert today', changeClass: 'down', icon: '⚠️', color: 'red' },
                            { label: 'Active Teachers', value: '38', change: '↑ All present today', changeClass: 'up', icon: '👩‍🏫', color: 'purple' },
                        ].map((card, i) => (
                            <div key={i} className={`pd-stat-card ${card.color}`}>
                                <div className="pd-stat-top">
                                    <div className="pd-stat-label">{card.label}</div>
                                    <div className={`pd-stat-icon ${card.color}`}>{card.icon}</div>
                                </div>
                                <div className="pd-stat-value">{card.value}</div>
                                <div className={`pd-stat-change ${card.changeClass}`}>{card.change}</div>
                            </div>
                        ))}
                    </div>

                    {/* ROW: CHART + ALERTS */}
                    <div className="pd-grid-32">

                        {/* CHART */}
                        <div className="pd-panel">
                            <div className="pd-panel-header">
                                <div className="pd-panel-title">
                                    <span className="pd-panel-title-icon">📈</span>
                                    Weekly Attendance & Fee Trend
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <div className="pd-tabs">
                                        {['Week', 'Month', 'Year'].map(t => (
                                            <button
                                                key={t}
                                                className={`pd-tab${activeTab === t ? ' active' : ''}`}
                                                onClick={() => setActiveTab(t)}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="pd-panel-body">
                                <div className="pd-chart-labels">
                                    {chartData.map(d => (
                                        <div key={d.day} className="pd-chart-label-item">{d.day}</div>
                                    ))}
                                </div>
                                <div className="pd-bar-chart">
                                    {chartData.map((d, i) => (
                                        <div key={i} className="pd-bar-group">
                                            <div className="pd-bar attendance" style={{ height: `${d.att}%` }} data-val={`${d.att}%`}></div>
                                            <div className="pd-bar fee" style={{ height: `${d.fee}%` }} data-val={`${d.fee}%`}></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pd-chart-legend">
                                    <div className="pd-legend-item">
                                        <div className="pd-legend-dot" style={{ background: 'var(--g4)' }}></div>Attendance
                                    </div>
                                    <div className="pd-legend-item">
                                        <div className="pd-legend-dot" style={{ background: 'var(--blue)' }}></div>Fee Collection
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ALERTS */}
                        <div className="pd-panel">
                            <div className="pd-panel-header">
                                <div className="pd-panel-title"><span className="pd-panel-title-icon">🚨</span> Active Alerts</div>
                                <button className="pd-panel-action">View all</button>
                            </div>
                            <div className="pd-panel-body">
                                <div className="pd-alert-list">
                                    {[
                                        { cls: 'red', icon: '⚠️', title: '3 Students At-Risk of Failure', desc: 'AI detected declining performance in Class 9-A & 10-B' },
                                        { cls: 'orange', icon: '💸', title: '4 Fee Defaulters This Month', desc: 'Overdue by 30+ days. Auto reminders sent.' },
                                        { cls: 'blue', icon: '🧠', title: '2 Mental Health Flags', desc: 'Mood scores below threshold. Counselor notified.' },
                                        { cls: 'green', icon: '✅', title: 'Timetable Updated Successfully', desc: 'New clash-free schedule live for all classes.' },
                                    ].map((alert, i) => (
                                        <div key={i} className={`pd-alert-item ${alert.cls}`}>
                                            <div className="pd-alert-icon">{alert.icon}</div>
                                            <div>
                                                <div className="pd-alert-title">{alert.title}</div>
                                                <div className="pd-alert-desc">{alert.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROW: AT-RISK STUDENTS + ACTIVITY */}
                    <div className="pd-grid-2">

                        {/* AT-RISK STUDENTS */}
                        <div className="pd-panel">
                            <div className="pd-panel-header">
                                <div className="pd-panel-title"><span className="pd-panel-title-icon">🤖</span> AI — At-Risk Students</div>
                                <button className="pd-panel-action">Full Report →</button>
                            </div>
                            <div className="pd-table-wrap">
                                <table className="pd-table">
                                    <thead>
                                        <tr>
                                            <th>Student</th><th>Risk Level</th><th>Performance</th><th>Issue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { initials: 'SK', name: 'Sara Khan', cls: 'Class 9-A', color: '#c0392b', risk: '🔴 High', riskBadge: 'pd-badge-danger', perf: 34, perfGradient: 'linear-gradient(90deg,var(--red),#f85149)', issue: 'Failing Math', issueBadge: 'pd-badge-danger' },
                                            { initials: 'AR', name: 'Ahmed Raza', cls: 'Class 10-B', color: '#d35400', risk: '🟡 Medium', riskBadge: 'pd-badge-warning', perf: 52, perfGradient: 'linear-gradient(90deg,var(--orange),#e3a23a)', issue: 'Low Attendance', issueBadge: 'pd-badge-warning' },
                                            { initials: 'ZB', name: 'Zara Baig', cls: 'Class 8-C', color: '#1a5276', risk: '🟡 Medium', riskBadge: 'pd-badge-warning', perf: 58, perfGradient: 'linear-gradient(90deg,var(--orange),#e3a23a)', issue: 'Stress Detected', issueBadge: 'pd-badge-purple' },
                                            { initials: 'FM', name: 'Faisal Mirza', cls: 'Class 9-B', color: '#1e8449', risk: '🟢 Low', riskBadge: 'pd-badge-success', perf: 71, perfGradient: null, issue: 'Fee Pending', issueBadge: 'pd-badge-info' },
                                        ].map((s, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <div className="pd-td-student">
                                                        <div className="pd-student-av" style={{ background: s.color }}>{s.initials}</div>
                                                        <div>
                                                            <div className="pd-student-name">{s.name}</div>
                                                            <div className="pd-student-class">{s.cls}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><span className={`pd-badge ${s.riskBadge}`}>{s.risk}</span></td>
                                                <td>
                                                    <div className="pd-prog-wrap">
                                                        <div className="pd-prog-bar">
                                                            <div className="pd-prog-fill" style={{ width: `${s.perf}%`, background: s.perfGradient || undefined }}></div>
                                                        </div>
                                                        <div className="pd-prog-val">{s.perf}%</div>
                                                    </div>
                                                </td>
                                                <td><span className={`pd-badge ${s.issueBadge}`}>{s.issue}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ACTIVITY FEED */}
                        <div className="pd-panel">
                            <div className="pd-panel-header">
                                <div className="pd-panel-title"><span className="pd-panel-title-icon">⚡</span> Recent Activity</div>
                                <button className="pd-panel-action">View all</button>
                            </div>
                            <div className="pd-panel-body">
                                <div className="pd-activity-list">
                                    {[
                                        { bg: 'rgba(61,214,104,0.15)', icon: '✅', title: 'Attendance marked — Class 10-A', desc: 'Teacher Amina Hassan marked 38/40 students present', time: '2 min ago' },
                                        { bg: 'rgba(227,162,58,0.15)', icon: '💸', title: 'Fee payment received', desc: 'PKR 8,500 received from parent of Bilal Sheikh', time: '14 min ago' },
                                        { bg: 'rgba(248,81,73,0.15)', icon: '⚠️', title: 'AI Risk Alert — Sara Khan', desc: 'Performance dropped below 40% threshold in Math', time: '1 hr ago' },
                                        { bg: 'rgba(56,139,253,0.15)', icon: '📚', title: 'Homework uploaded — Physics', desc: 'Mr. Tariq uploaded Chapter 5 assignment for Class 11', time: '2 hr ago' },
                                        { bg: 'rgba(188,140,255,0.15)', icon: '🧠', title: 'Mental health flag — Zara Baig', desc: 'Weekly mood score: 2/10. Counselor Mrs. Nadia alerted.', time: '3 hr ago' },
                                    ].map((act, i, arr) => (
                                        <div key={i} className="pd-activity-item">
                                            {i < arr.length - 1 && <div className="pd-activity-line"></div>}
                                            <div className="pd-activity-dot" style={{ background: act.bg }}>{act.icon}</div>
                                            <div>
                                                <div className="pd-activity-title">{act.title}</div>
                                                <div className="pd-activity-desc">{act.desc}</div>
                                                <div className="pd-activity-time">{act.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROW: CLASS PERFORMANCE + TOP TEACHERS + FEE DONUT */}
                    <div className="pd-grid-3">

                        {/* CLASS PERFORMANCE */}
                        <div className="pd-panel">
                            <div className="pd-panel-header">
                                <div className="pd-panel-title"><span className="pd-panel-title-icon">🏫</span> Class Performance</div>
                                <button className="pd-panel-action">Details →</button>
                            </div>
                            <div className="pd-table-wrap">
                                <table className="pd-table">
                                    <thead>
                                        <tr><th>Class</th><th>Attendance</th><th>Avg Score</th></tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { cls: 'Class 10-A', att: '97%', badge: 'pd-badge-success', score: 82, gradient: null },
                                            { cls: 'Class 9-A', att: '93%', badge: 'pd-badge-success', score: 74, gradient: null },
                                            { cls: 'Class 11-B', att: '88%', badge: 'pd-badge-warning', score: 69, gradient: null },
                                            { cls: 'Class 8-C', att: '84%', badge: 'pd-badge-warning', score: 63, gradient: null },
                                            { cls: 'Class 10-B', att: '79%', badge: 'pd-badge-danger', score: 55, gradient: 'linear-gradient(90deg,var(--orange),#e3a23a)' },
                                        ].map((c, i) => (
                                            <tr key={i}>
                                                <td style={{ fontWeight: 600 }}>{c.cls}</td>
                                                <td><span className={`pd-badge ${c.badge}`}>{c.att}</span></td>
                                                <td>
                                                    <div className="pd-prog-wrap">
                                                        <div className="pd-prog-bar">
                                                            <div className="pd-prog-fill" style={{ width: `${c.score}%`, background: c.gradient || undefined }}></div>
                                                        </div>
                                                        <div className="pd-prog-val">{c.score}%</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* TOP TEACHERS */}
                        <div className="pd-panel">
                            <div className="pd-panel-header">
                                <div className="pd-panel-title"><span className="pd-panel-title-icon">⭐</span> Top Teachers</div>
                                <button className="pd-panel-action">View all</button>
                            </div>
                            <div className="pd-panel-body">
                                <div className="pd-teacher-list">
                                    {[
                                        { initials: 'AH', name: 'Amina Hassan', sub: 'Mathematics · 12 yrs', color: '#1e8449', score: '98%' },
                                        { initials: 'TQ', name: 'Tariq Qureshi', sub: 'Physics · 8 yrs', color: '#1a5276', score: '95%' },
                                        { initials: 'NA', name: 'Nadia Akhtar', sub: 'English · 6 yrs', color: '#6c3483', score: '93%' },
                                        { initials: 'BI', name: 'Bilal Iqbal', sub: 'Chemistry · 5 yrs', color: '#784212', score: '91%' },
                                        { initials: 'SR', name: 'Sana Rehman', sub: 'Biology · 4 yrs', color: '#1f618d', score: '89%' },
                                    ].map((t, i) => (
                                        <div key={i} className="pd-teacher-row">
                                            <div className="pd-teacher-av" style={{ background: t.color }}>{t.initials}</div>
                                            <div className="pd-teacher-info">
                                                <div className="pd-teacher-name">{t.name}</div>
                                                <div className="pd-teacher-sub">{t.sub}</div>
                                            </div>
                                            <div className="pd-teacher-score">{t.score}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* FEE DONUT */}
                        <div className="pd-panel">
                            <div className="pd-panel-header">
                                <div className="pd-panel-title"><span className="pd-panel-title-icon">💰</span> Fee Status</div>
                                <button className="pd-panel-action">Manage →</button>
                            </div>
                            <div className="pd-panel-body">
                                <div className="pd-donut-wrap">
                                    <svg width="110" height="110" viewBox="0 0 110 110" style={{ flexShrink: 0 }}>
                                        <circle cx="55" cy="55" r="40" fill="none" stroke="#1c2330" strokeWidth="18" />
                                        <circle cx="55" cy="55" r="40" fill="none" stroke="#3dd668" strokeWidth="18"
                                            strokeDasharray="218.7 251.2" strokeDashoffset="62.8" strokeLinecap="round" />
                                        <circle cx="55" cy="55" r="40" fill="none" stroke="#e3a23a" strokeWidth="18"
                                            strokeDasharray="22.6 251.2" strokeDashoffset="-155.9" strokeLinecap="round" />
                                        <circle cx="55" cy="55" r="40" fill="none" stroke="#f85149" strokeWidth="18"
                                            strokeDasharray="10.0 251.2" strokeDashoffset="-178.5" strokeLinecap="round" />
                                        <text x="55" y="51" textAnchor="middle" fill="#e6edf3" fontSize="16" fontWeight="700" fontFamily="JetBrains Mono">87%</text>
                                        <text x="55" y="65" textAnchor="middle" fill="#8b949e" fontSize="9" fontFamily="Outfit">Collected</text>
                                    </svg>
                                    <div className="pd-donut-legend">
                                        {[
                                            { color: 'var(--g4)', label: 'Paid', val: '737' },
                                            { color: 'var(--orange)', label: 'Pending', val: '76' },
                                            { color: 'var(--red)', label: 'Defaulter', val: '34' },
                                        ].map((item, i) => (
                                            <div key={i} className="pd-donut-item">
                                                <div className="pd-donut-color" style={{ background: item.color }}></div>
                                                <div className="pd-donut-item-label">{item.label}</div>
                                                <div className="pd-donut-item-val">{item.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div className="pd-mini-metric">
                                        <div className="pd-mini-icon" style={{ background: 'rgba(61,214,104,0.1)' }}>💵</div>
                                        <div>
                                            <div className="pd-mini-label">Total Collected</div>
                                            <div className="pd-mini-val">PKR 6.2M</div>
                                        </div>
                                    </div>
                                    <div className="pd-mini-metric">
                                        <div className="pd-mini-icon" style={{ background: 'rgba(248,81,73,0.1)' }}>📌</div>
                                        <div>
                                            <div className="pd-mini-label">Outstanding</div>
                                            <div className="pd-mini-val">PKR 0.9M</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}