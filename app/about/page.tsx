import type { Metadata } from 'next'
import AboutView from '@/components/views/AboutView'

export const metadata: Metadata = { title: 'About' }

export default function Page() {
  return <AboutView />
}
