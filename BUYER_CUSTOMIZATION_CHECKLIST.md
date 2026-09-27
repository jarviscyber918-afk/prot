# 📋 Buyer Customization Checklist — VIBE.STUDIO Template

Follow this step-by-step checklist to personalize and launch your new website.

---

## 1. 🔑 Identity & Credentials Removal
- [ ] Open `index.html` and replace all instances of `VIBE.STUDIO` with your company/brand name.
- [ ] Replace `hello@yourstudio.com` with your real contact email.
- [ ] Open `app.js` and verify no personal fallback emails exist.
- [ ] Check `sitemap.xml` and replace `https://vibe-studio-template.demo.app` with your final domain.

---

## 2. 📩 Web3Forms Contact Form Setup
- [ ] Register your recipient email address at [https://web3forms.com](https://web3forms.com) to get your free Access Key.
- [ ] Open `index.html` at line ~320 (`<form id="contact-form">`).
- [ ] Update the `access_key` input:
  ```html
  <input type="hidden" name="access_key" value="YOUR_ACTUAL_ACCESS_KEY_HERE">
  ```
- [ ] Test the contact form locally and confirm test email receipt in your inbox.

---

## 3. 🌐 Dual-Language (English & Arabic RTL) Customization
- [ ] Open `app.js` and navigate to `const i18n = { ... }`.
- [ ] Update English (`en`) strings to match your personal background, headline, services, and bio.
- [ ] Update Arabic (`ar`) strings with your localized Arabic translations.
- [ ] Check technical terms and brand names: ensure any non-translated terms (e.g. your app names or technologies) use `<bdi dir="ltr">Your App</bdi>` tag.

---

## 4. 💼 Projects & Case Studies
- [ ] Open `index.html` and edit the project cards in section `#projects`.
- [ ] Open `app.js` and update the `caseStudies` object definitions:
  - Project Title & Category
  - Live Demo Links (`liveUrl`)
  - GitHub Repository Links (`githubUrl`)
  - Deep-dive statistics, objectives, and client testimonials.
- [ ] Replace project mockup images inside `assets/` or link your own external images.

---

## 5. 🛠️ Tech Stack & Skills
- [ ] Update technology cards in `#stack` section of `index.html`.
- [ ] Adjust tech stack descriptions and mastery percentage badges in `app.js` i18n dictionary.

---

## 6. 🎨 Branding & Theme Styling
- [ ] Open `style.css`.
- [ ] Edit color variables in `:root` if you wish to change theme colors:
  ```css
  :root {
    --accent-primary: #00f0ff;   /* Neon Cyan */
    --accent-secondary: #7000ff; /* Purple Glow */
    --bg-dark: #07090e;          /* Background */
  }
  ```
- [ ] Replace `favicon.svg`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, and `icon-512.png` with your brand logo.

---

## 7. 🚀 Final Pre-Launch Verification
- [ ] Run `node serve-lan.js` or `npx serve` and inspect site at `http://localhost:5500`.
- [ ] Test language toggle switcher (EN -> AR -> EN) and check zero layout flicker.
- [ ] Test contact form submission.
- [ ] Test project case study drawers.
- [ ] Audit mobile layout on mobile browser or device simulator.
- [ ] Deploy to Vercel or Cloudflare Pages (`vercel --prod` or Cloudflare dashboard).

---

*Congratulations! Your VIBE.STUDIO website is ready for launch.*
