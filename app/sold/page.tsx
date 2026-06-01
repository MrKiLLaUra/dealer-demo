import { Suspense } from 'react'
import type { Metadata } from 'next'
import InventoryView from '@/components/views/InventoryView'

export const metadata: Metadata = {
  title: 'Sold archive',
  description: 'Recently sold cars — a record of demand.',
}

export default function Page() {
  return (
    <Suspense>
      <InventoryView soldOnly />
    </Suspense>
  )
}
