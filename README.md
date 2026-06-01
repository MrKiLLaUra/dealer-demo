# Limen Cars — dealership demo

A fictional car-dealership website built by **Limen Studios** as a portfolio
demo. Fully static, demo-safe and trilingual (EN / RU / EL).

## Stack
- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4
- No backend — all inventory lives in `lib/data.ts` (static, instant, never empty)

## Features
- Inventory grid with filters (make, body, fuel, transmission, condition, colour, price, year, mileage)
- Car detail pages — gallery + swipe lightbox, full specs, VIN/ref, history notes
- YouTube video walkaround per listing
- Comparison tool (up to 3 cars)
- Finance calculator (deposit + term + APR → monthly)
- Book-a-test-drive + per-listing enquiry (demo-safe — sends nothing)
- Trade-in / part-exchange and import / custom-order request forms
- Inventory-aware AI chat assistant (scripted, with lead capture)
- Sticky WhatsApp button + per-listing WhatsApp CTA
- QR code per listing (windscreen-printable)
- Featured / New arrival / Sold / Reserved badges + sold archive
- Save / favourites (localStorage, no account)
- Multi-language EN / RU / EL toggle (persisted)
- Google Maps area embed
- Auto-generated SEO metadata + `schema.org/Car` structured data per listing

## Demo safety
- Whole site is `noindex`; `robots.txt` disallows all crawlers
- `DemoGuard` disables every call / email / WhatsApp action site-wide
- Fictional everything — fake "DEMO…" VINs, `.example` email, 555-style phone
- Footer disclaimer, cookie notice and a full `/legal` page

## Develop
```bash
npm install
npm run dev
```
No env vars required. Optional: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_STUDIO_URL`.
