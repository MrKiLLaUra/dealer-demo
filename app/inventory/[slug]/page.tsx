import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CARS, getCarBySlug } from '@/lib/data'
import CarDetailView from '@/components/views/CarDetailView'

interface Props {
  params: Promise<{ slug: string }>
}

// Prerender every (static) listing at build time.
export function generateStaticParams() {
  return CARS.map((c) => ({ slug: c.slug }))
}

// Auto-generated, per-listing SEO metadata.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const car = getCarBySlug(slug)
  if (!car) return { title: 'Not found' }
  const title = `${car.year} ${car.make} ${car.model} ${car.variant}`
  return {
    title,
    description: car.description.en,
    openGraph: {
      title,
      description: car.description.en,
      images: car.images.slice(0, 1).map((url) => ({ url, width: 1200, height: 630 })),
      type: 'website',
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const car = getCarBySlug(slug)
  if (!car) notFound()

  // Vehicle structured data (schema.org/Car) — demonstrates rich-result eligibility.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${car.year} ${car.make} ${car.model} ${car.variant}`,
    brand: { '@type': 'Brand', name: car.make },
    model: car.model,
    vehicleConfiguration: car.variant,
    vehicleModelDate: String(car.year),
    color: car.color,
    bodyType: car.body,
    fuelType: car.fuel,
    vehicleTransmission: car.transmission,
    vehicleIdentificationNumber: car.vin,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileage, unitCode: 'KMT' },
    image: car.images,
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'EUR',
      availability: car.status === 'sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CarDetailView car={car} />
    </>
  )
}
