// VIBE.STUDIO — Production-grade JS
// Strict progressive enhancement: content works without JS/WebGL.

(function () {
  'use strict';

  // ─────────────────────────────────────────────
  // 0. ADAPTIVE DEVICE-PERFORMANCE SYSTEM
  // Tiers: High (full WebGL/motion), Medium (optimized WebGL), Low (static fallback)
  // ─────────────────────────────────────────────
  function getQualityTier() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'low';
    }
    const nav = navigator || {};
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;

    if (conn && (conn.saveData || ['slow-2g', '2g'].includes(conn.effectiveType))) {
      return 'low';
    }

    const cores = nav.hardwareConcurrency || 4;
    const memory = nav.deviceMemory || 4;

    if (cores <= 2 || memory <= 1.5) {
      return 'low';
    } else if (cores <= 4 || memory <= 3) {
      return 'medium';
    }
    return 'high';
  }

  const qualityTier    = getQualityTier();
  const isMobile       = window.innerWidth <= 768;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const skipWebGL      = (qualityTier === 'low');

  // ─────────────────────────────────────────────
  // 1. COMPLETE i18n DICTIONARY
  // ─────────────────────────────────────────────
  const i18n = {
    en: {
      // SEO & Meta
      page_title: 'VIBE.STUDIO — Creative Web Architect & Vibe Coder',
      meta_desc: 'VIBE.STUDIO builds high-performance responsive web platforms, 3D WebGL experiences, and conversion-focused landing pages. Available for projects in 2026.',
      og_title: 'VIBE.STUDIO — Creative Web Architect',
      og_desc: 'High-performance responsive web platforms, 3D WebGL experiences, and conversion design template. Available for projects 2026.',
      twitter_title: 'VIBE.STUDIO — Creative Web Architect',
      twitter_desc: 'High-performance responsive web platforms, 3D WebGL experiences, and conversion design.',

      // Skip link
      skip_link: 'Skip to main content',

      // Navigation
      nav_overview: 'Overview',
      nav_services: 'Services',
      nav_platforms: 'Work',
      nav_connect: 'Connect',
      btn_start_project: 'Start a Project',
      drawer_heading: '// NAVIGATION',

      // Hero
      hero_badge: 'VIBE.STUDIO // VIBE CODER & PLATFORM ARCHITECT',
      hero_line1: 'Architecting Responsive',
      hero_line2: 'Web Platforms &',
      hero_line3_plain: 'Rapid Prototypes',
      hero_line3_suffix: '.',
      hero_subtitle: 'I build high-performance web platforms, 3D WebGL experiences, and conversion-focused interfaces — for brands and startups that demand the best.',
      btn_view_work: 'View Case Studies',
      hero_avail: 'Available for new projects · 2026',

      // WebGL
      webgl_title: 'ATMOSPHERIC_CLOUD_ENGINE.GL',
      webgl_fallback: '3D WebGL Engine',
      webgl_status: 'THREE.JS // WEBGL 2.0 ENGINE',

      // Services & Process
      services_eyebrow: '// 02. WHAT I BUILD',
      services_title: 'Services & Capabilities',
      services_subtitle: 'From landing pages to full 3D experiences — every build is engineered for speed, conversion, and craft.',
      svc_frontend: 'Creative Frontend Experiences',
      svc_frontend_desc: 'Pixel-perfect, buttery-smooth interfaces built with vanilla JS, CSS architecture, and premium micro-interactions.',
      svc_3d: '3D & WebGL Experiences',
      svc_3d_desc: 'Procedural 3D scenes, interactive WebGL experiences, and real-time rendering with Three.js — optimized for 60 FPS.',
      svc_landing: 'Landing Pages & Conversion Design',
      svc_landing_desc: 'High-converting landing pages and portfolio platforms engineered for speed, trust, and measurable results.',
      svc_automation: 'Automation & Integrations',
      svc_automation_desc: 'Webhook pipelines, Google Apps Script automations, and serverless integrations that cut manual work entirely.',
      process_discover: 'Discover',
      process_design: 'Design',
      process_build: 'Build',
      process_launch: 'Launch',

      // Platforms (Projects)
      platforms_eyebrow: '// 03. SIGNATURE WORK',
      platforms_title: 'Featured Web Platforms',
      platforms_subtitle: 'Production-grade web architecture, responsive client platforms, and WebGL experiences.',
      filter_all: 'All Platforms',
      filter_responsive: 'Responsive Architectures',
      filter_commerce: 'Web Commerce',
      filter_3d: '3D & WebGL',
      status_live: '● LIVE',

      badge_clinic: 'CLINICAL WEB PLATFORM',
      desc_cabin: 'Modern dental clinic web platform featuring seamless interactive calendar appointment booking and client dashboard architecture.',
      hl_mobile: 'Mobile Responsive',
      hl_sync: 'Real-time Slot Sync',
      tag_responsive: 'Full-Responsive Web',
      tag_scheduling: 'Dynamic Scheduling',
      tag_ux_arch: 'UX Architecture',
      tag_vanilla_js: 'Vanilla JS',

      badge_commerce: 'WEB COMMERCE',
      desc_boutique: 'High-conversion web commerce platform with automated Google Apps Script Webhook pipeline integration and dynamic cart state.',
      hl_latency: 'Zero-Latency Dispatch',
      hl_ledger: 'Instant Ledger Sync',
      tag_commerce: 'Web Commerce',
      tag_webhooks: 'Webhook Pipelines',
      tag_serverless: 'Serverless Flow',
      tag_apps_script: 'Apps Script',

      badge_3d: '3D WEBGL EXPERIENCE',
      desc_maison: 'Luxury French haute pâtisserie digital experience featuring real-time procedural 3D pastry showcases and kinetic typography.',
      hl_fps: '60 FPS WebGL',
      hl_inspect: 'Interactive 360° View',
      tag_three_3d: 'Three.js 3D',
      tag_webgl_shaders: 'WebGL Shaders',
      tag_gsap_scroll: 'GSAP ScrollTrigger',
      tag_luxury_ux: 'Luxury UX',

      btn_case_study: 'View Case Study',
      btn_launch: 'Launch Live ↗',

      // Stack (Skills)
      stack_eyebrow: '// 04. SPECS & CAPABILITIES',
      stack_title: 'Engineering Stack & Skill Matrix',
      stack_subtitle: 'Comprehensive breakdown of core competencies, graphics acceleration frameworks, and system scripting.',
      stack_all: 'All Stack Domains',
      stack_frontend: 'Frontend & Core',
      stack_creative: 'Creative & Graphics',
      stack_systems: 'Systems & Automation',

      tech_js_title: 'Modern JavaScript (ES6+)',
      tech_js_badge: 'CORE RUNTIME',
      tech_js_desc: 'Asynchronous Event Loop, DOM Performance Profiling, Zero-Dependency State Engines, ES Modules.',
      tech_js_tag1: 'Async/Await',
      tech_js_tag2: 'DOM API',
      tech_js_tag3: 'Fetch/REST',
      tech_js_tag4: 'Modular ES6',
      tech_js_proof: '● Verified on Cabin Vita & Boutique',

      tech_css_title: 'Responsive CSS3 & Layouts',
      tech_css_badge: 'PRODUCTION STANDARD',
      tech_css_desc: 'Dynamic clamp() typography, CSS Grid & Flexbox architecture, Sub-pixel rendering, Cross-device resilience.',
      tech_css_tag1: 'CSS Grid',
      tech_css_tag2: 'clamp()',
      tech_css_tag3: 'Custom Properties',
      tech_css_tag4: 'Container Queries',
      tech_css_proof: '● 100% Mobile & Desktop Sync across all platforms',

      tech_3d_title: 'Three.js & Procedural WebGL',
      tech_3d_badge: 'CREATIVE COMPUTING',
      tech_3d_desc: 'Procedural geometry generation, custom PBR materials, performance render loops, camera culling.',
      tech_3d_tag1: 'WebGL',
      tech_3d_tag2: 'PBR Shaders',
      tech_3d_tag3: 'Interactive Cameras',
      tech_3d_tag4: '60 FPS Loop',
      tech_3d_proof: '● Maison Dorée 3D Haute Pâtisserie Engine',

      tech_gsap_title: 'GSAP Motion & Kinetic UI',
      tech_gsap_badge: 'INTERACTION ENGINE',
      tech_gsap_desc: 'Timeline choreography, Lenis inertial integration, magnetic micro-interactions, layout morphing.',
      tech_gsap_tag1: 'ScrollTrigger',
      tech_gsap_tag2: 'Timelines',
      tech_gsap_tag3: 'Inertial Scroll',
      tech_gsap_tag4: 'Physics Easing',
      tech_gsap_proof: '● Portfolio Navigation & Platform Card Reveals',

      tech_react_title: 'React & Next.js Architecture',
      tech_react_badge: 'APPLICATION FRAMEWORKS',
      tech_react_desc: 'Component-driven architecture, state lifecycle management, client hydration, dynamic route optimization.',
      tech_react_tag1: 'Hooks',
      tech_react_tag2: 'Component Lifecycle',
      tech_react_tag3: 'State Management',
      tech_react_tag4: 'App Router',
      tech_react_proof: '● Scalable Web Architecture Specs',

      tech_webhooks_title: 'Webhooks & API Pipelines',
      tech_webhooks_badge: 'WORKFLOW AUTOMATION',
      tech_webhooks_desc: 'Headless form routing, Google Apps Script Webhooks, serverless payload dispatch, zero-latency integrations.',
      tech_webhooks_tag1: 'Apps Script',
      tech_webhooks_tag2: 'Webhook Payloads',
      tech_webhooks_tag3: 'JSON Schemas',
      tech_webhooks_tag4: 'REST API',
      tech_webhooks_proof: '● Boutique E-Commerce Live Ordering Engine',

      tech_python_title: 'Python Automation & Scripting',
      tech_python_badge: 'SYSTEM UTILITIES',
      tech_python_desc: 'Automated development workflows, data conversion pipelines, structural asset processing.',
      tech_python_tag1: 'Automation',
      tech_python_tag2: 'Data Processing',
      tech_python_tag3: 'File I/O',
      tech_python_tag4: 'Dev Scripts',
      tech_python_proof: '● Development Automation & Asset Pipelines',

      tech_cpp_title: 'C++ Systems & Performance',
      tech_cpp_badge: 'SYSTEM ARCHITECTURE',
      tech_cpp_desc: 'Memory architecture principles, computational optimization, deterministic runtime design.',
      tech_cpp_tag1: 'Data Structures',
      tech_cpp_tag2: 'Memory Concepts',
      tech_cpp_tag3: 'Algorithmic Speed',
      tech_cpp_tag4: 'Optimization',
      tech_cpp_proof: '● Algorithmic Performance Foundations',

      // Connect
      connect_eyebrow: '// 05. COLLABORATION',
      connect_title: 'Start a Project',
      connect_subtitle: 'Tell me about your project. I respond within 2 hours.',
      connect_avail: 'Available for new projects · 2026',
      connect_sla: 'GMT+3 · Response within 2 hours',
      label_direct_email: 'Direct Email:',
      copy_label: 'Copy',
      copy_done: 'Copied ✓',
      btn_follow_x: 'Follow @yourstudio on X ↗',
      label_scope: 'Project Scope:',
      scope_responsive: 'Responsive Platform',
      scope_prototype: 'Rapid Prototype',
      scope_3d: '3D WebGL',
      scope_automation: 'Automation',
      label_name: 'Your Name',
      placeholder_name: 'Your full name',
      label_email: 'Your Email',
      placeholder_email: 'your@email.com',
      label_message: 'Project Summary',
      placeholder_message: 'Describe your project, goals, and timeline…',
      label_privacy: 'I agree that my submitted data will be used to respond to my inquiry.',
      btn_send_request: 'Send Request →',

      // Feedback & Errors
      err_name_req: 'Please enter your name.',
      err_email_req: 'Please enter a valid email address.',
      err_message_req: 'Please describe your project (minimum 10 characters).',
      err_privacy_req: 'Please accept to continue.',
      form_sending: 'Sending…',
      form_success: 'Message received — I\'ll be in touch within 2 hours.',
      form_error: 'Something went wrong. Please email directly:',
      btn_download_cv: 'Download CV',

      // Case study labels
      cs_overview: 'Overview',
      cs_challenge: 'Challenge',
      cs_solution: 'Solution',
      cs_results: 'Results',
      cs_live: 'Launch Live Platform ↗',
      cs_preview: '— Preview',

      // DevTools warning
      devtools_badge: '// NOTICE',
      devtools_title: 'Developer tools detected.',
      devtools_desc: 'Please respect the website and do not attempt to access private functionality. The interface may be unavailable while developer tools are open.',
      devtools_btn: 'Acknowledge & Continue →',

      // Footer
      footer_text: 'VIBE.STUDIO // VIBE.CODE © 2026. All rights reserved.',
      footer_privacy: 'Privacy Policy',

      // Noscript banner
      noscript_text: 'JavaScript is currently disabled. The portfolio is fully readable. For direct project inquiries, email contact@yourstudio.com.',

      // Aria labels
      aria_brand: 'VIBE.STUDIO — Home',
      aria_nav_dock: 'Main navigation',
      aria_lang_switch: 'Language selector',
      aria_lang_en: 'Switch to English',
      aria_lang_ar: 'Switch to Arabic',
      aria_hamburger: 'Open navigation menu',
      aria_drawer: 'Mobile navigation menu',
      aria_close_drawer: 'Close navigation menu',
      aria_hero_window: 'Interactive 3D cloud WebGL demonstration',
      aria_process_strip: 'How I work',
      aria_project_filters: 'Filter projects by type',
      aria_stack_filters: 'Filter skills by domain',
      aria_mailto_link: 'Send email to contact@yourstudio.com',
      aria_copy_email_btn: 'Copy email address contact@yourstudio.com',
      aria_follow_x: 'Follow VIBE.STUDIO on X (Twitter)',
      aria_connect_form: 'Project inquiry form',
      aria_scope_group: 'Project scope options',
      aria_cs_drawer: 'Case study details modal',
      aria_cs_close: 'Close case study',
      aria_devtools_modal: 'Developer tools notice modal',
      aria_devtools_close: 'Close notification',
    },
    ar: {
      // SEO & Meta
      page_title: 'VIBE.STUDIO — مهندس منصات ويب متجاوبة ومطور تفاعلي',
      meta_desc: 'أبني منصات ويب عالية الأداء وتجارب WebGL ثلاثية الأبعاد وواجهات موجهة للتحويل للعلامات التجارية والشركات الناشئة. متاح للمشاريع في 2026.',
      og_title: 'VIBE.STUDIO — مهندس منصات ويب متجاوبة',
      og_desc: 'منصات ويب عالية الأداء، تجارب WebGL ثلاثية الأبعاد، وتصاميم مخصصة للتحويل. متاح للمشاريع في 2026.',
      twitter_title: 'VIBE.STUDIO — مهندس منصات ويب متجاوبة',
      twitter_desc: 'منصات ويب عالية الأداء، تجارب WebGL ثلاثية الأبعاد، وتصاميم مخصصة للتحويل.',

      // Skip link
      skip_link: 'انتقل إلى المحتوى الرئيسي',

      // Navigation
      nav_overview: 'نظرة عامة',
      nav_services: 'الخدمات',
      nav_platforms: 'الأعمال',
      nav_connect: 'تواصل',
      btn_start_project: 'ابدأ مشروعك',
      drawer_heading: '// القائمة',

      // Hero
      hero_badge: 'VIBE.STUDIO // مهندس منصات ويب ومطور تفاعلي',
      hero_line1: 'أبني منصات ويب',
      hero_line2: 'متجاوبة وعصرية',
      hero_line3_plain: 'بأعلى معايير الأداء',
      hero_line3_suffix: '.',
      hero_subtitle: 'أبني منصات ويب عالية الأداء وتجارب WebGL ثلاثية الأبعاد وواجهات موجهة للتحويل — للعلامات التجارية والشركات التي تتطلع للأفضل.',
      btn_view_work: 'اطّلع على المشاريع',
      hero_avail: 'متاح لمشاريع جديدة · 2026',

      // WebGL
      webgl_title: 'ATMOSPHERIC_CLOUD_ENGINE.GL',
      webgl_fallback: 'محرك WebGL ثلاثي الأبعاد',
      webgl_status: 'THREE.JS // WEBGL 2.0 ENGINE',

      // Services & Process
      services_eyebrow: '// ٠٢. ماذا أبني',
      services_title: 'الخدمات والقدرات',
      services_subtitle: 'من صفحات الهبوط إلى التفاعلات ثلاثية الأبعاد — كل مشروع مُصمم للسرعة والتحويل والجودة.',
      svc_frontend: 'تجارب واجهات إبداعية',
      svc_frontend_desc: 'واجهات مصقولة وسلسة مبنية بـ JavaScript خالص وهندسة CSS وتفاعلات دقيقة.',
      svc_3d: 'تجارب ثلاثية الأبعاد وWebGL',
      svc_3d_desc: 'مشاهد ثلاثية الأبعاد وتجارب WebGL تفاعلية وعرض فوري بـ Three.js — مُحسَّن لـ 60 إطاراً في الثانية.',
      svc_landing: 'صفحات الهبوط وتصاميم التحويل',
      svc_landing_desc: 'صفحات هبوط عالية التحويل ومحافظ أعمال مُحسَّنة للسرعة والثقة ونتائج قابلة للقياس.',
      svc_automation: 'الأتمتة والتكاملات',
      svc_automation_desc: 'مسارات Webhook وأتمتة Google Apps Script وتكاملات بدون خوادم تُلغي العمل اليدوي تماماً.',
      process_discover: 'استكشاف',
      process_design: 'تصميم',
      process_build: 'بناء',
      process_launch: 'إطلاق',

      // Platforms (Projects)
      platforms_eyebrow: '// ٠٣. أبرز الأعمال',
      platforms_title: 'المنصات المنجزة',
      platforms_subtitle: 'هندسة ويب احترافية ومنصات متجاوبة وتجارب WebGL.',
      filter_all: 'كل المنصات',
      filter_responsive: 'الأنظمة المتجاوبة',
      filter_commerce: 'التجارة الإلكترونية',
      filter_3d: 'ثلاثي الأبعاد وWebGL',
      status_live: '● مباشر',

      badge_clinic: 'منصة عيادة طبية',
      desc_cabin: 'منصة رقمية متكاملة لعيادة أسنان مع نظام حجز مواعيد تفاعلي وجدول زمني متجاوب.',
      hl_mobile: 'متجاوب مع الجوال',
      hl_sync: 'مزامنة مواعيد فورية',
      tag_responsive: 'ويب متجاوب بالكامل',
      tag_scheduling: 'جدولة تفاعلية',
      tag_ux_arch: 'هندسة تجربة المستخدم',
      tag_vanilla_js: 'JavaScript خالص',

      badge_commerce: 'تجارة إلكترونية',
      desc_boutique: 'متجر إلكتروني عالي التحويل مدمج مع خط Webhook تلقائي وحالة سلة تفاعلية.',
      hl_latency: 'توجيه فوري للطلبات',
      hl_ledger: 'مزامنة آنية للبيانات',
      tag_commerce: 'تجارة إلكترونية',
      tag_webhooks: 'مسارات Webhook',
      tag_serverless: 'معالجة بدون خوادم',
      tag_apps_script: 'Google Apps Script',

      badge_3d: 'تجربة WebGL ثلاثية الأبعاد',
      desc_maison: 'تجربة ويب فاخرة لمتجر حلويات فرنسي مع مجسمات ثلاثية الأبعاد وحركات نصوص متناسقة.',
      hl_fps: 'أداء 60 إطاراً',
      hl_inspect: 'معاينة 360° تفاعلية',
      tag_three_3d: 'ثلاثي الأبعاد Three.js',
      tag_webgl_shaders: 'مظللات WebGL',
      tag_gsap_scroll: 'تحريك GSAP ScrollTrigger',
      tag_luxury_ux: 'تجربة مستخدم فاخرة',

      btn_case_study: 'عرض التفاصيل',
      btn_launch: 'معاينة المنصة ↗',

      // Stack (Skills)
      stack_eyebrow: '// ٠٤. القدرات الهندسية',
      stack_title: 'التقنيات والمهارات',
      stack_subtitle: 'تفصيل شامل للقدرات الهندسية الأساسية وأطر العمل والنصوص البرمجية.',
      stack_all: 'كل المجالات',
      stack_frontend: 'الواجهات والأساسيات',
      stack_creative: 'الرسومات والتفاعل',
      stack_systems: 'الأنظمة والأتمتة',

      tech_js_title: 'JavaScript الحديثة (ES6+)',
      tech_js_badge: 'البيئة الأساسية',
      tech_js_desc: 'حلقة الأحداث غير المتزامنة، تحليل أداء DOM، محركات حالة بدون مكتبات خارجية، وحدات ES Modules.',
      tech_js_tag1: 'Async/Await',
      tech_js_tag2: 'DOM API',
      tech_js_tag3: 'Fetch/REST',
      tech_js_tag4: 'Modular ES6',
      tech_js_proof: '● مُثبَت في Cabin Vita وBoutique',

      tech_css_title: 'تنسيقات CSS3 والتخطيطات المتجاوبة',
      tech_css_badge: 'معيار الإنتاج',
      tech_css_desc: 'طباعة ديناميكية بدالة clamp()، هندسة CSS Grid & Flexbox، عرض عالي الدقة، مرونة عبر الأجهزة.',
      tech_css_tag1: 'CSS Grid',
      tech_css_tag2: 'clamp()',
      tech_css_tag3: 'Custom Properties',
      tech_css_tag4: 'Container Queries',
      tech_css_proof: '● مزامنة 100% بين الجوال وسطي المكتب',

      tech_3d_title: 'Three.js وWebGL الإجرائي',
      tech_3d_badge: 'الحوسبة الإبداعية',
      tech_3d_desc: 'توليد الهندسة الإجرائية، مواد PBR مخصصة، حلقات عرض عالية الأداء، استبعاد الكاميرا.',
      tech_3d_tag1: 'WebGL',
      tech_3d_tag2: 'PBR Shaders',
      tech_3d_tag3: 'Interactive Cameras',
      tech_3d_tag4: '60 FPS Loop',
      tech_3d_proof: '● محرك Maison Dorée ثلاثي الأبعاد',

      tech_gsap_title: 'تحريك GSAP والواجهات الحركية',
      tech_gsap_badge: 'محرك التفاعل',
      tech_gsap_desc: 'تنسيق الخط الزمني، تكامل Lenis للتمرير السلس، تفاعلات مغناطيسية دقيقة، تحول التخطيطات.',
      tech_gsap_tag1: 'ScrollTrigger',
      tech_gsap_tag2: 'Timelines',
      tech_gsap_tag3: 'Inertial Scroll',
      tech_gsap_tag4: 'Physics Easing',
      tech_gsap_proof: '● التنقل وكشف بطاقات المنصات',

      tech_react_title: 'هندسة React وNext.js',
      tech_react_badge: 'أطر عمل التطبيقات',
      tech_react_desc: 'هندسة قائمة على المكونات، إدارة دورة حياة الحالة، الترطيب المباشر، تحسين المسارات الديناميكية.',
      tech_react_tag1: 'Hooks',
      tech_react_tag2: 'Component Lifecycle',
      tech_react_tag3: 'State Management',
      tech_react_tag4: 'App Router',
      tech_react_proof: '● مواصفات هندسة الويب القابلة للتوسع',

      tech_webhooks_title: 'مسارات Webhooks والواجهات البرمجية',
      tech_webhooks_badge: 'أتمتة سير العمل',
      tech_webhooks_desc: 'توجيه النماذج المباشر، Google Apps Script Webhooks، إرسال البيانات بدون خادم، تكاملات فورية.',
      tech_webhooks_tag1: 'Apps Script',
      tech_webhooks_tag2: 'Webhook Payloads',
      tech_webhooks_tag3: 'JSON Schemas',
      tech_webhooks_tag4: 'REST API',
      tech_webhooks_proof: '● محرك الطلبات المباشر لـ Boutique',

      tech_python_title: 'أتمتة Python والنصوص البرمجية',
      tech_python_badge: 'أدوات النظام',
      tech_python_desc: 'سير عمل التطوير المؤتمت، خطوط تحويل البيانات، معالجة الأصول الهيكلية.',
      tech_python_tag1: 'Automation',
      tech_python_tag2: 'Data Processing',
      tech_python_tag3: 'File I/O',
      tech_python_tag4: 'Dev Scripts',
      tech_python_proof: '● أتمتة التطوير ومسارات الأصول',

      tech_cpp_title: 'أنظمة C++ والأداء العالي',
      tech_cpp_badge: 'هندسة الأنظمة',
      tech_cpp_desc: 'مبادئ هندسة الذاكرة، التحسين الحسابي، تصميم وقت التشغيل المباشر.',
      tech_cpp_tag1: 'Data Structures',
      tech_cpp_tag2: 'Memory Concepts',
      tech_cpp_tag3: 'Algorithmic Speed',
      tech_cpp_tag4: 'Optimization',
      tech_cpp_proof: '● أساسيات الأداء الخوارزمي',

      // Connect
      connect_eyebrow: '// ٠٥. التعاون',
      connect_title: 'ابدأ مشروعك',
      connect_subtitle: 'أخبرني عن مشروعك. أرد خلال ساعتين.',
      connect_avail: 'متاح لمشاريع جديدة · 2026',
      connect_sla: 'توقيت خليجي GMT+3 · الاستجابة خلال ساعتين',
      label_direct_email: 'البريد الإلكتروني المباشر:',
      copy_label: 'نسخ',
      copy_done: 'تم النسخ ✓',
      btn_follow_x: 'متابعة @yourstudio على X ↗',
      label_scope: 'نوع المشروع:',
      scope_responsive: 'منصة متجاوبة',
      scope_prototype: 'نموذج أولي',
      scope_3d: '3D WebGL',
      scope_automation: 'أتمتة',
      label_name: 'اسمك',
      placeholder_name: 'اسمك الكامل',
      label_email: 'بريدك الإلكتروني',
      placeholder_email: 'بريدك@الإلكتروني.com',
      label_message: 'نبذة عن المشروع',
      placeholder_message: 'اشرح مشروعك وأهدافك والجدول الزمني المتوقع…',
      label_privacy: 'أوافق على استخدام بياناتي المرفقة للرد على استفساري.',
      btn_send_request: 'إرسال الطلب ←',

      // Feedback & Errors
      err_name_req: 'الرجاء إدخال اسمك.',
      err_email_req: 'الرجاء إدخال بريد إلكتروني صحيح.',
      err_message_req: 'الرجاء وصف مشروعك (10 حروف على الأقل).',
      err_privacy_req: 'الرجاء الموافقة للمتابعة.',
      form_sending: 'جارٍ الإرسال…',
      form_success: 'استلمت رسالتك — سأتواصل معك خلال ساعتين.',
      form_error: 'حدث خطأ. يمكنك المراسلة مباشرةً:',
      btn_download_cv: 'تحميل السيرة الذاتية',

      // Case study labels
      cs_overview: 'نظرة عامة',
      cs_challenge: 'التحدي',
      cs_solution: 'الحل',
      cs_results: 'النتائج',
      cs_live: 'شاهد المنصة الحية ↗',
      cs_preview: '— معاينة',

      // DevTools warning
      devtools_badge: '// تنبيه',
      devtools_title: 'تم اكتشاف أدوات المطور.',
      devtools_desc: 'يرجى احترام الموقع وعدم محاولة الوصول إلى وظائف خاصة. قد تتوقف الواجهة مؤقتاً أثناء فتح أدوات المطور.',
      devtools_btn: 'المتابعة للموقع ←',

      // Footer
      footer_text: 'VIBE.STUDIO // VIBE.CODE © 2026. جميع الحقوق محفوظة.',
      footer_privacy: 'سياسة الخصوصية',

      // Noscript banner
      noscript_text: 'جافاسكريبت معطل حالياً. المحتوى قابل للقراءة بالكامل. للاستفسار المباشر، يرجى مراسلة contact@yourstudio.com.',

      // Aria labels
      aria_brand: 'VIBE.STUDIO — الرئيسية',
      aria_nav_dock: 'قائمة التصفح الرئيسية',
      aria_lang_switch: 'محدد اللغة',
      aria_lang_en: 'التحويل إلى الإنجليزية',
      aria_lang_ar: 'التحويل إلى العربية',
      aria_hamburger: 'فتح قائمة التصفح',
      aria_drawer: 'قائمة التصفح للجوال',
      aria_close_drawer: 'إغلاق قائمة التصفح',
      aria_hero_window: 'عرض WebGL ثلاثي الأبعاد تفاعلي',
      aria_process_strip: 'طريقة العمل',
      aria_project_filters: 'تصفية المشاريع حسب النوع',
      aria_stack_filters: 'تصفية المهارات حسب المجال',
      aria_mailto_link: 'إرسال بريد إلكتروني إلى contact@yourstudio.com',
      aria_copy_email_btn: 'نسخ عنوان البريد الإلكتروني',
      aria_follow_x: 'متابعة VIBE.STUDIO على منصة X',
      aria_connect_form: 'نموذج استفسار عن مشروع',
      aria_scope_group: 'خيارات نطاق المشروع',
      aria_cs_drawer: 'تفاصيل حالة الدراسة',
      aria_cs_close: 'إغلاق حالة الدراسة',
      aria_devtools_modal: 'تنبيه أدوات المطور',
      aria_devtools_close: 'إغلاق التنبيه',
    }
  };

  // ─────────────────────────────────────────────
  // CASE STUDY DATA
  // ─────────────────────────────────────────────
  const caseStudies = {
    cabin: {
      en: {
        badge: 'CLINICAL WEB PLATFORM',
        title: 'Cabin Vita',
        overview: 'A fully responsive dental clinic web platform built to replace an outdated static page. Designed from scratch to modernize appointment booking and improve patient trust.',
        challenge: 'The clinic had zero digital booking — patients called by phone, creating staff overhead and appointment gaps. The brief required a mobile-first system any patient could use on any device.',
        solution: 'Vanilla JS + CSS Grid responsive architecture with an interactive calendar component for real-time slot selection. Zero external booking service dependency — all logic runs client-side for speed.',
        results: '100% mobile responsive. Interactive appointment flow. Deployed on Vercel for instant global CDN delivery.',
        url: 'https://cabin-vita.vercel.app/',
      },
      ar: {
        badge: 'منصة عيادة طبية',
        title: 'Cabin Vita',
        overview: 'منصة ويب متكاملة لعيادة أسنان مبنية من الصفر لتحديث نظام الحجز وتحسين ثقة المرضى عبر جميع الأجهزة.',
        challenge: 'العيادة لم يكن لديها حجز رقمي — كان المرضى يتصلون هاتفياً مما يرهق الموظفين ويترك فراغات في المواعيد. كانت الحاجة لنظام أولوية الهاتف يعمل على أي جهاز.',
        solution: 'هيكلية JavaScript خالص مع CSS Grid وعنصر تقويم تفاعلي لاختيار المواعيد بشكل فوري. لا اعتماد على خدمات خارجية — كل المنطق يعمل على جانب العميل للسرعة القصوى.',
        results: 'متجاوب 100% مع الهاتف. سير حجز تفاعلي. مُنشر على Vercel مع توصيل CDN فوري.',
        url: 'https://cabin-vita.vercel.app/',
      }
    },
    boutique: {
      en: {
        badge: 'WEB COMMERCE',
        title: 'Boutique E-Commerce',
        overview: 'A high-conversion web commerce platform engineered for a small fashion boutique. Automated order processing eliminates manual work between cart checkout and fulfillment.',
        challenge: 'The client processed every order manually via WhatsApp — slow, error-prone, and unscalable. Needed a zero-latency pipeline from cart to confirmation without a full e-commerce platform cost.',
        solution: 'Custom cart engine + Google Apps Script Webhook that fires on checkout, logging orders to Google Sheets and sending instant email confirmations — fully automated, zero recurring cost.',
        results: 'Zero-latency order dispatch. Instant ledger sync via Google Sheets. Fully serverless — no monthly platform fee.',
        url: 'https://boutique1-phi.vercel.app/',
      },
      ar: {
        badge: 'تجارة إلكترونية',
        title: 'Boutique E-Commerce',
        overview: 'منصة تجارة إلكترونية عالية التحويل لبوتيك أزياء. معالجة الطلبات مؤتمتة بالكامل من السلة حتى التأكيد.',
        challenge: 'كانت العميلة تعالج كل طلب يدوياً عبر واتساب — بطيء وعرضة للأخطاء وغير قابل للتوسع. كانت الحاجة لخط بدون زمن تأخير من السلة إلى التأكيد دون تكلفة منصة تجارية كاملة.',
        solution: 'محرك سلة مخصص + Webhook عبر Google Apps Script يُفعَّل عند الدفع، يسجل الطلبات في Google Sheets ويرسل تأكيدات بريدية فورية — مؤتمت بالكامل وبدون تكلفة شهرية.',
        results: 'توجيه فوري للطلبات. مزامنة آنية عبر Google Sheets. بدون خوادم — صفر تكاليف شهرية.',
        url: 'https://boutique1-phi.vercel.app/',
      }
    },
    maison: {
      en: {
        badge: '3D WEBGL EXPERIENCE',
        title: 'Maison Dorée',
        overview: 'A luxury interactive digital experience for a French haute pâtisserie brand — blending procedural 3D rendering with kinetic editorial typography.',
        challenge: 'Standard web pages couldn\'t communicate the brand\'s artisanal luxury positioning. Needed an immersive experience that would convert browsers into buyers on first impression.',
        solution: 'Three.js procedural 3D pastry geometry with custom PBR materials + GSAP ScrollTrigger kinetic typography. Optimized render loop with IntersectionObserver pause to protect battery life.',
        results: '60 FPS sustained on desktop. Interactive 360° product inspection. GPU render loop paused off-screen.',
        url: 'https://maison-doree-three.vercel.app/',
      },
      ar: {
        badge: 'تجربة WebGL ثلاثية الأبعاد',
        title: 'Maison Dorée',
        overview: 'تجربة رقمية تفاعلية فاخرة لعلامة حلويات فرنسية راقية — تجمع بين العرض ثلاثي الأبعاد والطباعة الحركية التحريرية.',
        challenge: 'صفحات الويب التقليدية لم تكن قادرة على إيصال مكانة العلامة الحرفية الفاخرة. كانت الحاجة لتجربة غامرة تحول الزوار إلى مشترين من الانطباع الأول.',
        solution: 'هندسة ثلاثية الأبعاد إجرائية بـ Three.js مع مواد PBR مخصصة + طباعة حركية بـ GSAP ScrollTrigger. حلقة عرض مُحسَّنة مع إيقاف تلقائي خارج الشاشة لحماية البطارية.',
        results: '60 إطاراً مستدامة على سطح المكتب. فحص منتج 360° تفاعلي. إيقاف GPU عند الخروج من الشاشة.',
        url: 'https://maison-doree-three.vercel.app/',
      }
    }
  };

  // ─────────────────────────────────────────────
  // APPLY TRANSLATION — safe textContent & attributes
  // ─────────────────────────────────────────────
  function applyLang(lang) {
    const dict = i18n[lang];
    if (!dict) return;

    // Update <html> attributes
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // Translate input & textarea placeholders [data-placeholder-i18n]
    document.querySelectorAll('[data-placeholder-i18n]').forEach(el => {
      const key = el.getAttribute('data-placeholder-i18n');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Translate accessibility aria-labels [data-aria-i18n]
    document.querySelectorAll('[data-aria-i18n]').forEach(el => {
      const key = el.getAttribute('data-aria-i18n');
      if (dict[key] !== undefined) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    // Hero title lines — update each line-inner span separately
    const line1 = document.querySelector('.line-1');
    const line2 = document.querySelector('.line-2');
    const line3Plain = document.querySelector('.line-3-plain');
    const line3Suffix = document.querySelector('.line-3-suffix');

    if (line1) line1.textContent = dict.hero_line1 || '';
    if (line2) line2.textContent = dict.hero_line2 || '';
    if (line3Plain) line3Plain.textContent = dict.hero_line3_plain || '';
    if (line3Suffix) line3Suffix.textContent = dict.hero_line3_suffix || '';

    // Page title and meta tags
    if (dict.page_title) document.title = dict.page_title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.meta_desc) metaDesc.setAttribute('content', dict.meta_desc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && dict.og_title) ogTitle.setAttribute('content', dict.og_title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && dict.og_desc) ogDesc.setAttribute('content', dict.og_desc);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle && dict.twitter_title) twTitle.setAttribute('content', dict.twitter_title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && dict.twitter_desc) twDesc.setAttribute('content', dict.twitter_desc);

    // lang-btn aria-pressed and active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isTarget = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
      btn.classList.toggle('active', isTarget);
    });

    // filter btn aria-pressed — keep active state
    document.querySelectorAll('.filter-btn, .stack-filter-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    });

    // Copy badge text
    const copyBadge = document.getElementById('copyBadge');
    if (copyBadge && copyBadge.textContent !== dict.copy_done) {
      copyBadge.textContent = dict.copy_label || 'Copy';
    }

    // Submit button label
    const submitLabel = document.querySelector('#formSubmitBtn .btn-label');
    if (submitLabel && dict.btn_send_request) submitLabel.textContent = dict.btn_send_request;

    // Persist preference
    try { localStorage.setItem('jc_lang', lang); } catch (_) {}

    const gsapObj = window.gsap || (typeof gsap !== 'undefined' ? gsap : null);
    if (gsapObj && !prefersReduced) {
      gsapObj.fromTo('main', { opacity: 0.88 }, { opacity: 1, duration: 0.3, ease: 'power2.out', clearProps: 'opacity' });
    }

    // Refresh ScrollTrigger layout after font/direction switch
    if (typeof ScrollTrigger !== 'undefined') {
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }
  }


  // ─────────────────────────────────────────────
  // DOMContentLoaded — wire everything
  // ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {

    // ── 1. LANGUAGE INIT ─────────────────────────
    let currentLang = 'en';
    try {
      const stored = localStorage.getItem('jc_lang');
      if (stored && i18n[stored]) currentLang = stored;
    } catch (_) {}
    applyLang(currentLang);


    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === currentLang) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        currentLang = lang;
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyLang(lang);
      });
    });

    // ── 2. MOBILE DRAWER ──────────────────────────
    try {
      const hamburgerBtn = document.getElementById('hamburgerBtn');
      const drawer       = document.getElementById('mobileDrawer');
      const backdrop     = document.getElementById('drawerBackdrop');
      const closeBtn     = document.getElementById('drawerClose');
      let lastFocused    = null;

      function openDrawer() {
        if (!drawer || !backdrop || !hamburgerBtn) return;
        lastFocused = document.activeElement;
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        backdrop.classList.add('active');
        hamburgerBtn.classList.add('open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // Focus first focusable element inside drawer
        const first = drawer.querySelector('button, a, [tabindex]');
        if (first) setTimeout(() => first.focus(), 50);
      }

      function closeDrawer() {
        if (!drawer || !backdrop || !hamburgerBtn) return;
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        backdrop.classList.remove('active');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (lastFocused) setTimeout(() => lastFocused.focus(), 50);
      }

      // Focus trap inside drawer
      drawer && drawer.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeDrawer(); return; }
        if (e.key !== 'Tab') return;
        const focusable = [...drawer.querySelectorAll('button:not([disabled]), a[href], input, textarea, [tabindex]:not([tabindex="-1"])')];
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });

      if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
      if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
      if (backdrop) backdrop.addEventListener('click', closeDrawer);

      document.querySelectorAll('.drawer-link, .drawer-footer a').forEach(link => {
        link.addEventListener('click', () => closeDrawer());
      });

      // Swipe to close
      let txStart = 0;
      drawer && drawer.addEventListener('touchstart', e => { txStart = e.changedTouches[0].screenX; }, { passive: true });
      drawer && drawer.addEventListener('touchend', e => {
        const txEnd = e.changedTouches[0].screenX;
        const isRtl = document.documentElement.dir === 'rtl';
        if (!isRtl && txEnd - txStart > 45) closeDrawer();
        if (isRtl && txStart - txEnd > 45) closeDrawer();
      }, { passive: true });

    } catch (err) { console.warn('Drawer:', err); }

    // ── 3. GLOBAL OBJECT VERIFICATION & LENIS SMOOTH SCROLL ────
    let lenis = null;
    try {
      const gsapObj = window.gsap || (typeof gsap !== 'undefined' ? gsap : null);
      const stObj   = window.ScrollTrigger || (typeof ScrollTrigger !== 'undefined' ? ScrollTrigger : null);
      const stpObj  = window.ScrollToPlugin || (typeof ScrollToPlugin !== 'undefined' ? ScrollToPlugin : null);
      const LenisClass = window.Lenis || (typeof Lenis !== 'undefined' ? Lenis : null);

      if (gsapObj) window.gsap = gsapObj;
      if (stObj) window.ScrollTrigger = stObj;
      if (stpObj) window.ScrollToPlugin = stpObj;
      if (LenisClass) window.Lenis = LenisClass;

      if (gsapObj && stObj) {
        if (stpObj) gsapObj.registerPlugin(stObj, stpObj);
        else gsapObj.registerPlugin(stObj);
      }

      if (!prefersReduced && LenisClass) {
        lenis = new LenisClass({
          duration: 1.2,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.5,
        });

        if (stObj) {
          lenis.on('scroll', stObj.update);
        }

        if (gsapObj && gsapObj.ticker && gsapObj.ticker.add) {
          gsapObj.ticker.add(time => lenis.raf(time * 1000));
          if (gsapObj.ticker.lagSmoothing) gsapObj.ticker.lagSmoothing(0);
        } else {
          function raf(time) {
            lenis.raf(time);
            const reqFn = (typeof requestAnimationFrame !== 'undefined') ? requestAnimationFrame : (typeof window !== 'undefined' ? window.requestAnimationFrame : null);
            if (reqFn) reqFn(raf);
          }
          const reqFn = (typeof requestAnimationFrame !== 'undefined') ? requestAnimationFrame : (typeof window !== 'undefined' ? window.requestAnimationFrame : null);
          if (reqFn) reqFn(raf);
        }

        window.lenis = lenis;
        document.documentElement.classList.add('has-lenis');
      }
    } catch (err) { console.warn('[VIBE.STUDIO] Smooth scroll init:', err); }

    // ── 4. HERO ENTRANCE ANIMATION ────────────────
    try {
      const gsapObj = window.gsap || (typeof gsap !== 'undefined' ? gsap : null);
      if (gsapObj && !prefersReduced) {
        const introTl = gsapObj.timeline({ defaults: { ease: 'power4.out' } });
        introTl
          .fromTo('.header', { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
          .fromTo('.hero-badge', { y: 18, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6 }, '-=0.45')
          .fromTo('.line-1', { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.0, ease: 'power4.out' }, '-=0.35')
          .fromTo('.line-2', { y: '110%', x: -12, opacity: 0 }, { y: '0%', x: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, '-=0.8')
          .fromTo('.line-3', { y: '115%', scale: 0.94, opacity: 0 }, { y: '0%', scale: 1, opacity: 1, duration: 1.1, ease: 'back.out(1.3)' }, '-=0.8')
          .fromTo('.hero-subtitle', { y: 20, opacity: 0, filter: 'blur(4px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 }, '-=0.65')
          .fromTo('.hero-actions .btn', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.55')
          .fromTo('.hero-avail', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3')
          .fromTo('.hero-window', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }, '-=0.7');
      }
    } catch (err) { console.warn('[VIBE.STUDIO] Intro anim error:', err); }

    // ── 5. SCROLL REVEALS ─────────────────────────
    try {
      const gsapObj = window.gsap || (typeof gsap !== 'undefined' ? gsap : null);
      const stObj   = window.ScrollTrigger || (typeof ScrollTrigger !== 'undefined' ? ScrollTrigger : null);

      if (gsapObj && stObj && !prefersReduced && !isMobile) {
        gsapObj.utils.toArray('.section-header').forEach(h => {
          gsapObj.fromTo(h,
            { y: 28, opacity: 0 },
            { scrollTrigger: { trigger: h, start: 'top 88%', once: true }, y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'opacity,transform' }
          );
        });

        gsapObj.utils.toArray('.service-card').forEach((card, i) => {
          gsapObj.fromTo(card,
            { y: 24, opacity: 0 },
            { scrollTrigger: { trigger: card, start: 'top 90%', once: true }, y: 0, opacity: 1, duration: 0.6, delay: i * 0.05, ease: 'power3.out', clearProps: 'opacity,transform' }
          );
        });

        stObj.batch('.project-card', {
          start: 'top 88%', once: true,
          onEnter: batch => gsapObj.fromTo(batch,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', clearProps: 'opacity,transform' }
          )
        });

        stObj.batch('.tech-card', {
          start: 'top 88%', once: true,
          onEnter: batch => gsapObj.fromTo(batch,
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out', clearProps: 'opacity,transform' }
          )
        });
      }
    } catch (err) { console.warn('[VIBE.STUDIO] Scroll reveals error:', err); }

    // ── 6. THREE.JS CLOUD ENGINE ──────────────────
    // Load Three.js lazily — only after hero text is painted
    const fallback = document.getElementById('webglFallback');
    const container = document.getElementById('cloudCanvasContainer');

    function initThreeJS() {
      if (!container) return;
      if (skipWebGL) {
        if (fallback) fallback.classList.remove('hidden');
        return;
      }

      if (typeof window.THREE !== 'undefined' || typeof THREE !== 'undefined') {
        startThreeScene();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
      script.onload = () => {
        if (typeof THREE !== 'undefined') window.THREE = THREE;
        startThreeScene();
      };
      script.onerror = (err) => {
        console.warn('[VIBE.STUDIO] Three.js load failed, showing fallback:', err);
        if (fallback) fallback.classList.remove('hidden');
      };
      (document.head || document.documentElement).appendChild(script);

      function startThreeScene() {
        try {
          const ThreeLib = window.THREE || (typeof THREE !== 'undefined' ? THREE : null);
          if (!ThreeLib) {
            if (fallback) fallback.classList.remove('hidden');
            return;
          }

          if (fallback) fallback.classList.add('hidden');

          const w = container.clientWidth || 340;
          const h = container.clientHeight || 210;

          const scene    = new ThreeLib.Scene();
          const initialZ = (window.innerWidth <= 768) ? 4.7 : 5.4;
          const camera   = new ThreeLib.PerspectiveCamera(42, w / h, 0.1, 1000);
          camera.position.set(0, 0.15, initialZ);

          const renderer = new ThreeLib.WebGLRenderer({ antialias: false, alpha: true });
          renderer.setSize(w, h, false);
          const maxPixelRatio = (qualityTier === 'high') ? Math.min(window.devicePixelRatio || 1, 1.5) : 1.0;
          renderer.setPixelRatio(maxPixelRatio);
          renderer.setClearColor(0x000000, 0);
          container.appendChild(renderer.domElement);

          // Lighting — tuned for cloud depth and mobile contrast
          scene.add(new ThreeLib.AmbientLight(0x7DD3FC, 1.3));
          const sun = new ThreeLib.DirectionalLight(0xFFFFFF, 3.6);
          sun.position.set(5, 8, 6);
          scene.add(sun);
          const fill = new ThreeLib.DirectionalLight(0x0284C7, 1.5);
          fill.position.set(-4, -2, 3);
          scene.add(fill);
          const rim = new ThreeLib.DirectionalLight(0x38BDF8, 1.1);
          rim.position.set(-3, -5, -3);
          scene.add(rim);

          // Cloud geometry
          const cloudGroup = new ThreeLib.Group();
          const mat = new ThreeLib.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 0.65,
            metalness: 0.0,
            flatShading: true
          });
          const puffs = [
            { x: 0,    y: 0,     z: 0,    r: 1.1  },
            { x: -0.9, y: -0.2,  z: 0.1,  r: 0.82 },
            { x: 0.9,  y: -0.15, z: 0.2,  r: 0.82 },
            { x: -1.55,y: -0.35, z: -0.1, r: 0.62 },
            { x: 1.55, y: -0.3,  z: -0.1, r: 0.62 },
            { x: -0.4, y: 0.62,  z: -0.1, r: 0.75 },
            { x: 0.45, y: 0.58,  z: 0.1,  r: 0.72 },
            { x: 0.2,  y: -0.35, z: 0.4,  r: 0.65 },
          ];
          puffs.forEach(p => {
            const mesh = new ThreeLib.Mesh(new ThreeLib.DodecahedronGeometry(p.r, 1), mat);
            mesh.position.set(p.x, p.y, p.z);
            cloudGroup.add(mesh);
          });
          scene.add(cloudGroup);

          // Mouse parallax
          let targetRotX = 0, targetRotY = 0;
          container.addEventListener('mousemove', e => {
            const rect = container.getBoundingClientRect();
            const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const my = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            targetRotY = mx * 0.4;
            targetRotX = -my * 0.25;
          }, { passive: true });

          // Pause off-screen & when tab hidden
          let visible = true;
          if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, { threshold: 0.05 });
            obs.observe(container);
          }
          document.addEventListener('visibilitychange', () => { visible = !document.hidden; });

          const clock = new ThreeLib.Clock();
          function loop() {
            requestAnimationFrame(loop);
            if (!visible) return;
            const t = clock.getElapsedTime();
            cloudGroup.position.y = Math.sin(t * 0.75) * 0.11;
            cloudGroup.scale.setScalar(1 + Math.sin(t * 0.45) * 0.022);
            cloudGroup.rotation.y += (targetRotY - cloudGroup.rotation.y) * 0.04;
            cloudGroup.rotation.x += (targetRotX - cloudGroup.rotation.x) * 0.04;
            renderer.render(scene, camera);
          }
          loop();

          const updateCanvasDimensions = (width, height) => {
            const nw = width || container.clientWidth || 340;
            const nh = height || container.clientHeight || 210;
            if (nw <= 0 || nh <= 0) return;
            camera.aspect = nw / nh;
            camera.position.z = (nw <= 480) ? 4.7 : 5.4;
            camera.updateProjectionMatrix();
            renderer.setSize(nw, nh, false);
          };

          if ('ResizeObserver' in window) {
            const canvasObserver = new ResizeObserver(entries => {
              for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 0 && height > 0) {
                  updateCanvasDimensions(width, height);
                }
              }
            });
            canvasObserver.observe(container);
          } else {
            window.addEventListener('resize', () => updateCanvasDimensions(), { passive: true });
          }

        } catch (err) {
          console.warn('[VIBE.STUDIO] Three.js runtime error, fallback active:', err);
          if (fallback) fallback.classList.remove('hidden');
        }
      }
    }

    // Defer Three.js non-critical initialization via requestIdleCallback
    const scheduleIdle = window.requestIdleCallback || (cb => setTimeout(cb, 350));
    scheduleIdle(initThreeJS);

    // ── 7. PROJECT & STACK FILTERS WITH GSAP MOTION ───────────────
    try {
      const gsapObj   = window.gsap || (typeof gsap !== 'undefined' ? gsap : null);
      const stObj     = window.ScrollTrigger || (typeof ScrollTrigger !== 'undefined' ? ScrollTrigger : null);
      const projBtns  = document.querySelectorAll('.filter-btn');
      const projCards = document.querySelectorAll('.project-card');

      projBtns.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          if (btn.classList.contains('active')) return;

          projBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');

          if (gsapObj && !prefersReduced) {
            gsapObj.fromTo(btn, { scale: 0.93 }, { scale: 1, duration: 0.35, ease: 'back.out(1.8)' });
          }

          const filter = btn.getAttribute('data-filter');
          const matching = [];
          const nonMatching = [];

          projCards.forEach(card => {
            const isMatch = filter === 'all' || card.getAttribute('data-category') === filter;
            if (isMatch) matching.push(card);
            else nonMatching.push(card);
          });

          if (gsapObj && !prefersReduced) {
            nonMatching.forEach(card => {
              if (card.style.display !== 'none') {
                gsapObj.to(card, {
                  opacity: 0,
                  scale: 0.94,
                  y: 10,
                  duration: 0.2,
                  ease: 'power2.in',
                  onComplete: () => { card.style.display = 'none'; }
                });
              }
            });

            matching.forEach((card, idx) => {
              card.style.display = 'flex';
              gsapObj.fromTo(card,
                { opacity: 0, scale: 0.94, y: 16 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.4,
                  delay: idx * 0.06,
                  ease: 'power3.out',
                  clearProps: 'opacity,transform'
                }
              );
            });
          } else {
            nonMatching.forEach(card => { card.style.display = 'none'; });
            matching.forEach(card => { card.style.display = 'flex'; });
          }

          if (stObj) setTimeout(() => stObj.refresh(), 300);
        });
      });

      const stackBtns  = document.querySelectorAll('.stack-filter-btn');
      const techCards  = document.querySelectorAll('.tech-card');

      stackBtns.forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          if (btn.classList.contains('active')) return;

          stackBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');

          if (gsapObj && !prefersReduced) {
            gsapObj.fromTo(btn, { scale: 0.93 }, { scale: 1, duration: 0.35, ease: 'back.out(1.8)' });
          }

          const domain = btn.getAttribute('data-domain');
          const matching = [];
          const nonMatching = [];

          techCards.forEach(card => {
            const isMatch = domain === 'all' || card.getAttribute('data-domain') === domain;
            if (isMatch) matching.push(card);
            else nonMatching.push(card);
          });

          if (gsapObj && !prefersReduced) {
            nonMatching.forEach(card => {
              if (card.style.display !== 'none') {
                gsapObj.to(card, {
                  opacity: 0,
                  scale: 0.94,
                  y: 10,
                  duration: 0.2,
                  ease: 'power2.in',
                  onComplete: () => { card.style.display = 'none'; }
                });
              }
            });

            matching.forEach((card, idx) => {
              card.style.display = 'flex';
              gsapObj.fromTo(card,
                { opacity: 0, scale: 0.94, y: 16 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.4,
                  delay: idx * 0.05,
                  ease: 'power3.out',
                  clearProps: 'opacity,transform'
                }
              );
            });
          } else {
            nonMatching.forEach(card => { card.style.display = 'none'; });
            matching.forEach(card => { card.style.display = 'flex'; });
          }
        });
      });
    } catch (err) { console.warn('Filters:', err); }

    // ── 8. DESKTOP NAV INDICATOR ─────────────────
    try {
      const indicator = document.getElementById('navIndicator');

      function updateIndicator(link) {
        if (!indicator || !link) return;
        const gsapObj = window.gsap || (typeof gsap !== 'undefined' ? gsap : null);
        if (gsapObj && gsapObj.to && !prefersReduced) {
          gsapObj.to(indicator, {
            left: link.offsetLeft,
            width: link.offsetWidth,
            duration: 0.35,
            ease: 'power3.out'
          });
        } else {
          indicator.style.width  = link.offsetWidth  + 'px';
          indicator.style.left   = link.offsetLeft   + 'px';
        }
      }

      // Init on first render
      const initActive = document.querySelector('.nav-dock .nav-item.active');
      if (initActive) setTimeout(() => updateIndicator(initActive), 200);

      // ScrollSpy — highlight nav item based on scroll position
      const sections = ['overview', 'services', 'platforms', 'connect'];
      const navItems = document.querySelectorAll('.nav-dock .nav-item');

      function onScroll() {
        let currentId = 'overview';
        for (const id of sections) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= 90) currentId = id;
        }
        navItems.forEach(link => {
          const isActive = link.getAttribute('href') === '#' + currentId;
          link.classList.toggle('active', isActive);
          if (isActive) updateIndicator(link);
        });
      }
      window.addEventListener('scroll', onScroll, { passive: true });

      // Click to scroll
      document.querySelectorAll('.nav-dock .nav-item, .drawer-link, a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
          const href = link.getAttribute('href');
          if (!href || !href.startsWith('#') || href === '#') return;
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          const activeLenis = window.lenis || lenis;
          if (activeLenis) {
            activeLenis.scrollTo(target, { offset: -72, duration: 1.2 });
          } else {
            const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        });
      });
    } catch (err) { console.warn('Nav indicator:', err); }

    // ── 9. CASE STUDY DRAWER ─────────────────────
    try {
      const csDrawer   = document.getElementById('csDrawer');
      const csBackdrop = document.getElementById('csBackdrop');
      const csClose    = document.getElementById('csClose');
      const csBody     = document.getElementById('csDrawerBody');
      let csLastFocus  = null;

      function openCS(projectKey) {
        if (!csDrawer || !csBackdrop || !csBody) return;
        const lang   = document.documentElement.getAttribute('lang') || 'en';
        const data   = caseStudies[projectKey];
        if (!data) return;
        const d = data[lang] || data.en;
        const dict = i18n[lang] || i18n.en;

        // Build content safely — no innerHTML with untrusted input
        csBody.textContent = ''; // clear

        const meta = document.createElement('div');
        meta.className = 'cs-meta ltr-force';
        meta.textContent = d.badge;
        csBody.appendChild(meta);

        const title = document.createElement('h2');
        title.className = 'cs-title ltr-force';
        title.id = 'csDrawerTitle';
        title.textContent = d.title;
        csBody.appendChild(title);

        // Screenshot placeholder
        const img = document.createElement('div');
        img.className = 'cs-placeholder ltr-force';
        img.textContent = d.title + ' — Preview';
        csBody.appendChild(img);

        const sections = [
          { label: dict.cs_overview,   text: d.overview  },
          { label: dict.cs_challenge,  text: d.challenge },
          { label: dict.cs_solution,   text: d.solution  },
          { label: dict.cs_results,    text: d.results   },
        ];

        sections.forEach(s => {
          const sec = document.createElement('div');
          sec.className = 'cs-section';
          const h4 = document.createElement('h4');
          h4.textContent = s.label;
          const p = document.createElement('p');
          p.textContent = s.text;
          sec.appendChild(h4);
          sec.appendChild(p);
          csBody.appendChild(sec);
        });

        // Live link
        const linkWrap = document.createElement('div');
        linkWrap.className = 'cs-live-btn';
        const liveA = document.createElement('a');
        liveA.href = d.url;
        liveA.target = '_blank';
        liveA.rel = 'noopener noreferrer';
        liveA.className = 'btn btn-primary';
        liveA.textContent = dict.cs_live;
        linkWrap.appendChild(liveA);
        csBody.appendChild(linkWrap);

        csLastFocus = document.activeElement;
        csDrawer.classList.add('open');
        csDrawer.setAttribute('aria-hidden', 'false');
        csBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => csClose && csClose.focus(), 60);
      }

      function closeCS() {
        if (!csDrawer || !csBackdrop) return;
        csDrawer.classList.remove('open');
        csDrawer.setAttribute('aria-hidden', 'true');
        csBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        if (csLastFocus) setTimeout(() => csLastFocus.focus(), 50);
      }

      // Focus trap
      csDrawer && csDrawer.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeCS(); return; }
        if (e.key !== 'Tab') return;
        const focusable = [...csDrawer.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')];
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });

      if (csClose) csClose.addEventListener('click', closeCS);
      if (csBackdrop) csBackdrop.addEventListener('click', closeCS);

      document.querySelectorAll('.btn-case-study').forEach(btn => {
        btn.addEventListener('click', () => {
          const project = btn.getAttribute('data-project');
          openCS(project);
        });
      });
    } catch (err) { console.warn('Case study drawer:', err); }

    // ── 10. CONTACT FORM ──────────────────────────
    try {
      const form       = document.getElementById('connectForm');
      const submitBtn  = document.getElementById('formSubmitBtn');
      const statusBox  = document.getElementById('formStatus');
      const announcer  = document.getElementById('formStatusAnnouncer');

      function getLang() { return document.documentElement.getAttribute('lang') || 'en'; }
      function dict(key) { return (i18n[getLang()] || i18n.en)[key] || ''; }

      function setFieldError(inputId, errId, msg) {
        const el = document.getElementById(errId);
        const input = document.getElementById(inputId);
        if (el) el.textContent = msg;
        if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      }

      function clearErrors() {
        ['fieldNameError','fieldEmailError','fieldMessageError','privacyError'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.textContent = '';
        });
        ['fieldName','fieldEmail','fieldMessage','privacyCheck'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.removeAttribute('aria-invalid');
        });
      }

      function validateForm(formEl) {
        let valid = true;
        clearErrors();
        const nameVal = (formEl.querySelector('#fieldName')?.value || '').trim();
        const emailVal = (formEl.querySelector('#fieldEmail')?.value || '').trim();
        const msgVal = (formEl.querySelector('#fieldMessage')?.value || '').trim();
        const consentVal = formEl.querySelector('#privacyCheck')?.checked || false;

        if (!nameVal) { setFieldError('fieldName','fieldNameError', dict('err_name_req')); valid = false; }
        if (!emailVal.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { setFieldError('fieldEmail','fieldEmailError', dict('err_email_req')); valid = false; }
        if (!msgVal || msgVal.length < 10) { setFieldError('fieldMessage','fieldMessageError', dict('err_message_req')); valid = false; }
        if (!consentVal) { setFieldError('privacyCheck','privacyError', dict('err_privacy_req')); valid = false; }
        return valid;
      }

      form && form.addEventListener('submit', async e => {
        e.preventDefault();

        // ── Honeypot: Web3Forms botcheck checkbox must be UNCHECKED
        const botcheck = form.querySelector('input[name="botcheck"]');
        if (botcheck && botcheck.checked) return; // bot — silent drop

        // ── Validate form fields
        if (!validateForm(form)) {
          const first = form.querySelector('[aria-invalid="true"]');
          if (first) first.focus();
          return;
        }

        // ── Loading state
        const btnLabel   = submitBtn?.querySelector('.btn-label');
        const btnSpinner = submitBtn?.querySelector('.btn-spinner');
        if (submitBtn)  submitBtn.disabled = true;
        if (btnLabel)   btnLabel.textContent = dict('form_sending') || 'Sending...';
        if (btnSpinner) btnSpinner.hidden = false;
        hideStatus();

        try {
          // Construct FormData from the form element directly
          const formData = new FormData(form);

          // Append / Ensure Web3Forms parameters
          formData.set('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY');
          formData.set('subject', 'New Project Inquiry — VIBE.STUDIO');
          formData.set('_subject', 'New Project Inquiry — VIBE.STUDIO');

          const visitorEmail = (formData.get('email') || '').toString().trim();
          if (visitorEmail) {
            formData.set('_replyto', visitorEmail);
          }

          // Submit to Web3Forms endpoint without setting Content-Type manually
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
          });

          const data = await res.json().catch(() => ({}));

          // Treat request as successful only when res.ok is true and data.success is true
          if (!res.ok || !data.success) {
            const apiMsg = data.message || `API error (Status ${res.status})`;
            throw new Error(apiMsg);
          }

          // Show success message only after confirmed success
          sessionStorage.setItem('jc_last_form', Date.now().toString());
          showStatus('success', dict('form_success') || 'Message sent successfully!');
          if (announcer) announcer.textContent = dict('form_success') || 'Message sent successfully!';
          form.reset();
          clearErrors();

        } catch (err) {
          // Display exact API error message on failure + retain mailto fallback link
          const nameVal = (form.querySelector('#fieldName')?.value || '').trim();
          const msgVal  = (form.querySelector('#fieldMessage')?.value || '').trim();
          const mailto  = 'mailto:hello@yourstudio.com'
                        + '?subject=' + encodeURIComponent('Project Inquiry — VIBE.STUDIO')
                        + '&body=' + encodeURIComponent(`Name: ${nameVal}\n\n${msgVal}`);

          if (statusBox) {
            statusBox.hidden = false;
            statusBox.className = 'form-status error';
            statusBox.textContent = '';

            const p = document.createElement('p');
            p.textContent = (dict('form_error') || 'Error submitting form:') + ' ' + err.message;
            statusBox.appendChild(p);

            const fallback = document.createElement('a');
            fallback.href = mailto;
            fallback.className = 'form-mailto-fallback';
            fallback.style.marginTop = '8px';
            fallback.style.display = 'inline-block';
            fallback.textContent = '✉ Email directly: hello@yourstudio.com';
            statusBox.appendChild(fallback);
          }
          if (announcer) announcer.textContent = err.message;

        } finally {
          if (submitBtn)  submitBtn.disabled = false;
          if (btnLabel)   btnLabel.textContent = dict('btn_send_request') || 'Send Request →';
          if (btnSpinner) btnSpinner.hidden = true;
        }
      });

      // ── Status helpers ──────────────────────────────────────────────
      function showStatus(type, msg) {
        if (!statusBox) return;
        statusBox.hidden = false;
        statusBox.className = 'form-status ' + type;
        statusBox.textContent = msg;
      }
      function hideStatus() {
        if (!statusBox) return;
        statusBox.hidden = true;
        statusBox.className = 'form-status';
        statusBox.textContent = '';
      }

    } catch (err) { console.warn('Form:', err); }


    // ── 11. COPY EMAIL ────────────────────────────
    try {
      const copyBtn  = document.getElementById('copyEmailBtn');
      const copyBadge = document.getElementById('copyBadge');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const lang = document.documentElement.getAttribute('lang') || 'en';
          const dict = i18n[lang] || i18n.en;
          navigator.clipboard.writeText('hello@yourstudio.com').then(() => {
            if (copyBadge) {
              copyBadge.textContent = dict.copy_done;
              copyBadge.style.background = '#10B981';
              setTimeout(() => {
                copyBadge.textContent = dict.copy_label;
                copyBadge.style.background = '';
              }, 2200);
            }
          }).catch(() => {});
        });
      }
    } catch (err) { console.warn('Copy:', err); }

    // ── 12. MOBILE FLOATING CTA BAR ───────────────
    try {
      const ctaBar = document.getElementById('mobileCTABar');
      if (ctaBar && isMobile) {
        ctaBar.removeAttribute('aria-hidden');
        const hero = document.getElementById('overview');
        const obs = new IntersectionObserver(entries => {
          ctaBar.classList.toggle('visible', !entries[0].isIntersecting);
          // Remove from tab order when hidden
          const anchor = ctaBar.querySelector('a');
          if (anchor) anchor.tabIndex = entries[0].isIntersecting ? -1 : 0;
        }, { threshold: 0.1 });
        if (hero) obs.observe(hero);
      }
    } catch (err) { console.warn('Mobile CTA Bar:', err); }

    // ── 13. DEVTOOLS DETERRENT OVERLAY (Visual deterrent only, safe & non-blocking) ──
    /* ================================================================
       SECURITY NOTICE: This frontend warning is ONLY a visual deterrent 
       for casual visitors. True security, authentication, and API access 
       controls are strictly enforced server-side.
       ================================================================ */
    try {
      const isLocalDev = ['localhost', '127.0.0.1'].includes(window.location.hostname) ||
                         window.location.hostname.startsWith('192.168.');
      const isAdmin    = !!localStorage.getItem('jc_admin_token') || !!sessionStorage.getItem('jc_admin');
      const hasWarned  = !!sessionStorage.getItem('jc_devtools_warned');

      if (!isLocalDev && !isAdmin && !hasWarned) {
        const modal    = document.getElementById('devtoolsModal');
        const backdrop = document.getElementById('devtoolsBackdrop');
        const closeBtn = document.getElementById('devtoolsClose');
        const okBtn    = document.getElementById('devtoolsOkBtn');

        function showDevToolsWarning() {
          if (!modal || !backdrop || sessionStorage.getItem('jc_devtools_warned')) return;
          sessionStorage.setItem('jc_devtools_warned', 'true');
          modal.classList.add('open');
          modal.setAttribute('aria-hidden', 'false');
          backdrop.classList.add('active');
          if (okBtn) setTimeout(() => okBtn.focus(), 60);
        }

        function closeDevToolsWarning() {
          if (!modal || !backdrop) return;
          modal.classList.remove('open');
          modal.setAttribute('aria-hidden', 'true');
          backdrop.classList.remove('active');
        }

        if (closeBtn) closeBtn.addEventListener('click', closeDevToolsWarning);
        if (okBtn) okBtn.addEventListener('click', closeDevToolsWarning);
        if (backdrop) backdrop.addEventListener('click', closeDevToolsWarning);

        modal && modal.addEventListener('keydown', e => {
          if (e.key === 'Escape') closeDevToolsWarning();
        });

        // Non-blocking heuristic check (outer vs inner window size delta when docked)
        function checkDevTools() {
          const wDiff = window.outerWidth - window.innerWidth > 160;
          const hDiff = window.outerHeight - window.innerHeight > 160;
          if (wDiff || hDiff) {
            showDevToolsWarning();
          }
        }

        window.addEventListener('resize', checkDevTools, { passive: true });
      }
    } catch (err) { console.warn('[VIBE.STUDIO] DevTools deterrent:', err); }

  }); // end DOMContentLoaded

})();
