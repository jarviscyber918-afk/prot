# Threat Model — VIBE.STUDIO Portfolio Architecture

## Project Overview
- **Name**: VIBE.STUDIO Showcase Portfolio Template (`showcase-portfolio`)
- **Type**: High-Performance Static Showcase Platform & Collaboration Hub
- **Stack**: Vanilla HTML5, CSS3, ES6+ JavaScript, Three.js 3D WebGL, GSAP, Lenis Smooth Scroll
- **Hosting Target**: Vercel / Cloudflare Pages / Static CDN

---

## 1. Threat Actors & Attackers

| Threat Actor | Motivation | Capability | Likelihood |
|---|---|---|---|
| **Script Kiddies / Automated Bots** | Mass scanning for open directories, exposed `.env` files, or known library exploits | Low | High |
| **Malicious Web Clients** | Attempting XSS injection via forms, DOM manipulation, or script injection | Low-Medium | Medium |
| **Supply Chain Attacker** | Compromising external CDNs (cdnjs, unpkg) to deliver malicious JS payloads | High | Low |

---

## 2. Asset Risk Matrix

| Asset | Vulnerability / Threat | Impact | Risk Level | Mitigation Status |
|---|---|---|---|---|
| **Client Browsers** | DOM XSS via unescaped form handling | High | P1 | **Remediated**: No `innerHTML` used; input handled strictly as text. |
| **Site Framing / UI** | Clickjacking / Redirection via framing | Medium | P2 | **Remediated**: CSP `frame-ancestors 'none'` & `X-Frame-Options: DENY`. |
| **Supply Chain (CDNs)** | Compromised external script tags | Critical | P1 | **Mitigated**: Trusted CDNs (cdnjs, unpkg) pinned to explicit version tags. |
| **Git Repository** | Exposed credentials / API tokens | High | P0 | **Verified**: Zero hardcoded secrets in repository history. |

---

## 3. Remediation & Prioritization Roadmap

- **P0 (Critical)**: Secrets scanning & credential isolation — *Completed (No secrets found)*.
- **P1 (High)**: XSS prevention & input sanitization — *Completed (Strict text node assignment)*.
- **P2 (Medium)**: Security headers (CSP, HSTS, X-Frame-Options) — *Completed in SECURITY.md & index.html*.
- **P3 (Low)**: Dependency audit & performance/monitoring enhancements — *Ongoing process*.
