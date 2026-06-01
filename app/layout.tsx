import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n/context'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/ChatWidget'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import DemoGuard from '@/components/DemoGuard'
import CookieNotice from '@/components/CookieNotice'

export const metadata: Metadata = {
  title: { default: 'Limen Cars — Demo by Limen Studios', template: '%s | Limen Cars (Demo)' },
  description:
    'A fictional Limassol car dealership — a demonstration of the kind of inventory website Limen Studios builds. Not a real dealership.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cars-demo.limenstudios.com'),
  applicationName: 'Limen Cars (Demo)',
  openGraph: {
    type: 'website',
    siteName: 'Limen Cars (Demo)',
    images: [{ url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  // Demonstration site — keep it out of search indexes entirely.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <FloatingWhatsApp />
          <DemoGuard />
          <CookieNotice />
        </LanguageProvider>
      </body>
    </html>
  )
}
