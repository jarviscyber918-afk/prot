# VIBE.STUDIO — Premium WebGL & Motion Developer Portfolio Template

> **Commercial Non-Exclusive Digital Template — $300 USD**  
> *An ultra-high performance, dual-language (English / Arabic RTL), WebGL-powered cybernetic portfolio template built for developers, creative engineers, and digital studios.*

---

## 🌟 Overview

**VIBE.STUDIO** is a state-of-the-art, agency-grade digital portfolio template designed to wow clients and employers. Featuring custom interactive WebGL GLSL shaders, GSAP ScrollTrigger micro-animations, Lenis smooth scrolling, full Arabic RTL support with zero layout shift, dynamic interactive case study drawers, and built-in serverless form handling via Web3Forms.

![Product Cover](product_cover_1790442576883.jpg)

---

## 📸 Visual Showcase & Screenshots

| View | Screenshot | Description |
| :--- | :--- | :--- |
| **Desktop English** | ![Desktop English](desktop_en_1790442594753.jpg) | Dark-mode cybernetic layout with neon accents & hero animations |
| **Desktop Arabic (RTL)** | ![Desktop Arabic](desktop_ar_1790442618690.jpg) | Native right-to-left typography, adjusted grid layouts & micro-interactions |
| **Mobile (EN & AR)** | *Included in Template* | Fully responsive touch-optimized layout with adaptive DPR performance capping |
| **WebGL Shader Engine** | *Included in Template* | Raymarched glowing plasma sphere canvas with mouse-inertia warping |
| **Interactive Case Studies** | *Included in Template* | Slide-over drawers with project stats, deep-dives, live links & tech tags |
| **Contact Form Success** | *Included in Template* | Animated success feedback with Web3Forms API serverless delivery |
| **RTL Engine & Typography** | *Included in Template* | Dynamic language switcher maintaining text isolation for LTR code & terms |

---

## 🔗 Live Demo

- **Live Demo Preview**: `https://vibe-studio-template.demo.app` *(Replace with your live URL after deployment)*
- **Local Dev Preview**: `http://localhost:5500`

---

## ✨ Features List

- ⚡ **Ultra-Fast & Lightweight**: Built with Vanilla HTML5, CSS3, and JavaScript — zero heavy frameworks or heavy node dependency bloat.
- 🎨 **WebGL Raymarched Shader**: Interactive 3D animated canvas using Three.js with automatic high/medium/low device GPU capability detection.
- 🌐 **Complete Bilingual System (EN / AR RTL)**:
  - 100% Arabic & English translation coverage for all UI strings, placeholders, ARIA tags, and OpenGraph metadata.
  - Native RTL flexbox/grid flips with `letter-spacing: 0` and custom line-heights.
  - `<bdi dir="ltr">` isolation for code snippets, technical terms, and brand names.
  - Persistent language preference stored in `localStorage`.
- 🎬 **Smooth Motion Architecture**: GSAP ScrollTrigger timeline animations combined with Lenis smooth scrolling.
- 💼 **Interactive Case Study Drawers**: Side-drawer modal system for displaying project details, tech stacks, and live links without leaving the page.
- 📩 **Serverless Contact Form**: Web3Forms integration with built-in client-side validation, rate limiting, and instant feedback notifications.
- 🛡️ **Security & Privacy First**:
  - Non-blocking DevTools inspector detector overlay with session memory.
  - Cloudflare Worker backend API middleware (`worker.js`) for rate limiting and header hardening.
  - `privacy.html` compliance page included out of the box.
- 📱 **PWA Ready**: Web application manifest (`site.webmanifest`), complete favicon system (16px, 32px, 180px, 192px, 512px, SVG), and offline support.
- 🔍 **SEO & Social Graph Optimized**: Structured JSON-LD metadata (`Person`, `ProfessionalService`, `WebSite`), `hreflang` tags, `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Technology Stack

- **Markup & Styling**: HTML5, Vanilla CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism)
- **Programming Language**: JavaScript (ES6+ Modules)
- **3D Graphics & WebGL**: Three.js GLSL Raymarched Shaders
- **Animations & Motion**: GSAP 3.12+, ScrollTrigger, Lenis Smooth Scroll
- **Form Handling**: Web3Forms API (Zero backend required)
- **Backend Edge Security**: Cloudflare Workers API (`worker.js`) / Vercel Edge Serverless
- **Typography**: Outfit, Cairo (Arabic Google Fonts)

---

## 💻 Browser & Device Support

| Browser / Device | Support Status | Minimum Version | Notes |
| :--- | :--- | :--- | :--- |
| **Google Chrome** | ✅ Supported | Chrome 90+ | Full WebGL & GSAP support |
| **Mozilla Firefox** | ✅ Supported | Firefox 88+ | Full WebGL & GSAP support |
| **Apple Safari** | ✅ Supported | Safari 14+ | WebGL DPR capped for power saving |
| **Microsoft Edge** | ✅ Supported | Edge 90+ | Full WebGL & GSAP support |
| **iOS Safari (iPhone/iPad)**| ✅ Supported | iOS 14+ | Adaptive low-power canvas mode |
| **Android Chrome** | ✅ Supported | Android 10+ | Touch-optimized, smooth touch controls |

---

## 🚀 Quick Start & Installation

### 1. Extract Template Files
Unzip the `vibe-studio-template.zip` archive into your workspace folder.

### 2. Run Local Development Server
No complex build commands required! You can use any static local web server:

**Option A: Using Node.js (Included helper)**
```bash
node serve-lan.js
# Serves application at http://localhost:5500
```

**Option B: Using npx serve**
```bash
npx serve ./ -p 5500
```

**Option C: VS Code Live Server**
Right-click `index.html` -> **Open with Live Server**.

---

## ✉️ Email Setup & Web3Forms Access Key

The contact form uses [Web3Forms](https://web3forms.com/) for instant serverless email delivery.

### How to set up your email form:
1. Go to [https://web3forms.com](https://web3forms.com) and enter your target email address to receive your free Access Key.
2. Open `index.html`.
3. Locate the contact form hidden access key field:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```
4. Replace `"YOUR_WEB3FORMS_ACCESS_KEY"` with your actual key.
5. *(Optional)* Open `app.js` and update fallback keys if applicable.

---

## 🎨 Buyer Customization Guide

See [BUYER_CUSTOMIZATION_CHECKLIST.md](file:///c:/Users/NOT%20FOUND/Downloads/showcase-portfolio/BUYER_CUSTOMIZATION_CHECKLIST.md) for a comprehensive step-by-step checklist.

### Quick Personalization Steps:
1. **Update Brand Identity & Name**:
   - Open `index.html` and search for `VIBE.STUDIO` or `Your Name / Studio`. Replace with your brand.
2. **Update Social & Project Links**:
   - Search `index.html` for `href="#"` or placeholder URLs (`https://github.com/yourusername`) and replace with your real URLs.
3. **Customize i18n Translations**:
   - Open `app.js` and locate the `i18n` object. Customize strings for English (`en`) and Arabic (`ar`).
4. **Change Color Theme**:
   - Open `style.css` and edit top CSS Variables (`:root`):
     ```css
     :root {
       --accent-primary: #00f0ff;   /* Main neon color */
       --accent-secondary: #7000ff; /* Gradient secondary */
       --bg-dark: #07090e;          /* Main dark background */
     }
     ```

---

## 🌐 Deployment Options

### Deploying to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run command: `vercel --prod`
3. Vercel automatically detects static HTML configuration from `vercel.json`.

### Deploying to Cloudflare Pages / Workers
1. Connect your GitHub repository to Cloudflare Pages.
2. Set Build command: *(leave empty)*, Build output directory: `./`.
3. *(Optional Worker API)* Deploy `worker.js` to Cloudflare Workers using Wrangler: `npx wrangler deploy`.

### Deploying to Netlify
1. Drag and drop the folder into Netlify Drop UI, or link repository.
2. Headers are pre-configured in `_headers`.

---

## 📜 License & Terms

Purchased under the **$300 Commercial Non-Exclusive License**.
See full details in the [LICENSE](file:///c:/Users/NOT%20FOUND/Downloads/showcase-portfolio/LICENSE) file.

- **Permitted**: Commercial use for yourself or 1 client, customization, hosting on unlimited personal domains.
- **Prohibited**: Resale, re-distribution, sub-licensing, or inclusion in digital template marketplaces.

---

*Designed and Developed with ❤️ by VIBE.STUDIO Team.*
