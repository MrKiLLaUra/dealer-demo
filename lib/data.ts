// ─────────────────────────────────────────────────────────────────────────
//  STATIC DEMO DATA
//
//  Replaces a live database. Everything here is FICTIONAL — no real cars,
//  prices, VINs, photos or history. VINs are deliberately fake ("DEMO…") so
//  they cannot match a real vehicle. See /legal. Static data means the demo
//  always loads instantly and can never appear empty in front of a client.
// ─────────────────────────────────────────────────────────────────────────

import type { Car, CarFilters, Locale, Localized } from './types'

const L = (en: string, ru: string, el: string): Localized => ({ en, ru, el })

// Reliable Unsplash car photos (exteriors / interiors — no identifiable people).
const IMG = [
  'photo-1503376780353-7e6692767b70',
  'photo-1555215695-3004980ad54e',
  'photo-1552519507-da3b142c6e3d',
  'photo-1606664515524-ed2f786a0bd6',
  'photo-1568605117036-5fe5e7bab0b7',
  'photo-1541899481282-d53bffe3c35d',
  'photo-1494976388531-d1058494cdd8',
  'photo-1605559424843-9e4c228bf1c2',
  'photo-1502877338535-766e1452684a',
  'photo-1549924231-f129b911e442',
  'photo-1614200179396-2bdb77ebf81b',
  'photo-1617469767053-d3b523a0b982',
]
const img = (i: number, w = 1200) =>
  `https://images.unsplash.com/${IMG[i % IMG.length]}?w=${w}&q=80&auto=format&fit=crop`
const gallery = (offset: number) => [img(offset), img(offset + 1), img(offset + 2), img(offset + 3)]

const NOW = Date.parse('2026-05-30T12:00:00Z')
const day = 24 * 60 * 60 * 1000

interface Seed {
  make: string
  model: string
  variant: string
  year: number
  price: number
  mileage: number
  fuel: Car['fuel']
  transmission: Car['transmission']
  body: Car['body']
  drivetrain: Car['drivetrain']
  color: string
  engine_l: number
  power_hp: number
  doors: number
  seats: number
  co2: number
  condition: Car['condition']
  status: Car['status']
  video_url?: string | null
  description: Localized
  history: Localized
  features: string[]
  is_featured?: boolean
  is_new_arrival?: boolean
}

const SEEDS: Seed[] = [
  {
    make: 'BMW', model: '3 Series', variant: '320i M Sport', year: 2023,
    price: 38900, mileage: 18400, fuel: 'petrol', transmission: 'automatic', body: 'sedan',
    drivetrain: 'rwd', color: 'Black Sapphire', engine_l: 2.0, power_hp: 184, doors: 4, seats: 5, co2: 142,
    condition: 'used', status: 'available',
    video_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    description: L(
      'A sharp, well-specced 320i in M Sport trim — one owner, full service history and a genuinely engaging drive.',
      'Чёткий, богато укомплектованный 320i в версии M Sport — один владелец, полная история обслуживания.',
      'Ένα κοφτερό 320i σε έκδοση M Sport — ένας ιδιοκτήτης, πλήρες ιστορικό σέρβις.'
    ),
    history: L('One owner · full service history · no accidents', 'Один владелец · полное ТО · без ДТП', 'Ένας ιδιοκτήτης · πλήρες σέρβις · χωρίς ατυχήματα'),
    features: ['M Sport package', 'Heated seats', 'Apple CarPlay', 'Parking sensors', 'LED headlights', 'Cruise control'],
    is_featured: true,
  },
  {
    make: 'Mercedes-Benz', model: 'GLC', variant: 'GLC 300 4MATIC', year: 2022,
    price: 47500, mileage: 29800, fuel: 'petrol', transmission: 'automatic', body: 'suv',
    drivetrain: 'awd', color: 'Selenite Grey', engine_l: 2.0, power_hp: 258, doors: 5, seats: 5, co2: 168,
    condition: 'used', status: 'available',
    description: L(
      'A refined GLC 300 with 4MATIC all-wheel drive, panoramic roof and the full Premium package.',
      'Утончённый GLC 300 с полным приводом 4MATIC, панорамной крышей и пакетом Premium.',
      'Ένα εκλεπτυσμένο GLC 300 με τετρακίνηση 4MATIC, πανοραμική οροφή και πλήρες πακέτο Premium.'
    ),
    history: L('Two owners · full service history', 'Два владельца · полная история ТО', 'Δύο ιδιοκτήτες · πλήρες ιστορικό σέρβις'),
    features: ['4MATIC AWD', 'Panoramic roof', 'Burmester sound', '360° camera', 'Ambient lighting', 'Keyless go'],
    is_featured: true,
  },
  {
    make: 'Tesla', model: 'Model 3', variant: 'Long Range AWD', year: 2024,
    price: 44900, mileage: 9200, fuel: 'electric', transmission: 'automatic', body: 'sedan',
    drivetrain: 'awd', color: 'Pearl White', engine_l: 0, power_hp: 498, doors: 4, seats: 5, co2: 0,
    condition: 'used', status: 'available',
    video_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    description: L(
      'Long Range dual-motor Model 3 with ~600 km range, Autopilot and near-new condition.',
      'Model 3 Long Range с двумя моторами, запас хода ~600 км, Autopilot, почти новый.',
      'Model 3 Long Range με δύο μοτέρ, αυτονομία ~600 χλμ, Autopilot, σχεδόν καινούργιο.'
    ),
    history: L('One owner · battery health 97%', 'Один владелец · здоровье батареи 97%', 'Ένας ιδιοκτήτης · υγεία μπαταρίας 97%'),
    features: ['Autopilot', 'Glass roof', '18" Aero wheels', 'Heat pump', 'Premium audio', 'Sentry mode'],
    is_featured: true, is_new_arrival: true,
  },
  {
    make: 'Toyota', model: 'Corolla', variant: '1.8 Hybrid', year: 2023,
    price: 26500, mileage: 22100, fuel: 'hybrid', transmission: 'automatic', body: 'hatchback',
    drivetrain: 'fwd', color: 'Scarlet Red', engine_l: 1.8, power_hp: 122, doors: 5, seats: 5, co2: 102,
    condition: 'used', status: 'available',
    description: L(
      'Frugal, dependable Corolla Hybrid — superb fuel economy and Toyota’s long warranty still active.',
      'Экономичная и надёжная Corolla Hybrid — отличный расход и действующая гарантия Toyota.',
      'Οικονομική και αξιόπιστη Corolla Hybrid — άριστη κατανάλωση και ενεργή εγγύηση Toyota.'
    ),
    history: L('One owner · service pack included', 'Один владелец · сервисный пакет включён', 'Ένας ιδιοκτήτης · πακέτο σέρβις'),
    features: ['Hybrid', 'Adaptive cruise', 'Lane assist', 'Reversing camera', 'Apple CarPlay'],
    is_new_arrival: true,
  },
  {
    make: 'Audi', model: 'A4 Avant', variant: '40 TDI quattro', year: 2021,
    price: 33900, mileage: 41500, fuel: 'diesel', transmission: 'automatic', body: 'estate',
    drivetrain: 'awd', color: 'Mythos Black', engine_l: 2.0, power_hp: 204, doors: 5, seats: 5, co2: 134,
    condition: 'used', status: 'available',
    description: L(
      'Practical, quattro-equipped A4 Avant with the efficient 40 TDI engine and Virtual Cockpit.',
      'Практичный A4 Avant с quattro, экономичным мотором 40 TDI и Virtual Cockpit.',
      'Πρακτικό A4 Avant με quattro, οικονομικό 40 TDI και Virtual Cockpit.'
    ),
    history: L('Two owners · cambelt done', 'Два владельца · ремень ГРМ заменён', 'Δύο ιδιοκτήτες · αλλαγή ιμάντα'),
    features: ['quattro AWD', 'Virtual Cockpit', 'Towbar', 'Heated seats', 'Matrix LED'],
  },
  {
    make: 'Volkswagen', model: 'Golf', variant: '1.5 TSI Life', year: 2022,
    price: 24200, mileage: 27600, fuel: 'petrol', transmission: 'manual', body: 'hatchback',
    drivetrain: 'fwd', color: 'Atlantic Blue', engine_l: 1.5, power_hp: 150, doors: 5, seats: 5, co2: 128,
    condition: 'used', status: 'reserved',
    description: L(
      'The all-rounder. A tidy Golf 1.5 TSI with the responsive manual gearbox — currently reserved.',
      'Универсальный выбор. Аккуратный Golf 1.5 TSI на механике — сейчас забронирован.',
      'Ο all-rounder. Ένα προσεγμένο Golf 1.5 TSI με χειροκίνητο — αυτή τη στιγμή κρατημένο.'
    ),
    history: L('Full service history', 'Полная история ТО', 'Πλήρες ιστορικό σέρβις'),
    features: ['Digital cockpit', 'Adaptive cruise', 'App-Connect', 'LED matrix'],
  },
  {
    make: 'Porsche', model: '911', variant: 'Carrera S', year: 2021,
    price: 132000, mileage: 16200, fuel: 'petrol', transmission: 'automatic', body: 'coupe',
    drivetrain: 'rwd', color: 'GT Silver', engine_l: 3.0, power_hp: 450, doors: 2, seats: 4, co2: 206,
    condition: 'used', status: 'available',
    video_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    description: L(
      'A 992-generation Carrera S in stunning condition — Sport Chrono, PASM and a full Porsche history.',
      '911 Carrera S поколения 992 в потрясающем состоянии — Sport Chrono, PASM, полная история Porsche.',
      'Ένα 911 Carrera S γενιάς 992 σε εξαιρετική κατάσταση — Sport Chrono, PASM, πλήρες ιστορικό Porsche.'
    ),
    history: L('Two owners · Porsche main-dealer history', 'Два владельца · история у дилера Porsche', 'Δύο ιδιοκτήτες · ιστορικό επίσημης Porsche'),
    features: ['Sport Chrono', 'PASM', 'Sports exhaust', 'BOSE sound', '20/21" wheels', 'Adaptive seats'],
    is_featured: true,
  },
  {
    make: 'Range Rover', model: 'Evoque', variant: 'P200 R-Dynamic', year: 2022,
    price: 41900, mileage: 24300, fuel: 'petrol', transmission: 'automatic', body: 'suv',
    drivetrain: 'awd', color: 'Fuji White', engine_l: 2.0, power_hp: 200, doors: 5, seats: 5, co2: 178,
    condition: 'used', status: 'available',
    description: L(
      'Stylish Evoque R-Dynamic with panoramic roof, Meridian sound and a smart, cosseting cabin.',
      'Стильный Evoque R-Dynamic с панорамной крышей, аудио Meridian и уютным салоном.',
      'Κομψό Evoque R-Dynamic με πανοραμική οροφή, ήχο Meridian και κομψό εσωτερικό.'
    ),
    history: L('One owner · full history', 'Один владелец · полная история', 'Ένας ιδιοκτήτης · πλήρες ιστορικό'),
    features: ['Panoramic roof', 'Meridian sound', 'Heated seats', 'Wireless charging', '20" wheels'],
  },
  {
    make: 'Hyundai', model: 'Tucson', variant: '1.6 T-GDi Hybrid', year: 2023,
    price: 31500, mileage: 15900, fuel: 'hybrid', transmission: 'automatic', body: 'suv',
    drivetrain: 'fwd', color: 'Phantom Black', engine_l: 1.6, power_hp: 230, doors: 5, seats: 5, co2: 125,
    condition: 'used', status: 'available',
    description: L(
      'Bold-looking Tucson Hybrid with a spacious cabin, big screens and the balance of the 5-year warranty.',
      'Эффектный Tucson Hybrid с просторным салоном, большими экранами и остатком 5-летней гарантии.',
      'Εντυπωσιακό Tucson Hybrid με ευρύχωρο εσωτερικό, μεγάλες οθόνες και υπόλοιπο 5ετούς εγγύησης.'
    ),
    history: L('One owner · balance of warranty', 'Один владелец · остаток гарантии', 'Ένας ιδιοκτήτης · υπόλοιπο εγγύησης'),
    features: ['Hybrid', 'Dual 10.25" screens', 'Heated steering', 'Blind-spot monitor', 'Wireless CarPlay'],
    is_new_arrival: true,
  },
  {
    make: 'Ford', model: 'Ranger', variant: 'Wildtrak 2.0 BiTurbo', year: 2021,
    price: 36900, mileage: 52000, fuel: 'diesel', transmission: 'automatic', body: 'pickup',
    drivetrain: 'awd', color: 'Sea Grey', engine_l: 2.0, power_hp: 213, doors: 4, seats: 5, co2: 220,
    condition: 'used', status: 'available',
    description: L(
      'Hard-working yet well-equipped Ranger Wildtrak — tow bar, load liner and full 4x4 capability.',
      'Работящий и хорошо укомплектованный Ranger Wildtrak — фаркоп, защита кузова, полноценный 4x4.',
      'Δουλευταράς αλλά καλά εξοπλισμένος Ranger Wildtrak — κοτσαδόρος, προστασία καρότσας, πλήρες 4x4.'
    ),
    history: L('Two owners · VAT qualifying', 'Два владельца · с НДС', 'Δύο ιδιοκτήτες · με ΦΠΑ'),
    features: ['Selectable 4x4', 'Tow bar', 'Load liner', 'Heated seats', 'Sat nav'],
  },
  {
    make: 'Volvo', model: 'XC40', variant: 'Recharge Twin', year: 2023,
    price: 42800, mileage: 12700, fuel: 'electric', transmission: 'automatic', body: 'suv',
    drivetrain: 'awd', color: 'Fjord Blue', engine_l: 0, power_hp: 408, doors: 5, seats: 5, co2: 0,
    condition: 'used', status: 'available',
    description: L(
      'Punchy XC40 Recharge Twin — all-electric, all-wheel drive, with Volvo’s safety suite throughout.',
      'Бодрый XC40 Recharge Twin — полностью электрический, полный привод, весь пакет безопасности Volvo.',
      'Δυναμικό XC40 Recharge Twin — πλήρως ηλεκτρικό, τετρακίνητο, με όλο το πακέτο ασφάλειας Volvo.'
    ),
    history: L('One owner · warranty to 2027', 'Один владелец · гарантия до 2027', 'Ένας ιδιοκτήτης · εγγύηση έως 2027'),
    features: ['Twin motor AWD', 'Pilot Assist', 'Harman Kardon', 'Heated seats', '360° camera'],
    is_new_arrival: true,
  },
  {
    make: 'Mazda', model: 'MX-5', variant: '2.0 Skyactiv-G Sport', year: 2020,
    price: 27900, mileage: 31200, fuel: 'petrol', transmission: 'manual', body: 'convertible',
    drivetrain: 'rwd', color: 'Soul Red', engine_l: 2.0, power_hp: 184, doors: 2, seats: 2, co2: 156,
    condition: 'used', status: 'available',
    description: L(
      'The purist’s choice — a 2.0 MX-5 with the slick six-speed manual and folding roof. Pure fun.',
      'Выбор пуриста — MX-5 2.0 с чёткой 6-ступенчатой механикой и складной крышей. Чистое удовольствие.',
      'Η επιλογή του purist — MX-5 2.0 με ακριβές 6άρι χειροκίνητο και πτυσσόμενη οροφή. Καθαρή διασκέδαση.'
    ),
    history: L('Two owners · full history', 'Два владельца · полная история', 'Δύο ιδιοκτήτες · πλήρες ιστορικό'),
    features: ['Folding roof', 'Bose sound', 'Heated seats', 'LSD', 'Apple CarPlay'],
  },
  {
    make: 'Kia', model: 'Sportage', variant: '1.6 CRDi GT-Line', year: 2024,
    price: 34900, mileage: 6400, fuel: 'diesel', transmission: 'automatic', body: 'suv',
    drivetrain: 'fwd', color: 'Cityscape Green', engine_l: 1.6, power_hp: 136, doors: 5, seats: 5, co2: 139,
    condition: 'demo', status: 'available',
    description: L(
      'Ex-demo GT-Line Sportage with delivery mileage only and the full 7-year Kia warranty from new.',
      'Демо GT-Line Sportage с минимальным пробегом и полной 7-летней гарантией Kia.',
      'Demo GT-Line Sportage με ελάχιστα χιλιόμετρα και πλήρη 7ετή εγγύηση Kia.'
    ),
    history: L('Ex-demo · 7-year warranty', 'Демо · гарантия 7 лет', 'Demo · εγγύηση 7 ετών'),
    features: ['GT-Line', 'Panoramic curved display', 'Heated/cooled seats', '360° camera', 'Harman Kardon'],
    is_featured: true, is_new_arrival: true,
  },
  {
    make: 'BMW', model: 'X5', variant: 'xDrive40d M Sport', year: 2020,
    price: 49900, mileage: 61000, fuel: 'diesel', transmission: 'automatic', body: 'suv',
    drivetrain: 'awd', color: 'Carbon Black', engine_l: 3.0, power_hp: 340, doors: 5, seats: 5, co2: 173,
    condition: 'used', status: 'sold',
    description: L(
      'A commanding X5 xDrive40d in M Sport spec — sold recently after strong interest.',
      'Внушительный X5 xDrive40d в версии M Sport — недавно продан после большого интереса.',
      'Ένα επιβλητικό X5 xDrive40d σε έκδοση M Sport — πουλήθηκε πρόσφατα μετά από μεγάλο ενδιαφέρον.'
    ),
    history: L('Three owners · full BMW history', 'Три владельца · полная история BMW', 'Τρεις ιδιοκτήτες · πλήρες ιστορικό BMW'),
    features: ['xDrive AWD', 'Air suspension', 'Panoramic roof', 'Harman Kardon', '7 seats option'],
  },
  {
    make: 'Nissan', model: 'Qashqai', variant: '1.3 DiG-T Acenta', year: 2019,
    price: 17900, mileage: 73400, fuel: 'petrol', transmission: 'manual', body: 'suv',
    drivetrain: 'fwd', color: 'Gun Metallic', engine_l: 1.3, power_hp: 140, doors: 5, seats: 5, co2: 138,
    condition: 'used', status: 'sold',
    description: L(
      'Sensible, economical Qashqai that found a new home quickly — a popular family crossover.',
      'Разумный, экономичный Qashqai, быстро нашедший нового владельца — популярный семейный кроссовер.',
      'Λογικό, οικονομικό Qashqai που βρήκε γρήγορα νέο σπίτι — δημοφιλές οικογενειακό crossover.'
    ),
    history: L('Two owners · MOT history clean', 'Два владельца · чистая история ТО', 'Δύο ιδιοκτήτες · καθαρό ιστορικό ΚΤΕΟ'),
    features: ['Reversing camera', 'Apple CarPlay', 'Cruise control', 'Alloys'],
  },
]

export const CARS: Car[] = SEEDS.map((s, i) => ({
  id: `car-${String(i + 1).padStart(3, '0')}`,
  slug: `${s.make}-${s.model}-${s.variant}-${s.year}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
  make: s.make,
  model: s.model,
  variant: s.variant,
  year: s.year,
  price: s.price,
  mileage: s.mileage,
  fuel: s.fuel,
  transmission: s.transmission,
  body: s.body,
  drivetrain: s.drivetrain,
  color: s.color,
  engine_l: s.engine_l,
  power_hp: s.power_hp,
  doors: s.doors,
  seats: s.seats,
  co2: s.co2,
  condition: s.condition,
  status: s.status,
  vin: `DEMO${String(i + 1).padStart(2, '0')}0000000000`.slice(0, 17),
  ref: `LC-${2000 + i + 1}`,
  images: gallery(i),
  video_url: s.video_url ?? null,
  description: s.description,
  history: s.history,
  features: s.features,
  is_featured: !!s.is_featured,
  is_new_arrival: !!s.is_new_arrival,
  created_at: new Date(NOW - i * day).toISOString(),
}))

// ── Synchronous query helpers (static data — no async needed) ──────────────

const order = (list: Car[]) =>
  [...list].sort((a, b) => {
    if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1
    return b.created_at.localeCompare(a.created_at)
  })

export function queryCars(f?: Partial<CarFilters> & { featured?: boolean; status?: string }): Car[] {
  let list = CARS

  if (f?.featured) list = list.filter((c) => c.is_featured)
  if (f?.status && f.status !== 'all') list = list.filter((c) => c.status === f.status)
  if (f?.make && f.make !== 'all') list = list.filter((c) => c.make === f.make)
  if (f?.body && f.body !== 'all') list = list.filter((c) => c.body === f.body)
  if (f?.fuel && f.fuel !== 'all') list = list.filter((c) => c.fuel === f.fuel)
  if (f?.transmission && f.transmission !== 'all') list = list.filter((c) => c.transmission === f.transmission)
  if (f?.condition && f.condition !== 'all') list = list.filter((c) => c.condition === f.condition)
  if (f?.color && f.color !== 'all') list = list.filter((c) => c.color === f.color)
  if (f?.minPrice) list = list.filter((c) => c.price >= f.minPrice!)
  if (f?.maxPrice) list = list.filter((c) => c.price <= f.maxPrice!)
  if (f?.minYear) list = list.filter((c) => c.year >= f.minYear!)
  if (f?.maxMileage) list = list.filter((c) => c.mileage <= f.maxMileage!)
  if (f?.search) {
    const q = f.search.toLowerCase()
    list = list.filter((c) =>
      `${c.make} ${c.model} ${c.variant} ${c.body} ${c.color}`.toLowerCase().includes(q)
    )
  }
  return order(list)
}

export const getCarBySlug = (slug: string): Car | null => CARS.find((c) => c.slug === slug) ?? null
export const getMakes = (): string[] => [...new Set(CARS.map((c) => c.make))].sort()
export const getColors = (): string[] => [...new Set(CARS.map((c) => c.color))].sort()
export const countByStatus = (status: Car['status']) => CARS.filter((c) => c.status === status).length

/** Pull a localized car field for the active locale. */
export const carText = (val: Localized, locale: Locale) => val[locale] ?? val.en
