// ─────────────────────────────────────────────────────────────────────────
//  DEMO CONFIGURATION
//
//  This is a demonstration website built by Limen Studios. It portrays a
//  fictional car dealership and is not a real business. Every value below is
//  invented and intentionally non-functional:
//
//   • The phone uses a clearly illustrative "555" style.
//   • The email uses the reserved `.example` TLD (RFC 2606) and cannot exist.
//   • All call / email / WhatsApp actions are disabled site-wide by <DemoGuard>.
// ─────────────────────────────────────────────────────────────────────────

export const DEMO = {
  studioName: 'Limen Studios',
  studioUrl: process.env.NEXT_PUBLIC_STUDIO_URL || 'https://www.limen-studios.com',

  brand: 'Limen Cars',
  tagline: 'Premium cars, Limassol',

  // Demo-safe, non-functional contact details (Cyprus format).
  phone: '+357 25 555 0123',
  whatsapp: '35725555012', // digits only; click-to-chat is disabled by DemoGuard
  email: 'hello@limencars.example',
  address: 'Limen Cars, Limassol, Cyprus',
  // Area-level map query — never a precise real forecourt.
  mapQuery: 'Limassol, Cyprus',

  disclaimer:
    'This is a fictional demonstration website created by Limen Studios. All vehicles, prices, photos, VINs, history notes, reviews and contact details are illustrative only and do not represent real cars for sale, real people, or a real, licensed dealership.',
} as const
