export type Locale = 'en' | 'ru' | 'el'

/** A string available in all three site languages. */
export type Localized = Record<Locale, string>

export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'plug_in_hybrid' | 'electric'
export type Transmission = 'automatic' | 'manual'
export type BodyType = 'suv' | 'sedan' | 'hatchback' | 'coupe' | 'estate' | 'convertible' | 'pickup'
export type Drivetrain = 'fwd' | 'rwd' | 'awd'
export type Condition = 'new' | 'used' | 'demo'
export type CarStatus = 'available' | 'reserved' | 'sold'

export interface Car {
  id: string
  slug: string

  make: string
  model: string
  variant: string
  year: number

  price: number // EUR
  mileage: number // km

  fuel: FuelType
  transmission: Transmission
  body: BodyType
  drivetrain: Drivetrain
  color: string

  engine_l: number // litres (0 for full EV)
  power_hp: number
  doors: number
  seats: number
  co2: number // g/km

  condition: Condition
  status: CarStatus

  vin: string
  ref: string

  images: string[]
  /** Ordered frames for the drag-to-rotate 360° viewer (optional). */
  spin?: string[]
  video_url: string | null

  /** Localized free text. */
  description: Localized
  history: Localized

  features: string[]

  is_featured: boolean
  is_new_arrival: boolean

  created_at: string
}

export interface Inquiry {
  car_ref?: string
  name: string
  phone: string
  email?: string
  message?: string
  type: 'inquiry' | 'test_drive' | 'trade_in' | 'import'
  preferred_date?: string
  preferred_time?: string
}

export interface CarFilters {
  search: string
  make: string
  body: string
  fuel: string
  transmission: string
  condition: string
  color: string
  minPrice: number
  maxPrice: number
  minYear: number
  maxMileage: number
}
