# SMRTscan Website

Simple website for hosting Privacy Policy and Terms of Service.

## Quick Deploy to Vercel

### Option 1: One-Click Deploy

1. Push this `website` folder to a new GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import your repository
4. Vercel auto-detects Next.js and deploys

### Option 2: Vercel CLI

```bash
cd website
npm install
npx vercel
```

## Connect Your Domain

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add `smrtscan.app`
3. Update DNS at your domain registrar:
   - Add an A record: `@` → `76.76.21.21`
   - Add a CNAME record: `www` → `cname.vercel-dns.com`

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

- `/` - Homepage
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service

## Email Setup (Separate from Vercel)

Vercel doesn't provide email. Options for @smrtscan.app emails:

### Free Options

1. **Zoho Mail Free** (up to 5 users)
   - Go to [zoho.com/mail](https://www.zoho.com/mail/)
   - Sign up for free plan
   - Add MX records to your domain

2. **ImprovMX** (email forwarding only)
   - Free forwarding to Gmail/personal email
   - Go to [improvmx.com](https://improvmx.com)
   - Forward privacy@smrtscan.app → your Gmail

3. **Cloudflare Email Routing** (if using Cloudflare DNS)
   - Free email forwarding
   - Forward to any email address

### Paid Options

- **Google Workspace**: $6/user/month - Full Gmail experience
- **Fastmail**: $5/user/month - Privacy-focused
- **ProtonMail**: $4/user/month - Encrypted

## Recommended Setup

For a solo founder, use **ImprovMX** or **Cloudflare Email Routing** (both free):
- Forward `privacy@smrtscan.app` → your personal email
- Forward `legal@smrtscan.app` → your personal email
- Forward `support@smrtscan.app` → your personal email

You can reply from Gmail using "Send mail as" feature to make it look like you're replying from @smrtscan.app.

# Trigger deploy

