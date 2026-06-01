import { MetadataRoute } from 'next'
import { CARS } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://cars-demo.limenstudios.com'
  const staticPages = ['', '/inventory', '/compare', '/trade-in', '/import', '/about', '/contact', '/sold'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }))
  const carPages = CARS.map((c) => ({ url: `${base}/inventory/${c.slug}`, lastModified: new Date(c.created_at) }))
  return [...staticPages, ...carPages]
}
