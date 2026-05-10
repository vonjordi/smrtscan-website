import React from 'react';

export const meta = {
  slug: 'smrtscan',
  title: 'SMRTscan — AI-powered receipt scanner by InspiraCube',
  description:
    'SMRTscan uses advanced AI to instantly extract merchant, date, items, taxes, and totals from your receipts. Track expenses, mileage, and warranties — privately, on your device.',
  wide: true,
};

const FEATURES = [
  {
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    title: 'AI-powered extraction',
    body: 'Advanced AI reads your receipts and pulls merchant, date, items, taxes, and totals automatically. Just snap a photo.',
  },
  {
    icon: '📊',
    gradient: 'linear-gradient(135deg, #7c5cff, #6d28d9)',
    title: 'Smart categories',
    body: 'Auto-categorization that learns from your corrections. Tag, filter, and search your expenses effortlessly.',
  },
  {
    icon: '🚗',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    title: 'Mileage tracking',
    body: 'Log business trips with automatic route calculation. Export detailed mileage reports for tax time.',
  },
  {
    icon: '⏰',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    title: 'Warranty reminders',
    body: 'Never miss a return window or warranty expiration. Get notified before deadlines pass.',
  },
  {
    icon: '☁️',
    gradient: 'linear-gradient(135deg, #06b6d4, #7c5cff)',
    title: 'Secure cloud backup',
    body: 'Optional backup to your iCloud or Google Drive. Your data stays yours — we never store it on our servers.',
  },
  {
    icon: '📤',
    gradient: 'linear-gradient(135deg, #ffe36d, #f59e0b)',
    title: 'Flexible exports',
    body: 'Export to CSV, PDF, or ZIP. Perfect for accountants, tax prep, or expense reports.',
  },
];

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export default function Smrtscan() {
  return (
    <>
      <section className="product-hero">
        <span className="eyebrow">An InspiraCube product</span>
        <h1>SMRTscan</h1>
        <p className="tagline">AI-powered receipt scanner.</p>
        <p className="description">
          Stop drowning in paper receipts. SMRTscan uses advanced AI to instantly extract merchant,
          date, items, taxes, and totals. Organize expenses, track mileage, and never miss a warranty.
        </p>
        <div className="cta-row">
          <a className="btn-primary" href="#" aria-label="Download SMRTscan on the App Store">
            <AppleGlyph />
            Download on the App Store
          </a>
          <a className="btn-secondary" href="/privacy/">Privacy practices</a>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>What it does</h2>
          <p>Six things SMRTscan handles so you don&rsquo;t have to.</p>
        </div>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-card__icon" style={{ background: f.gradient }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Privacy first</h2>
          <p>
            Your receipts contain sensitive financial data. SMRTscan stores everything locally on your
            device by default. Cloud backup is optional and uses your personal iCloud or Google Drive
            account — not our servers. We never sell your data.
          </p>
        </div>
        <div className="stat-row">
          <div className="stat">
            <span className="stat__num">0</span>
            <span className="stat__label">Data sold</span>
          </div>
          <div className="stat">
            <span className="stat__num">100%</span>
            <span className="stat__label">Local-first</span>
          </div>
          <div className="stat">
            <span className="stat__num">E2E</span>
            <span className="stat__label">Encrypted backup</span>
          </div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Ready to get organized?</h2>
          <p>Download SMRTscan and take control of your receipts today.</p>
        </div>
        <div className="cta-row">
          <a className="btn-primary" href="#" aria-label="Download SMRTscan on the App Store">
            <AppleGlyph />
            Download on the App Store
          </a>
        </div>
      </section>
    </>
  );
}
