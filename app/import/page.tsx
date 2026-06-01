import type { Metadata } from 'next'
import ImportView from '@/components/views/ImportView'

export const metadata: Metadata = { title: 'Import / custom order' }

export default function Page() {
  return <ImportView />
}
