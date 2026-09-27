# SECURITY.md — VIBE.STUDIO Template Security Policy & OWASP Audit

## 1. Overview & Security Stance
This repository contains the interactive portfolio template for **VIBE.STUDIO** (`showcase-portfolio`).

- **Architecture**: Static Web Application (Vanilla HTML5 / CSS3 / ES6+ JS, GSAP, Three.js).
- **Core Security Stance**: Defense-in-depth at the Cloudflare Edge. Zero server credentials or private API tokens exist in frontend code.
- **OWASP Compliance**: Designed according to OWASP Top 10:2025, OWASP ASVS v4.0, and OWASP Automated Threats OAT-001 through OAT-021.

---

## 2. Threat Model & Asset Inventory

### Sensitive Assets
1. **Source Code & Git History**: Kept clean of private tokens, passwords, or SMTP credentials.
2. **Third-Party CDN Dependencies**: Three.js, GSAP, Lenis loaded over explicit HTTPS CDNs with pinned versions.
3. **Client-Side Form Submissions**: Contact inquiries routed via Web3Forms with configurable `access_key` (`YOUR_WEB3FORMS_ACCESS_KEY`).

---

## 3. OWASP Automated Threat (OAT) Defense Matrix

| OAT Code | Threat Category | Endpoint | Prevention Control | Response |
| :--- | :--- | :--- | :--- | :--- |
| **OAT-001** | Asset Discovery | `/*` | Cloudflare Bot Management & rate limit | 429 / Managed Challenge |
| **OAT-009** | Credential Stuffing | N/A | No user accounts / login forms exist | N/A (Prevented by architecture) |
| **OAT-014** | Vulnerability Scanning | `/*` | Cloudflare OWASP Ruleset & IP Risk Score | 403 Temporary Block |
| **OAT-017** | Spam Form Submission | `#connectForm` | Honeypot (`botcheck`), 90s rate limit, FormData validation | Silent drop / 429 Retry Message |
| **OAT-019** | Account Creation Abuse| N/A | No registration endpoints | N/A (Prevented by architecture) |
| **OAT-021** | Denial of Service | `/*` | Edge DDoS mitigation, static asset caching | HTTP 429 Rate Limit |

---

## 4. Content Security Policy (CSP) & Hardening Headers

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; 
               script-src 'self' https://unpkg.com https://cdnjs.cloudflare.com https://fonts.googleapis.com 'unsafe-inline' 'unsafe-eval'; 
               style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; 
               font-src 'self' https://fonts.gstatic.com data:; 
               img-src 'self' data: blob: https:; 
               connect-src 'self' https://api.web3forms.com https:; 
               frame-ancestors 'none';">
```

### Production Security Headers (`_headers`)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

---

## 5. Vulnerability Incident Response & SLA
- **Direct Email**: `security@yourstudio.com`
- **Response SLA**: < 2 hours (GMT+3)
