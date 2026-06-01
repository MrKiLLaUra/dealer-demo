import { MetadataRoute } from 'next'

// This is a demonstration site and should never be indexed.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', disallow: '/' } }
}
