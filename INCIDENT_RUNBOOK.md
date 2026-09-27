# INCIDENT_RUNBOOK.md — VIBE.STUDIO Security Incident & Abuse Response

## 1. Incident Classification & Severity Matrix

| Severity Level | Trigger Condition | Mitigation SLA | Target Action |
| :--- | :--- | :--- | :--- |
| **SEV-1 (Critical)** | Application-layer DDoS flood, DNS hijacking, origin exposure | < 15 minutes | Enable Cloudflare Under Attack Mode, rotate credentials |
| **SEV-2 (High)** | Web3Forms rate-limit breach, persistent POST spam bursts | < 30 minutes | Enable Edge Managed Challenge, enforce 1-hour IP block |
| **SEV-3 (Medium)** | Isolated bot scanning, missing head/assets alerts | < 2 hours | Update Cloudflare WAF custom rate-limiting rules |
| **SEV-4 (Low)** | Non-exploitative crawler traffic, minor script errors | < 24 hours | Log review, adjust threat sensitivity |

---

## 2. Step-by-Step Incident Mitigation Protocol

### Step 1: Verification & Identification
1. **Determine Nature of Event**: Verify whether traffic is automated bot traffic, Layer 7 HTTP flood, or Web3Forms form spam.
2. **Inspect Edge Logs**: Access Cloudflare Security Analytics and Edge Worker logs (`/api/admin/security-log`).
3. **Check Origin & Target**: Confirm that the origin IP is unexposed and requests are routed through Cloudflare proxy.

### Step 2: Immediate Containment Actions
- **Activate Cloudflare "Under Attack" Mode**:
  - In Cloudflare Dashboard -> Security -> Settings -> Set Security Level to `I'm Under Attack!`.
- **Enforce Edge Rate Limiting**:
  - Restrict `/api/web3forms/submit` to 2 POST requests per 3 minutes per IP.
- **Enable Captcha / Turnstile Managed Challenge**:
  - Force Cloudflare Managed Challenge on high-threat ASNs and unverified bot scores (< 30).

### Step 3: Web3Forms Spam Burst Containment
If spam bypasses honeypot or rate limits:
1. Verify `access_key` (`YOUR_WEB3FORMS_ACCESS_KEY`) status on Web3Forms dashboard.
2. If key is compromised, generate new access key on Web3Forms and update `index.html` and `app.js`.
3. Verify visitor direct fallback email remains active: `mailto:hello@yourstudio.com`.

### Step 4: Post-Incident Recovery & Root-Cause Audit
1. Restore standard Cloudflare Security Level once attack subsides.
2. Review salt and IP hashing logs for pattern updates.
3. Record incident timeline, root cause, and rule modifications in Git repository notes.
