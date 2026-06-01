import type { Metadata } from 'next'
import CompareView from '@/components/views/CompareView'

export const metadata: Metadata = { title: 'Compare cars' }

export default function Page() {
  return <CompareView />
}
