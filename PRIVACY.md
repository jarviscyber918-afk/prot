# PRIVACY.md — VIBE.STUDIO Privacy Policy & Data Processing Notice

**Effective Date:** September 26, 2026  
**Owner & Data Controller:** VIBE.STUDIO (`privacy@yourstudio.com`)

---

## 1. Overview & Data Minimization Stance
VIBE.STUDIO respects visitor privacy and adheres to data minimization principles (GDPR & CCPA alignment). This website is a static showcase portfolio template designed to operate without intrusive tracking cookies, third-party user tracking, or fingerprinting scripts.

---

## 2. Information Collected & Purpose

### A. Contact Inquiry Submissions
When you submit a message through the contact form at `#connect`, we collect:
- **Your Name**: Used to address you in direct email correspondence.
- **Your Email Address**: Used solely to respond to your inquiry (`_replyto`).
- **Project Scope Selection**: Used to understand your technical requirements.
- **Project Summary / Message**: Used to evaluate project alignment.
- **Consent Flag**: Record of explicit agreement to data processing for inquiry handling.

**Storage & Delivery:**
Submissions are transmitted securely via TLS to [Web3Forms](https://web3forms.com) and delivered directly to your configured recipient address (`hello@yourstudio.com`). Message contents are **never** stored in browser `localStorage`, public databases, or shared with third-party advertisers.

### B. Security & Edge Protection Logs
To protect against automated spam, DDoS, and brute-force attacks, request metadata is processed at the Cloudflare Edge network:
- **IP Address Anonymization**: Visitor IP addresses are immediately anonymized using a salted SHA-256 hash (e.g. `203.0.113.xxx` -> `a4f89...`). Raw IP addresses are **never** exposed in application logs or frontend code.
- **Processed Log Metadata**: Salted IP hash, request timestamp, URL path, HTTP action (`ALLOW`, `CHALLENGE`, `BLOCK`), and security rule trigger.
- **Automated Retention Limit**: Security logs are stored in a restricted key-value database and are **automatically purged after 14 days**.

---

## 3. Cookies & Local Storage
- **Cookies**: Zero tracking or advertising cookies are set by this website.
- **Session Storage**: A single ephemeral item (`jc_last_form`) is stored in your browser session to enforce a local 90-second cooldown between form submissions. This data never leaves your browser and clears when the browser tab is closed.

---

## 4. Visitor Rights & Contact
Under applicable privacy regulations (GDPR / CCPA), you have the right to request deletion or access to your personal correspondence:
- **Direct Inquiry / Data Deletion Request**: Email `privacy@yourstudio.com`.
- **Response SLA**: Within 2 business days.
