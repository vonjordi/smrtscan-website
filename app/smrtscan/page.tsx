export default function SMRTscanPage() {
  return (
    <div className="landing-page">
      {/* Hero */}
      <section className="cube-hero" style={{ minHeight: '80vh' }}>
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid" />
        </div>

        <div className="hero-content">
          <div className="spotlight-badge">An Inspira Cube Product</div>

          <h1 className="spotlight-name" style={{ fontSize: '4rem' }}>SMRTscan</h1>
          <p className="spotlight-tagline" style={{ fontSize: '1.5rem' }}>AI-Powered Receipt Scanner</p>
          <p className="spotlight-description" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Stop drowning in paper receipts. SMRTscan uses advanced AI to instantly extract merchant, date,
            items, taxes, and totals. Organize expenses, track mileage, and never miss a warranty.
          </p>

          <div className="spotlight-actions">
            <a href="#" className="btn-primary">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download on App Store
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="products-section">
        <h2>Powerful Features</h2>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              🤖
            </div>
            <h3>AI-Powered Extraction</h3>
            <p>
              Advanced AI reads your receipts and extracts merchant, date, items, taxes,
              and totals automatically. Just snap a photo.
            </p>
          </div>

          <div className="product-card">
            <div className="product-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
              📊
            </div>
            <h3>Smart Categories</h3>
            <p>
              Auto-categorization that learns from your corrections. Tag, filter,
              and search your expenses effortlessly.
            </p>
          </div>

          <div className="product-card">
            <div className="product-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              🚗
            </div>
            <h3>Mileage Tracking</h3>
            <p>
              Log business trips with automatic route calculation. Export detailed
              mileage reports for tax time.
            </p>
          </div>

          <div className="product-card">
            <div className="product-icon" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>
              ⏰
            </div>
            <h3>Warranty Reminders</h3>
            <p>
              Never miss a return window or warranty expiration. Get notified
              before deadlines pass.
            </p>
          </div>

          <div className="product-card">
            <div className="product-icon" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
              ☁️
            </div>
            <h3>Secure Cloud Backup</h3>
            <p>
              Optional backup to your iCloud or Google Drive. Your data stays
              yours—we never store it on our servers.
            </p>
          </div>

          <div className="product-card">
            <div className="product-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              📤
            </div>
            <h3>Flexible Exports</h3>
            <p>
              Export to CSV, PDF, or ZIP. Perfect for accountants, tax prep,
              or expense reports.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Promise */}
      <section className="about-section">
        <div className="about-content">
          <h2>Privacy First</h2>
          <p>
            Your receipts contain sensitive financial data. That's why SMRTscan stores everything
            locally on your device by default. Cloud backup is optional and uses your personal
            iCloud or Google Drive account—not our servers. We never sell your data.
          </p>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">0</span>
              <span className="stat-label">Data Sold</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Local Storage</span>
            </div>
            <div className="stat">
              <span className="stat-number">E2E</span>
              <span className="stat-label">Encrypted Backup</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-section">
        <h2>Ready to Get Organized?</h2>
        <p>Download SMRTscan and take control of your receipts today.</p>
        <a href="#" className="btn-primary" style={{ marginTop: '1rem' }}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Download on App Store
        </a>
      </section>
    </div>
  )
}
