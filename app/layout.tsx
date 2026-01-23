import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Inspira Cube - Building the Future',
  description: 'A software studio creating elegant, AI-powered applications. Home of SMRTscan and more innovations to come.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="nav-content">
            <a href="/" className="logo">
              <span className="inspira">Inspira</span>
              <span className="cube-text">Cube</span>
            </a>
            <div className="nav-links">
              <a href="/smrtscan">SMRTscan</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="footer">
          <div className="footer-content">
            <p>© 2026 1001474709 Ontario Inc. operating as Inspira Cube</p>
            <p>Guelph, Ontario, Canada</p>
            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="mailto:hello@inspiracube.com">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
