'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

// Dynamically import the 3D cube to avoid SSR issues with Three.js
const ProductCube = dynamic(() => import('../components/ProductCube'), {
  ssr: false,
  loading: () => (
    <div className="cube-loading">
      <div className="cube-loading-spinner" />
    </div>
  ),
})

// Product data
const products = [
  {
    id: 'smrtscan',
    name: 'SMRTscan',
    tagline: 'AI-Powered Receipt Scanner',
    description: 'Snap a photo, get organized data instantly. Track expenses, mileage, and never miss a warranty.',
    color: '#10b981',
    features: ['AI Receipt Extraction', 'Smart Categorization', 'Mileage Tracking', 'Cloud Backup'],
    status: 'available',
    appStoreUrl: '#',
  },
]

export default function HomePage() {
  const [activeProduct] = useState(products[0])

  return (
    <div className="landing-page">
      {/* Hero Section with Cube */}
      <section className="cube-hero">
        {/* Animated background */}
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid" />
          <div className="hero-glow" />
        </div>

        {/* Content */}
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="company-name">
              <span className="inspira">Inspira</span>
              <span className="cube-text">Cube</span>
            </h1>
            <p className="company-tagline">Building the future, one innovation at a time</p>
          </div>

          {/* 3D Cube */}
          <div className="cube-container">
            <ProductCube />
          </div>

          {/* Current Product Info */}
          <div className="product-spotlight">
            <div className="spotlight-badge">Featured Product</div>
            <h2 className="spotlight-name">{activeProduct.name}</h2>
            <p className="spotlight-tagline">{activeProduct.tagline}</p>
            <p className="spotlight-description">{activeProduct.description}</p>

            <div className="spotlight-features">
              {activeProduct.features.map((feature, i) => (
                <span key={i} className="feature-tag">{feature}</span>
              ))}
            </div>

            <div className="spotlight-actions">
              <a href={activeProduct.appStoreUrl} className="btn-primary">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download on App Store
              </a>
              <a href="/smrtscan" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>We Build Smart Solutions</h2>
          <p>
            Inspira Cube is a software studio focused on creating elegant, AI-powered
            applications that simplify everyday tasks. Our products are designed with
            privacy-first principles and intuitive user experiences.
          </p>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">1</span>
              <span className="stat-label">Products Launched</span>
            </div>
            <div className="stat">
              <span className="stat-number">5</span>
              <span className="stat-label">More Coming</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Privacy Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="products-section">
        <h2>Our Products</h2>
        <div className="products-grid">
          {/* SMRTscan Card */}
          <div className="product-card available">
            <div className="product-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              📱
            </div>
            <h3>SMRTscan</h3>
            <p>AI-powered receipt scanning and expense tracking for individuals and small businesses.</p>
            <span className="product-status available">Available Now</span>
            <a href="/smrtscan" className="product-link">Learn more →</a>
          </div>

          {/* Coming Soon Cards */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="product-card coming-soon">
              <div className="product-icon" style={{ background: 'linear-gradient(135deg, #374151, #1f2937)' }}>
                ✨
              </div>
              <h3>Coming Soon</h3>
              <p>We're working on something exciting. Stay tuned for our next innovation.</p>
              <span className="product-status coming">In Development</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions or want to collaborate? We'd love to hear from you.</p>
        <a href="mailto:hello@inspiracube.com" className="contact-email">
          hello@inspiracube.com
        </a>
      </section>
    </div>
  )
}
