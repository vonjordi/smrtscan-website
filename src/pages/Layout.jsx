import React from 'react';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap';

const NAV_LINKS = [
  { href: '/smrtscan/', label: 'SMRTscan' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/terms/', label: 'Terms' },
];

export default function Layout({ slug, title, description, wide, children }) {
  const pageClass = wide ? 'page page--wide' : 'page';
  const canonical = `https://inspiracube.com/${slug}/`;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONT_HREF} />
        <link rel="stylesheet" href="/legal.css" />
      </head>
      <body>
        <nav className="site-nav" aria-label="Primary navigation">
          <a className="brand-mark" href="/" aria-label="InspiraCube home">
            <span className="brand-mark__sigil">i</span>
            <span>InspiraCube</span>
          </a>
          <div className="nav-links">
            {NAV_LINKS.map((link) => {
              const isCurrent = link.href === `/${slug}/`;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  {...(isCurrent ? { 'aria-current': 'page' } : {})}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          <a className="nav-cta" href="mailto:hello@inspiracube.com">
            Contact
          </a>
        </nav>

        <main className={pageClass}>{children}</main>

        <footer className="site-footer">
          <div className="footer-links">
            <a href="/">InspiraCube</a>
            <a href="/smrtscan/">SMRTscan</a>
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <a href="mailto:hello@inspiracube.com">hello@inspiracube.com</a>
          </div>
          <div>© {new Date().getFullYear()} 1001474709 Ontario Inc. operating as InspiraCube.</div>
        </footer>
      </body>
    </html>
  );
}
