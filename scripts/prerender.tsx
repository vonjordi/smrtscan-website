/**
 * Pre-renders the JSX page components in src/pages/ into static HTML at
 * dist/<slug>/index.html. Runs after `vite build`; the homepage continues to
 * be the Three.js scene Vite emits at dist/index.html.
 *
 * Run with: tsx scripts/prerender.tsx
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Layout from '../src/pages/Layout.jsx';
import Privacy, { meta as privacyMeta } from '../src/pages/Privacy.jsx';
import Terms, { meta as termsMeta } from '../src/pages/Terms.jsx';
import Smrtscan, { meta as smrtscanMeta } from '../src/pages/Smrtscan.jsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

const pages = [
  { meta: privacyMeta, Page: Privacy },
  { meta: termsMeta, Page: Terms },
  { meta: smrtscanMeta, Page: Smrtscan },
];

for (const { meta, Page } of pages) {
  const markup = renderToStaticMarkup(
    <Layout slug={meta.slug} title={meta.title} description={meta.description} wide={meta.wide}>
      <Page />
    </Layout>,
  );

  const html = `<!doctype html>\n${markup}\n`;
  const outDir = path.join(distDir, meta.slug);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html, 'utf8');
  process.stdout.write(`  ✓ /${meta.slug}/  (${html.length.toLocaleString()} bytes)\n`);
}

process.stdout.write(`prerendered ${pages.length} pages → ${path.relative(process.cwd(), distDir)}/\n`);
