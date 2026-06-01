import type { Metadata } from 'next'
import ContactView from '@/components/views/ContactView'

export const metadata: Metadata = { title: 'Contact & test drive' }

export default function Page() {
  return <ContactView />
}
