# CHANGELOG — VIBE.STUDIO Commercial Template

## [v1.0.0-template] - 2026-09-26 (Commercial Release Edition)

### Packaging & White-Labeling
- **Identity Generalization**: Removed personal owner identities and replaced with reusable template placeholders (`VIBE.STUDIO`, `Your Studio / Name`).
- **Credential Scrubbing**: Sanitized personal email, social links, private keys, and Web3Forms access keys with clean placeholders (`YOUR_WEB3FORMS_ACCESS_KEY`, `hello@yourstudio.com`).
- **Commercial Package Assets**: Added `README.md` with complete documentation, `LICENSE` ($300 Commercial Non-Exclusive License), and `BUYER_CUSTOMIZATION_CHECKLIST.md`.

### Bilingual & RTL Infrastructure
- **100% Bilingual Coverage**: Implemented 100% Arabic and English dictionary translation coverage across UI elements, hero titles, buttons, stack cards, case study drawers, contact form errors, footers, tooltips, ARIA labels, and OpenGraph meta tags.
- **RTL Isolation**: Wrapped technical names and code strings in `<bdi dir="ltr">` tags to protect LTR flow within Arabic mode.
- **Dynamic Meta Updates**: Document `lang`, `dir`, title, and meta descriptions switch dynamically upon user selection with zero-flicker state memory.

### Performance & Security
- **WebGL Shader Engine**: Three.js GLSL raymarched canvas with device capability tiers (High, Medium, Low).
- **Motion System**: GSAP 3.12 ScrollTrigger timelines paired with Lenis smooth scrolling.
- **Edge Backend & Security**: Cloudflare Worker API middleware (`worker.js`) with security header hardening, rate limiting, and custom DevTools non-blocking inspector overlay.
