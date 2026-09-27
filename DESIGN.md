# Design System

<!-- impeccable:design-schema 1 -->

## Design Direction & World

- **Brand Identity**: **VIBE.STUDIO** (`// VIBE.CODE`)
- **Theme**: Luminous Studio White & Soft Silk
- **Vibe**: High-end editorial, crisp high-contrast minimalist, warm alabaster architectural aesthetic with a floating pill dock navigation and magnetic sliding indicator.
- **Surface Modes**:
  - Hero & Portfolio Showcase: Experience / Persuade
  - Case Study Drawer & Collaboration Hub: Operate / Persuade

## Color Tokens

- **Background Base**: `#FAFAF9` to `#FFFFFF` (Crisp Warm Alabaster)
- **Surface Base (Cards)**: `#FFFFFF`
- **Surface Hover**: `#F8FAFC`
- **Border Default**: `rgba(0, 0, 0, 0.08)`
- **Border Focus / Active**: `#0F172A`
- **Primary Accent (Noir Crisp Black)**: `#0F172A`
- **Secondary Accent (Rose Gold & Soft Blush)**: `#FDF2F4` / `#E11D48` / `#D97706` / `#0284C7` / `#38BDF8`
- **Text Primary (Deep Noir)**: `#0F172A`
- **Text Body (Slate Espresso)**: `#334155`
- **Text Muted (Subtle Slate)**: `#64748B`

## Navigation Pill Dock Specifications (`#navDock`)

- **Container**: Floating capsule `.nav-dock` (`border-radius: 9999px`, `background: rgba(15, 23, 42, 0.03)`, `backdrop-filter: blur(12px)`).
- **Magnetic Sliding Indicator**: `.nav-indicator` (`background: #0F172A`, `border-radius: 9999px`, `transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1)`).
- **Active State**: Text `#FFFFFF`, Monospace Number `.nav-num` highlighted in `#38BDF8`.

## Layout & Scroll Geometry

- **Nav Height**: `--nav-height: 72px`
- **Scroll Offset**: Lenis Smooth Scroll with `scroll-padding-top: 90px`
- **Z-Index System**:
  - Background 3D Canvas: `z-index: 1` (`pointer-events: none`)
  - Main Cards & Content: `z-index: 10`
  - Fixed Header: `z-index: 1000`
  - Modal Drawer & Mobile Overlay: `z-index: 2000`
