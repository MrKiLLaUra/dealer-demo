import { Suspense } from 'react'
import type { Metadata } from 'next'
import InventoryView from '@/components/views/InventoryView'

export const metadata: Metadata = {
  title: 'Inventory',
  description: 'Browse our full stock of new and used cars — filter by make, body, fuel, transmission, price and more.',
}

export default function Page() {
  return (
    <Suspense>
      <InventoryView />
    </Suspense>
  )
}
