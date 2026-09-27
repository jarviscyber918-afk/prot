# VIBE.STUDIO — Production Deployment & Security Guide

## 1. Core Principles
- **No Fabricated Information**: All portfolio claims, projects, metrics, and availability statements are strictly truthful.
- **Zero Insecure Secrets**: No email passwords, Web3Forms access keys, or private tokens are embedded in frontend source files.
- **Strict Privacy**: Zero non-essential tracking cookies without consent. Form submissions are strictly processed for client inquiry response.

---

## 2. Server Security & Headers (`vercel.json`)
Deployments on Vercel or Cloudflare Pages are configured with hardened HTTP security headers:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' https://unpkg.com https://cdnjs.cloudflare.com 'unsafe-inline' 'unsafe-eval'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https:;" }
      ]
    }
  ]
}
```

---

## 3. Email Delivery & Web3Forms Configuration
- **Recipient Address**: `YOUR_TARGET_EMAIL@example.com`
- **Frontend Submission**: Handled via asynchronous HTML5 `FormData` fetch to `https://api.web3forms.com/submit`.
- **Fallback**: Native mailto links with pre-filled subjects (`mailto:hello@yourstudio.com`).

### Custom Domain Email DNS Setup (If custom email domain is attached later):
1. **SPF Record (TXT)**: `v=spf1 include:spf.web3forms.com include:_spf.google.com ~all`
2. **DKIM Record (TXT)**: Add DKIM key provided by domain email registrar.
3. **DMARC Record (TXT)**: `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com`

---

## 4. Pre-Release Quality Gates & Backup Procedure
Before releasing any production deployment:

1. **Create Pre-Release Snapshot**:
   ```bash
   cp -r . backup_release_$(date +%Y%m%d_%H%M%S)
   ```
2. **Run Automated Integrity Audit**:
   ```bash
   node scratch/verify-production-pass.js
   ```
3. **Run Multi-Viewport Screenshots**:
   ```bash
   node scratch/take-qa-screenshots.js
   ```
4. **Rollback Procedure**:
   - On Vercel: Navigate to **Deployments** → Select previous stable build → Click **Promote to Production**.
   - On local static host: Restore files from `backup_production_pass/` directory.

---

## 5. Dependency & CDN Reliability Policy
- External CDN libraries (Three.js `v0.160.0`, GSAP `3.12.5`, Lenis `1.0.42`) are explicitly version-pinned.
- Graceful degradation wrappers (`try / catch` around WebGL canvas initialization) guarantee that basic HTML/CSS remains fully accessible even if CDN scripts fail to load.
