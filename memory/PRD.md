# Rutuja Dignity Doll — Phase 1 Campaign Microsite (PRD)

## Original Problem Statement
Build a premium, mobile-first Phase 1 campaign microsite for the Rutuja Dignity Doll — a culturally relatable facilitation tool that helps women and girls talk openly about menstruation, replacing silence and shame with understanding and dignity. Visitor journey: UNDERSTAND → FEEL → BELIEVE → ACT. Primary CTA: Request a Workshop. Secondary: Donate. Must be editorial, human, dignified, Rutuja-branded — not a generic NGO/ecommerce/medical template. No invented facts, testimonials, numbers, partners, or compliance claims — use clean labelled placeholders.

## User Choices (confirmed)
- Frontend-only (no backend storage for forms).
- Both EN and हिंदी fully working.
- Clean labelled placeholders for all unverified facts.
- Tasteful stock photography for community/workshop imagery.
- Official Rutuja logo uploaded and used as-is (no recolor/distortion).

## Architecture
- React 19 + react-router-dom 7, CRACO, Tailwind (custom Rutuja tokens), shadcn/ui.
- Motion: framer-motion (scroll reveals, masked hero line reveal, hero parallax) + lenis smooth scroll. Respects prefers-reduced-motion.
- Typography: Playfair Display (serif headings) + Manrope (sans body).
- i18n: `LanguageContext` + `data/content.js` (full EN/HI), persisted in localStorage.
- No backend used. Forms simulate submission client-side (loading → success). MONGO left untouched.

## Personas
- Donor, CSR/Corporate partner, School/NGO (workshop requester), Curious visitor.

## Implemented (2026-08-17)
- Homepage single-page story, 12 sections: Hero, Why This Matters, Meet the Dignity Doll, How It Works (6-step timeline + transformation flow), Stories From the Field (editorial alternating layouts + marquee), Impact (editorial metrics), Who It Is For (asymmetric grid), Workshop Experience, Ways to Support, Trust & Credibility, FAQ (accessible accordion), Final CTA.
- Routes/pages with frontend forms: /request-workshop, /partner, /contact (validation, error, loading, success states) and /donate (integration-ready placeholder, no fake checkout).
- Sticky header transparent→solid on scroll; EN|हिंदी switcher; mobile hamburger full-screen menu; mobile bottom CTA bar.
- SEO: title, meta description, canonical, Open Graph + Twitter, OG image (Doll). Generated dignified Doll photography; official Rutuja logo used.
- Accessibility: semantic headings, labels, focus states, aria on forms/accordion, reduced-motion support.
- Verified by testing agent: 100% frontend pass, zero console errors, no horizontal overflow at 390px.

## Content status
- VERIFIED & LIVE (2026-08-17): Impact — 20+ sessions, 700+ people reached, 6 states/UTs (Delhi, Odisha, Haryana, Uttarakhand, Maharashtra, Karnataka), shown conservatively. Field stories — 3 real reflections (Bengaluru, Dehradun, Rewari) with names withheld (publication permission not yet confirmed). Trust — registered under Mumbai Public Trust Act 1950; 80G, 12A, CSR-1, NITI Aayog DARPAN all confirmed (ID numbers pending).
- STILL PLACEHOLDER (pending verification): registration ID numbers; verified partner list & logos; ambassador count; dolls distributed; media/awards; patent/IP/design status; public contact details; donation mechanism.

## Backlog
- P0: Replace placeholders with verified content once approved; connect donation mechanism.
- P1: Wire forms to a backend/email (Resend) if lead capture is desired; real Doll & field photography.
- P2: Sitemap/robots, OG image refinement, count-up animation once numbers are verified.
